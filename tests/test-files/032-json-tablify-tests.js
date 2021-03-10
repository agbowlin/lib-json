"use strict";


const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_ASSERT = require( 'assert' );

const LIB_JSON = require( LIB_PATH.resolve( __dirname, '../../src/lib-json.js' ) );

let test_1_json = LIB_FS.readFileSync( LIB_PATH.resolve( __dirname, '../test-data/test_1.json' ), 'utf8' );

let result = null;


//---------------------------------------------------------------------
describe( `032) Json Tablify`, function ()
{


	//---------------------------------------------------------------------
	describe( `Tablify Tests`, function ()
	{


		//---------------------------------------------------------------------
		it( `should tablify a simple array of numbers`, function ()
		{
			result = LIB_JSON.Tablify( [
				1, 2, 3
			] );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected = `
1
2
3
`;
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify a simple number value`, function ()
		{
			result = LIB_JSON.Tablify( 42 );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected = `
42
`;
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify a simple string value`, function ()
		{
			result = LIB_JSON.Tablify( 'hello world' );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected = `
hello world
`;
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify a simple object`, function ()
		{
			result = LIB_JSON.Tablify( {
				number: 42,
				text: 'hello world',
			} );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected = `
number : 42
text   : hello world

`; // <-- NOTE: Has an extra EOL.
			console.error( 'There are formatting issues!' );
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify a simple array of strings`, function ()
		{
			result = LIB_JSON.Tablify( [
				'hello', 'world', 'koo', 'bar'
			] );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected = `
hello
world
koo
bar
`;
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify a simple array of objects`, function ()
		{
			result = LIB_JSON.Tablify( [
				{ id: 1, text: 'A' },
				{ id: 2, text: 'B' },
				{ id: 3, text: 'C' },
			] );
			LIB_ASSERT.ok( result );
			// console.log( result );
			let expected =
				`
id | text
---+-----
1  | A   
2  | B   
3  | C   
`;
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


		//---------------------------------------------------------------------
		it( `should tablify test data`, function ()
		{
			result = LIB_JSON.Tablify( JSON.parse( test_1_json ) );
			LIB_ASSERT.ok( result );
			// console.log( result );
			// LIB_FS.writeFileSync( __dirname + '/test-data/test_1.tablify.txt', result );
			let expected = `
one   : 1
two   : 2
three : 
    three-1
    three-2
    three-3
four  : 
    four_1 : 4.1
    four_2 : 4.2
    four_3 : 4.3
five  : 
    six : 
        seven : 7
        eight : 8
        nine  : 9

none  : nulldone  : true
`; // <-- NOTE: This is jacked up.
			console.error( 'There are formatting issues!' );
			expected = expected.substr( 1, expected.length - 2 ); // Remove leading and trailing CRLFs.
			LIB_ASSERT.strictEqual( result, expected );
			return;
		} );


	} );


} );
