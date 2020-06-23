"use strict";

var LIB_FS = require( 'fs' );
var LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( '../lib-json.js' );
// const LIB_JSON = require( '../dist/lib-json.dist.js' );

// let test_1_json = LIB_FS.readFileSync( __dirname + '/test_1.json', 'utf8' );
// let test_1_data = JSON.parse( test_1_json );


//---------------------------------------------------------------------
describe( `Json IniText`, function ()
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
			InvalidSection1: 'foo',
			InvalidSection2: [ 1, 2, 3 ],
			Section1: { Entry1: 'one', Entry2: 2 },
			Section2: { Entry1: 1, Entry2: true, Entry3: { foo: 'bar' } },
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
