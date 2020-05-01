const LIB_PATH = require( 'path' );

module.exports = {
	entry: LIB_PATH.resolve( __dirname, '../lib-json.js' ),
	output: {
		path: LIB_PATH.resolve( __dirname, '../dist' ),
		filename: 'lib-json.dist.js',

		library: 'lib_json',
		libraryTarget: 'umd',

		// Fix to get umd to work; see: https://github.com/webpack/webpack/issues/6784
		globalObject: 'typeof self !== \'undefined\' ? self : this',

	},
	externals: {},
};
