"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( LIB_PATH.resolve( __dirname, '../../src/lib-json.js' ) );


//---------------------------------------------------------------------
describe( `011) Json Parse`, function ()
{


	//---------------------------------------------------------------------
	describe( `Equivalence with Javascript's JSON.parse()`, function ()
	{


		//---------------------------------------------------------------------
		it( `should parse boolean value: true`, function ()
		{
			let result1 = JSON.parse( 'true' );
			let result = LIB_JSON.Parse( 'true' );
			LIB_ASSERT.equal( result, true );
			LIB_ASSERT.equal( result, result1 );
		} );


		//---------------------------------------------------------------------
		it( `should parse number value: 3.14`, function ()
		{
			let result1 = JSON.parse( '3.14' );
			let result = LIB_JSON.Parse( '3.14' );
			LIB_ASSERT.equal( result, 3.14 );
			LIB_ASSERT.equal( result, result1 );
		} );


		//---------------------------------------------------------------------
		it( `should parse string value: "text"`, function ()
		{
			let result1 = JSON.parse( '"text"' );
			let result = LIB_JSON.Parse( '"text"' );
			LIB_ASSERT.equal( result, "text" );
			LIB_ASSERT.equal( result, result1 );
		} );


		//---------------------------------------------------------------------
		it( `should parse empty array: []`, function ()
		{
			let result1 = JSON.parse( '[]' );
			let result = LIB_JSON.Parse( '[]' );
			LIB_ASSERT.equal( typeof result, 'object' );
			LIB_ASSERT.equal( Array.isArray( result ), true );
			LIB_ASSERT.equal( JSON.stringify( result ), JSON.stringify( result1 ) );
		} );


		//---------------------------------------------------------------------
		it( `should parse empty object: {}`, function ()
		{
			let result1 = JSON.parse( '{}' );
			let result = LIB_JSON.Parse( '{}' );
			LIB_ASSERT.equal( typeof result, 'object' );
			LIB_ASSERT.equal( JSON.stringify( result ), JSON.stringify( result1 ) );
		} );


	} );


} );
