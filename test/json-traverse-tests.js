"use strict";

var LIB_FS = require( 'fs' );
var LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( '../lib-json.js' );
// const LIB_JSON = require( '../dist/lib-json.dist.js' );

let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json' );
let test_1_data = JSON.parse( test_1_json );

let result = null;
let json = null;


//---------------------------------------------------------------------
describe( `Json Traverse`, function ()
{


	//---------------------------------------------------------------------
	describe( `traverse`, function ()
	{
		it( `should return [1], the value of 'one'`, function ()
		{
			result = LIB_JSON.traverse( test_1_data, ( info ) =>
			{ if ( info.name === 'one' ) { return info.value; } } );
			LIB_ASSERT.equal( result, 1 );
		} );
		it( `should return [2], the value of 'two'`, function ()
		{
			result = LIB_JSON.traverse( test_1_data, ( info ) =>
			{ if ( info.name === 'two' ) { return info.value; } } );
			LIB_ASSERT.equal( result, 2 );
		} );
		it( `should return [true], the value of 'done'`, function ()
		{
			result = LIB_JSON.traverse( test_1_data, ( info ) =>
			{ if ( info.name === 'done' ) { return info.value; } } );
			LIB_ASSERT.equal( result, true );
		} );
	} );


	//---------------------------------------------------------------------
	describe( `find_name & find_value`, function ()
	{
		it( `should return '$.one', the path of 'one'`, function ()
		{
			result = LIB_JSON.find_name( test_1_data, 'one' );
			LIB_ASSERT.equal( result, `$.one` );
		} );
		it( `should return '$.two', the path of 'two'`, function ()
		{
			result = LIB_JSON.find_name( test_1_data, 'two' );
			LIB_ASSERT.equal( result, `$.two` );
		} );
		it( `should return '$.five.six.seven', the path of 'seven'`, function ()
		{
			result = LIB_JSON.find_name( test_1_data, 'seven' );
			LIB_ASSERT.equal( result, `$.five.six.seven` );
		} );
		it( `should have the same path for name 'one' and value [1]`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.find_name( test_1_data, 'one' ),
				LIB_JSON.find_value( test_1_data, 1 )
			);
		} );
		it( `should have the same path for name 'two' and value [2]`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.find_name( test_1_data, 'two' ),
				LIB_JSON.find_value( test_1_data, 2 )
			);
		} );
		it( `should have the same path for name 'seven' and value [7]`, function ()
		{
			LIB_ASSERT.equal(
				LIB_JSON.find_name( test_1_data, 'seven' ),
				LIB_JSON.find_value( test_1_data, 7 )
			);
		} );
	} );


	//---------------------------------------------------------------------
	describe( `get_value & set_value`, function ()
	{
		it( `should set a value and then get the new value`, function ()
		{
			result = LIB_JSON.set_value( test_1_data, '$.three[1]', 'three-two' );
			result = LIB_JSON.get_value( test_1_data, '$.three[1]' );
			LIB_ASSERT.equal( result, 'three-two' );
		} );
		it( `should have path '$.five.six.seven'`, function ()
		{
			result = LIB_JSON.has_path( test_1_data, '$.five.six.seven' );
			LIB_ASSERT.equal( result, true );
		} );
		it( `should not have path '$.foo'`, function ()
		{
			result = LIB_JSON.has_path( test_1_data, '$.foo' );
			LIB_ASSERT.notEqual( result, true );
		} );
	} );


} );

