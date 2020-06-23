"use strict";

var LIB_FS = require( 'fs' );
var LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( '../lib-json.js' );
// const LIB_JSON = require( '../dist/lib-json.dist.js' );

let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json' );
let test_1_data = JSON.parse( test_1_json );

let result = null;
let json = null;
let transform = null;


//---------------------------------------------------------------------
describe( `Json Transform`, function ()
{

	//---------------------------------------------------------------------
	describe( `Calculate Transforms`, function ()
	{

		it( `should return an empty transform for equal text values`, function ()
		{
			result = LIB_JSON.CalculateTransform( "text", "text", '$' );
			LIB_ASSERT.equal( result.entries.length, 0 );
		} );
		it( `should return a single value mismatch for non-equal text values`, function ()
		{
			result = LIB_JSON.CalculateTransform( "text1", "text2", '$' );
			LIB_ASSERT.equal( result.entries.length, 1 );
			LIB_ASSERT.equal( result.entries[ 0 ].path, '$' );
			LIB_ASSERT.equal( result.entries[ 0 ].type, 'value mismatch' );
			LIB_ASSERT.equal( result.entries[ 0 ].value, "text2" );
		} );

		it( `should return an empty transform for equal numeric values`, function ()
		{
			result = LIB_JSON.CalculateTransform( 3.14, 3.14, '$' );
			LIB_ASSERT.equal( result.entries.length, 0 );
		} );
		it( `should return a single value mismatch for non-equal numeric values`, function ()
		{
			result = LIB_JSON.CalculateTransform( 3, 3.14, '$' );
			LIB_ASSERT.equal( result.entries.length, 1 );
			LIB_ASSERT.equal( result.entries[ 0 ].path, '$' );
			LIB_ASSERT.equal( result.entries[ 0 ].type, 'value mismatch' );
			LIB_ASSERT.equal( result.entries[ 0 ].value, 3.14 );
		} );

		it( `should return a single type mismatch for non-equal value type`, function ()
		{
			result = LIB_JSON.CalculateTransform( "text1", 3.14, '$' );
			LIB_ASSERT.equal( result.entries.length, 1 );
			LIB_ASSERT.equal( result.entries[ 0 ].path, '$' );
			LIB_ASSERT.equal( result.entries[ 0 ].type, 'type mismatch' );
			LIB_ASSERT.equal( result.entries[ 0 ].value, 3.14 );
		} );

		it( `should detect differences within an array`, function ()
		{
			result = LIB_JSON.CalculateTransform( [ 1, 2, 3 ], [ 1, 2, 3.14 ], '$' );
			LIB_ASSERT.equal( result.entries.length, 1 );
			LIB_ASSERT.equal( result.entries[ 0 ].path, '$[2]' );
			LIB_ASSERT.equal( result.entries[ 0 ].type, 'value mismatch' );
			LIB_ASSERT.equal( result.entries[ 0 ].value, 3.14 );
		} );

		it( `should detect differences within an object`, function ()
		{
			result = LIB_JSON.CalculateTransform(
				{ one: 1, two: 2, three: 3 },
				{ one: 1, two: 2, three: 3.14 },
				'$' );
			LIB_ASSERT.equal( result.entries.length, 1 );
			LIB_ASSERT.equal( result.entries[ 0 ].path, '$.three' );
			LIB_ASSERT.equal( result.entries[ 0 ].type, 'value mismatch' );
			LIB_ASSERT.equal( result.entries[ 0 ].value, 3.14 );
		} );

	} );


/*
	//---------------------------------------------------------------------
	describe( `Apply Transforms`, function ()
	{

		it( `should be able to transform primitive text values`, function ()
		{
			let transform =
			{
				root: '$',
				entries: [
					{
						path: '$',
						type: 'value mismatch',
						value: "text",
					}
				]
			};
			result = LIB_JSON.apply_transform( null, [ transform ], '$' );
			LIB_ASSERT.equal( result, "text" );
		} );

	} );
*/


} );
