const LIB_PATH = require( 'path' );
const NPM_NODE_EXTERNALS = require('webpack-node-externals');

module.exports =
{
	entry: LIB_PATH.join( __dirname, 'lib-json.js' ),
	output: {
		path: LIB_PATH.join( __dirname, 'dist' ),
		filename: `lib-json.dist.v${ get_verstamp() }.js`,

		library: 'lib_json',
		libraryTarget: 'umd',

		// Fix to get umd to work; see: https://github.com/webpack/webpack/issues/6784
		globalObject: 'typeof self !== \'undefined\' ? self : this',

	},
	// externals: {},
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [ NPM_NODE_EXTERNALS() ], // in order to ignore all modules in node_modules folder
};


function get_verstamp ()
{
	let package = require( './package.json' );
	let version = package.version;
	while ( version.indexOf( '.' ) >= 0 )
	{
		version = version.replace( '.', '-' );
	}
	return version;
}

function get_datestamp ()
{
	let now = new Date();
	let datestamp = now.getFullYear();
	let M = now.getMonth() + 1;
	if ( M < 10 ) { M = `0${ M }` }
	datestamp += '-' + M;
	let D = now.getDate();
	if ( D < 10 ) { D = `0${ D }` }
	datestamp += '-' + D;
	return datestamp;
}