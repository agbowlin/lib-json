"use strict";


const LIB_JSON = require( '../src/lib-json.js' );
const LIB_FS = require( 'fs' );
const LIB_ASSERT = require( 'assert' );

let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json', 'utf8' );
let test_1_data = JSON.parse( test_1_json );

let result = null;


//---------------------------------------------------------------------
describe( `Json Stringify`, function ()
{


	//---------------------------------------------------------------------
	describe( `Stringify Primitives`, function ()
	{
		it( `should stringify null [null]`, function ()
		{
			result = LIB_JSON.Stringify( null );
			LIB_ASSERT.equal( result, 'null' );
		} );
		it( `should stringify empty string [""]`, function ()
		{
			result = LIB_JSON.Stringify( "" );
			LIB_ASSERT.equal( result, '""' );
		} );
		it( `should stringify empty array [[]]`, function ()
		{
			result = LIB_JSON.Stringify( [] );
			LIB_ASSERT.equal( result, '[]' );
		} );
		it( `should stringify empty object [{}]`, function ()
		{
			result = LIB_JSON.Stringify( {} );
			LIB_ASSERT.equal( result, '{}' );
		} );
		it( `should stringify [true]`, function ()
		{
			result = LIB_JSON.Stringify( true );
			LIB_ASSERT.equal( result, 'true' );
		} );
		it( `should stringify [3.14]`, function ()
		{
			result = LIB_JSON.Stringify( 3.14 );
			LIB_ASSERT.equal( result, '3.14' );
		} );
		it( `should stringify ["Hello World!"]`, function ()
		{
			result = JSON.stringify( "Hello World!" );
			result = LIB_JSON.Stringify( "Hello World!" );
			LIB_ASSERT.equal( result, `"Hello World!"` );
		} );
	} );


	//---------------------------------------------------------------------
	describe( `Equivalence with Javascript's JSON.stringify()`, function ()
	{
		it( `should stringify null [null] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( null ),
				JSON.stringify( null )
			);
		} );
		it( `should stringify empty string [""] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( "" ),
				JSON.stringify( "" )
			);
		} );
		it( `should stringify empty array [[]] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( [] ),
				JSON.stringify( [] )
			);
		} );
		it( `should stringify empty object [{}] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( {} ),
				JSON.stringify( {} )
			);
		} );
		it( `should stringify [true] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( true ),
				JSON.stringify( true )
			);
		} );
		it( `should stringify [3.14] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( 3.14 ),
				JSON.stringify( 3.14 )
			);
		} );
		it( `should stringify ["Hello World!"] the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( "Hello World!" ),
				JSON.stringify( "Hello World!" )
			);
		} );
		it( `should stringify test_1.json the same way`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.Stringify( test_1_data ),
				JSON.stringify( test_1_data )
			);
		} );
	} );


/*
	//---------------------------------------------------------------------
	describe( `Speed tests`, function ()
	{

		it( `should stringify faster than Node's JSON`, function ()
		{
			let t0 = new Date();
			let json = LIB_JSON.Stringify( test_small_data );
			let duration1 = ( ( new Date() ) - t0 );

			t0 = new Date();
			json = JSON.stringify( test_small_data );
			let duration2 = ( ( new Date() ) - t0 );

			LIB_ASSERT.equal( duration1 < duration2, true, `lib-json: [${ duration1 } ms], node json: [${ duration2 } ms]` );
		} );

		it( `should parse faster than Node's JSON`, function ()
		{
			let t0 = new Date();
			let data = LIB_JSON.parse( test_small_json );
			let duration1 = ( ( new Date() ) - t0 );

			t0 = new Date();
			data = JSON.parse( test_small_json );
			let duration2 = ( ( new Date() ) - t0 );

			LIB_ASSERT.equal( duration1 < duration2, true, `lib-json: [${ duration1 } ms], node json: [${ duration2 } ms]` );
		} );

	} );
*/


} );
