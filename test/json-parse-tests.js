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
describe( `Json Parse`, function ()
{


	//---------------------------------------------------------------------
	describe( `Equivalence with Javascript's JSON.parse()`, function ()
	{
		it( `should parse empty object "{}"`, function ()
		{
			result1 = JSON.parse( "{}" );
			result = LIB_JSON.Parse( "{}" );
			LIB_ASSERT.equal( JSON.stringify( result ), JSON.stringify( result1 ) );
		} );
		it( `should parse empty array "[]"`, function ()
		{
			result1 = JSON.parse( "[]" );
			result = LIB_JSON.Parse( "[]" );
			LIB_ASSERT.equal( JSON.stringify( result ), JSON.stringify( result1 ) );
		} );
		it( `should parse "true"`, function ()
		{
			result1 = JSON.parse( "true" );
			result = LIB_JSON.Parse( "true" );
			LIB_ASSERT.equal( result, result1 );
		} );
		it( `should parse "3.14"`, function ()
		{
			result1 = JSON.parse( "3.14" );
			result = LIB_JSON.Parse( "3.14" );
			LIB_ASSERT.equal( result, result1 );
		} );
	} );

} );
