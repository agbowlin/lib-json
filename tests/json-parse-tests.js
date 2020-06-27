"use strict";


const LIB_JSON = require( '../src/lib-json.js' );
const LIB_ASSERT = require( 'assert' );


let result = null;
let result1 = null;


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
