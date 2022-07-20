"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( LIB_PATH.resolve( __dirname, '../../src/lib-json.js' ) );


//---------------------------------------------------------------------
describe( `031) Json IniText`, function ()
{


	//---------------------------------------------------------------------
	it( `should handle simple cases`, function ()
	{
		let data1 =
		{
			Section1: { Entry1: 'one', Entry2: 2 },
			Section2: { Entry1: 1, Entry2: true },
		};
		let text = LIB_JSON.ToIniText( data1 );
		let data2 = LIB_JSON.FromIniText( text );
		LIB_ASSERT.equal( data2.Section1.Entry1, 'one' );
		LIB_ASSERT.equal( data2.Section1.Entry2, '2' );
		LIB_ASSERT.equal( data2.Section2.Entry1, '1' );
		LIB_ASSERT.equal( data2.Section2.Entry2, 'true' );
	} );


	//---------------------------------------------------------------------
	it( `should ignore invalid sections and entries`, function ()
	{
		let data1 =
		{
			Section1: { Entry1: 'one', Entry2: 2 },
			Section2: { Entry1: 1, Entry2: true, Entry3: { foo: 'bar' } }, // Invalid Entry: Entries must be primitive types.
			InvalidSection1: 'foo',			// Invalid Section: An INI section must be represented by an object.
			InvalidSection2: [ 1, 2, 3 ],	// Invalid Section: An INI section must be represented by an object.
		};
		let text = LIB_JSON.ToIniText( data1 );
		let data2 = LIB_JSON.FromIniText( text );
		LIB_ASSERT.equal( data2.Section1.Entry1, 'one' );
		LIB_ASSERT.equal( data2.Section1.Entry2, '2' );
		LIB_ASSERT.equal( data2.Section2.Entry1, '1' );
		LIB_ASSERT.equal( data2.Section2.Entry2, 'true' );
		LIB_ASSERT.equal( data2.InvalidSection1, undefined );
		LIB_ASSERT.equal( data2.InvalidSection2, undefined );
		LIB_ASSERT.equal( data2.Section2.Entry3, undefined );
	} );


} );
