"use strict";

var LIB_FS = require( 'fs' );
var LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( '../lib-json.js' );
// const LIB_JSON = require( '../dist/lib-json.dist.js' );

let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json', 'utf8' );
let test_1_data = JSON.parse( test_1_json );

let result = null;
let result1 = null;
let data = null;
let json = null;


//---------------------------------------------------------------------
describe( `Json Tablify`, function ()
{


	//---------------------------------------------------------------------
	describe( `Tablify Tests`, function ()
	{
		it( `should tablify test data`, function ()
		{
			result = LIB_JSON.Tablify( test_1_json );
			LIB_ASSERT.notEqual( result, null );
		} );
	} );

} );
