/*
# 910-release-version

Finalizes a library project for release and establishes a new version.

Dependencies:

- `git`, `npm`, `node`
- `build/webpack/010-webpack.sh`
- `build/s3/810-s3-sync-docs.sh`


# Procedure

- Loads the package.json file to obtain current version number.

## Finalize Project for Release

- Runs tests and store output in `docs/testing-output.md`: `npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
- Do webpack: `bash build/webpack/010-webpack.sh`
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
	- `package.json`
	- `VERSION`
	- `readme.md` (in format: `(vX.Y.Z)`)
	- `docs/_coverpage.md` (in format: `(vX.Y.Z)`)
	- `docs/guides/readme.md` (in format: `(vX.Y.Z)`)

## Cleanup New Version

- Do initial staging: `git add .`
- Do initial commit: `git commit -m "Initialization for vX.Y.Z"`
- Do initial push: `git push origin master`

*/

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );

const NPM = true;
const S3_DOCS = true;


//---------------------------------------------------------------------
function print_command_output( Command, Output )
{
	console.log( '------------------------------------------' );
	console.log( `Command: ${Command}` );
	console.log( `stdout: \n${Output.stdout}` );
	console.log( `stderr: \n${Output.stderr}` );
	console.log( '------------------------------------------' );
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
	console.log( `[910-release-version] starting` );
	console.log( `Running in: ${process.cwd()}` );

	// - Loads the package.json file to obtain current version number.
	let path = LIB_PATH.join( process.cwd(), 'package.json' );
	let PACKAGE = require( path );
	console.log( `Loaded package.json` );
	console.log( `\tname = ${PACKAGE.name}` );
	console.log( `\tversion = ${PACKAGE.version}` );

	//---------------------------------------------------------------------
	//	Finalize Project for Release
	//---------------------------------------------------------------------

	// - Do webpack: `bash build/webpack/010-webpack.sh`
	console.log( 'Do webpack' );
	await execute_command( `bash build/webpack/010-webpack.sh` );

	// - Runs tests and store output in docs/testing-output.md: `npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
	console.log( 'Runs tests and store output in docs/testing-output.md' );
	{
		let result = await execute_command( `npx mocha -u bdd tests/*.js --timeout 0 --slow 10` );
		path = LIB_PATH.join( process.cwd(), 'docs', 'testing-output.md' );
		LIB_FS.writeFileSync( path,
			"# Testing Output\n\n\n"
			+ "```\n"
			+ result.stdout + "\n"
			+ "```\n\n\n"
		);
	}

	// - Do final staging: `git add .`
	console.log( 'Do final staging' );
	await execute_command( `git add .` );

	// - Do final commit: `git commit -m "Finalization for vX.Y.Z"`
	console.log( 'Do final commit' );
	await execute_command( `git commit -m "Finalization for v${PACKAGE.version}"` );

	// - Do final push: `git push origin master`
	console.log( 'Do final push' );
	await execute_command( `git push origin master` );

	// - Create git version tag: `git tag -a vX.Y.Z -m "Version vX.Y.Z"`
	console.log( 'Create git version tag' );
	await execute_command( `git tag -a v${PACKAGE.version} -m "Version ${PACKAGE.version}"` );

	// - Push git version tag: `git push origin vX.Y.Z`
	console.log( 'Push git version tag' );
	await execute_command( `git push origin v${PACKAGE.version}` );

	if ( NPM )
	{
		// - Create new npm version: `npm publish . --access public`
		console.log( 'Create new npm version' );
		await execute_command( `npm publish . --access public` );
	}

	if ( S3_DOCS )
	{
		// - Update S3 docs: `bash build/s3/810-s3-sync-docs.sh`
		console.log( 'Update S3 docs' );
		await execute_command( `bash build/s3/810-s3-sync-docs.sh` );
	}

	//---------------------------------------------------------------------
	//	Establish a New Version
	//---------------------------------------------------------------------

	// - Increments the minor portion of the version number (e.g. 0.0.1 -> 0.0.2).
	let prev_version = PACKAGE.version;
	{
		let parts = PACKAGE.version.split( '.' );
		parts[ 2 ] = parseInt( parts[ 2 ] ) + 1;
		PACKAGE.version = parts.join( '.' );
	}

	// - Search/Replace the old version number with the new version in source files:
	let doc = null;

	// Update package.json
	console.log( `Updating file: package.json` );
	path = LIB_PATH.join( process.cwd(), 'package.json' );
	LIB_FS.writeFileSync( path, JSON.stringify( PACKAGE, null, '\t' ) );

	// Update VERSION
	console.log( `Updating file: VERSION` );
	path = LIB_PATH.join( process.cwd(), 'VERSION' );
	LIB_FS.writeFileSync( path, PACKAGE.version );

	console.log( `Updating file: readme.md` );
	path = LIB_PATH.join( process.cwd(), 'readme.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	console.log( `Updating file: docs/_coverpage.md` );
	path = LIB_PATH.join( process.cwd(), 'docs', '_coverpage.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	console.log( `Updating file: docs/guides/readme.md` );
	path = LIB_PATH.join( process.cwd(), 'docs', 'guides', 'readme.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	//---------------------------------------------------------------------
	//	Cleanup New Version
	//---------------------------------------------------------------------

	// - Do initial staging: `git add .`
	console.log( 'Do initial staging' );
	await execute_command( `git add .` );

	// - Do initial commit: `git commit -m "Initialization for vX.Y.Z"`
	console.log( 'Do initial commit' );
	await execute_command( `git commit -m "Initialization for v${PACKAGE.version}"` );

	// - Do final push: `git push origin master`
	console.log( 'Do final push' );
	await execute_command( `git push origin master` );


	console.log( `[910-release-version] finished` );
	return;
} )();