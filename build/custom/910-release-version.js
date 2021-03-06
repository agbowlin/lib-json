/*
# 910-release-version (with colors)

Finalizes a library project for release and establishes a new version.

Dependencies:

- `git`, `npm`, `node`
- `build/webpack/010-webpack.sh`
- `build/s3/810-s3-sync-docs.sh`


# Procedure

- Loads the package.json file to obtain current version number.

## Finalize Project for Release

- Do webpack: `bash build/webpack/010-webpack.sh`
- Runs tests and store output in `docs/external/testing-output.md`: `npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
- Copy 'license.md' to 'docs/external'.
- Copy 'readme.md' to 'docs/external'.
- Copy 'VERSION' to 'docs/external'.
- Do final staging: `git add .`
- Do final commit: `git commit -m "Finalization for vX.Y.Z"`
- Do final push: `git push origin master`
- Create git version tag: `git tag -a vX.Y.Z -m "Version vX.Y.Z"`
- Push git version tag: `git push origin vX.Y.Z`
- Create new npm version: `npm publish . --access public`
- Update S3 docs: `bash build/s3/810-s3-sync-docs.sh`

## Establish a New Version

- Increments the minor portion of the version number (e.g. 0.0.1 -> 0.0.2).
- Search/Replace the old version number with the new version in source files:
	- `package.json`        format `X.Y.Z`
	- `VERSION`             format `X.Y.Z`
	- `readme.md`           format `(vX.Y.Z)`
	- `docs/_coverpage.md`  format `(vX.Y.Z)`

## Cleanup New Version

- Do initial staging: `git add .`
- Do initial commit: `git commit -m "Initialization for vX.Y.Z"`
- Do initial push: `git push origin master`

*/

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );
const LIB_SHELL_COLORS = require( './ShellColors.js' );

const CONFIG = require( '../__secrets/product-config.js' ).Config;


//---------------------------------------------------------------------
function log_blank_line()
{
	console.log();
	return;
}

//---------------------------------------------------------------------
function log_heading( Text )
{
	Text = LIB_SHELL_COLORS.ShellText( Text, null, LIB_SHELL_COLORS.ShellForecolor.White, LIB_SHELL_COLORS.ShellEffect.Bold );
	console.log( Text );
	return;
}

//---------------------------------------------------------------------
function log_muted( Text )
{
	Text = LIB_SHELL_COLORS.ShellText( Text, null, LIB_SHELL_COLORS.ShellForecolor.LightGray, LIB_SHELL_COLORS.ShellEffect.Dim );
	console.log( Text );
	return;
}

//---------------------------------------------------------------------
function log_error( Text )
{
	Text = LIB_SHELL_COLORS.ShellText( Text, null, LIB_SHELL_COLORS.ShellForecolor.Red, LIB_SHELL_COLORS.ShellEffect.Bold );
	console.log( Text );
	return;
}

//---------------------------------------------------------------------
function print_command_output( Command, Output )
{
	Command = LIB_SHELL_COLORS.ShellText( Command, null, LIB_SHELL_COLORS.ShellForecolor.White, LIB_SHELL_COLORS.ShellEffect.Bold );
	log_muted( '+-----------------------------------------' );
	log_heading( '| ' + Command );
	if ( Output.stdout )
	{
		let text = Output.stderr.trim();
		if ( text )
		{
			log_muted( `| stdout:` );
			log_error( text );
		}
	}
	if ( Output.stderr )
	{
		let text = Output.stderr.trim();
		if ( text )
		{
			log_muted( `| stderr:` );
			log_error( text );
		}
	}
	log_muted( '+-----------------------------------------' );
	return;
}


//---------------------------------------------------------------------
async function execute_command( Command )
{
	return new Promise(
		( resolve, reject ) =>
		{
			LIB_CHILD_PROCESS.exec( Command,
				( error, stdout, stderr ) =>
				{
					if ( error )
					{
						reject( error );
						return;
					}
					let output =
					{
						stdout: stdout,
						stderr: stderr,
					};
					print_command_output( Command, output );
					resolve( output );
				} );
			return;
		}
	);
}


//---------------------------------------------------------------------
function replace_text( Text, Search, Replace )
{
	while ( Text.indexOf( Search ) >= 0 )
	{
		let ich1 = Text.indexOf( Search );
		let ich2 = ich1 + Search.length;
		Text = Text.substr( 0, ich1 ) + Replace + Text.substr( ich2 );
	}
	return Text;
}


//---------------------------------------------------------------------
( async function ()
{
	let result = null;

	log_heading( `[910-release-version] starting` );
	log_muted( `Running in: ${process.cwd()}` );

	// - Loads the package.json file to obtain current version number.
	let path = LIB_PATH.join( process.cwd(), 'package.json' );
	let PACKAGE = require( path );
	log_muted( `Loaded package.json` );
	log_muted( `\tname = ${PACKAGE.name}` );
	log_muted( `\tversion = ${PACKAGE.version}` );


	//=====================================================================
	//=====================================================================
	//
	//		Finalize Project for Release
	//
	//=====================================================================
	//=====================================================================


	// - Do webpack: `bash build/webpack/010-webpack.sh`
	log_blank_line();
	log_heading( 'Preflight: Do webpack' );
	await execute_command( `bash build/webpack/010-webpack.sh` );

	// - Runs tests and store output in docs/external/testing-output.md: `npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
	log_blank_line();
	log_heading( 'Preflight: Runs tests and store output in docs/external/testing-output.md' );
	{
		result = await execute_command( `npx mocha -u bdd tests/*.js --timeout 0 --slow 10` );
		path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'testing-output.md' );
		LIB_FS.writeFileSync( path,
			"# Testing Output\n\n\n"
			+ "```\n"
			+ result.stdout + "\n"
			+ "```\n\n\n"
		);
	}

	// // - Copy 'docs/external/license.md' to project root.
	// log_blank_line();
	// log_heading( 'Preflight: Copy docs/external/license.md to project root' );
	// path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'license.md' );
	// LIB_FS.copyFileSync( path, LIB_PATH.join( process.cwd(), 'license.md' ) );

	// // - Copy 'docs/external/readme.md' to project root.
	// log_blank_line();
	// log_heading( 'Preflight: Copy docs/external/license.md to project root' );
	// path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'readme.md' );
	// LIB_FS.copyFileSync( path, LIB_PATH.join( process.cwd(), 'readme.md' ) );

	// - Copy 'license.md' to 'docs/external'.
	log_blank_line();
	log_heading( 'Preflight: Copy license.md to docs/external' );
	path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'license.md' );
	LIB_FS.copyFileSync( LIB_PATH.join( process.cwd(), 'license.md' ), path );

	// - Copy 'readme.md' to 'docs/external'.
	log_blank_line();
	log_heading( 'Preflight: Copy readme.md to docs/external' );
	path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'readme.md' );
	LIB_FS.copyFileSync( LIB_PATH.join( process.cwd(), 'readme.md' ), path );

	// - Copy 'VERSION' to 'docs/external'.
	log_blank_line();
	log_heading( 'Preflight: Copy VERSION to docs/external' );
	path = LIB_PATH.join( process.cwd(), 'docs', 'external', 'VERSION' );
	LIB_FS.copyFileSync( LIB_PATH.join( process.cwd(), 'VERSION' ), path );

	// - Do final staging: `git add .`
	log_blank_line();
	log_heading( 'Do final staging before version tag' );
	await execute_command( `git add .` );

	// - Get project status
	log_blank_line();
	log_heading( 'Get project status' );
	result = await execute_command( `git status` );
	let working_tree_clean = result.stdout.includes( 'working tree clean' );

	// - Do final commit: `git commit -m "Finalization for vX.Y.Z"`
	if ( !working_tree_clean )
	{
		log_blank_line();
		log_heading( 'Do final commit before version tag' );
		await execute_command( `git commit -m "Finalization for v${PACKAGE.version}"` );
	}

	// - Do final push: `git push origin master`
	log_blank_line();
	log_heading( 'Do final push before version tag' );
	await execute_command( `git push origin master` );

	// - Create git version tag: `git tag -a vX.Y.Z -m "Version vX.Y.Z"`
	log_blank_line();
	log_heading( 'Create git version tag' );
	await execute_command( `git tag -a v${PACKAGE.version} -m "Version ${PACKAGE.version}"` );

	// - Push git version tag: `git push origin vX.Y.Z`
	log_blank_line();
	log_heading( 'Push git version tag' );
	await execute_command( `git push origin v${PACKAGE.version}` );

	if ( CONFIG.HasNpmRegistry )
	{
		// - Create new npm version: `npm publish . --access public`
		log_blank_line();
		log_heading( 'Create new npm version' );
		await execute_command( `npm publish . --access public` );
	}

	if ( CONFIG.HasS3Docs )
	{
		// - Update S3 docs: `bash build/s3/810-s3-sync-docs.sh`
		log_blank_line();
		log_heading( 'Update S3 docs' );
		await execute_command( `bash build/s3/810-s3-sync-docs.sh` );
	}


	//=====================================================================
	//=====================================================================
	//
	//		Establish a New Version
	//
	//=====================================================================
	//=====================================================================


	// - Increments the minor portion of the version number (e.g. 0.0.1 -> 0.0.2).
	let prev_version = PACKAGE.version;
	{
		let parts = PACKAGE.version.split( '.' );
		parts[ 2 ] = parseInt( parts[ 2 ] ) + 1;
		PACKAGE.version = parts.join( '.' );
	}
	log_blank_line();
	log_heading( `Created new version ${prev_version} -> ${PACKAGE.version}` );

	// - Search/Replace the old version number with the new version in source files:
	log_blank_line();
	log_heading( 'Update version numbers in files' );
	let doc = null;

	// Update package.json
	log_muted( `Updating file: package.json` );
	path = LIB_PATH.join( process.cwd(), 'package.json' );
	LIB_FS.writeFileSync( path, JSON.stringify( PACKAGE, null, '\t' ) );

	// Update VERSION
	log_muted( `Updating file: VERSION` );
	path = LIB_PATH.join( process.cwd(), 'VERSION' );
	LIB_FS.writeFileSync( path, PACKAGE.version );

	// Update readme.md
	log_muted( `Updating file: readme.md` );
	path = LIB_PATH.join( process.cwd(), 'readme.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	if ( !doc.includes( `(v${prev_version})` ) ) { console.error( `Unable to locate version number in file: readme.md` ); }
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	// Update docs/_coverpage.md
	log_muted( `Updating file: docs/_coverpage.md` );
	path = LIB_PATH.join( process.cwd(), 'docs', '_coverpage.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	if ( !doc.includes( `(v${prev_version})` ) ) { console.error( `Unable to locate version number in file: docs/_coverpage.md` ); }
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );


	//=====================================================================
	//=====================================================================
	//
	//		Cleanup New Version
	//
	//=====================================================================
	//=====================================================================


	// - Do initial staging: `git add .`
	log_blank_line();
	log_heading( 'Do initial staging for new version' );
	await execute_command( `git add .` );

	// - Do initial commit: `git commit -m "Initialization for vX.Y.Z"`
	log_blank_line();
	log_heading( 'Do initial commit for new version' );
	await execute_command( `git commit -m "Initialization for v${PACKAGE.version}"` );

	// - Do final push: `git push origin master`
	log_blank_line();
	log_heading( 'Do final push for new version' );
	await execute_command( `git push origin master` );


	log_blank_line();
	log_heading( `[910-release-version] finished` );
	log_heading( `Published version [${prev_version}], you are now at version [${PACKAGE.version}].` );
	return;
} )();