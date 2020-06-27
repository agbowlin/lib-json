"use strict";


const LIB_JSON = require( '../src/lib-json.js' );
const LIB_FS = require( 'fs' );
const LIB_ASSERT = require( 'assert' );

let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json', 'utf8' );

let result = null;


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
