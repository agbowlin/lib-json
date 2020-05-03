"use strict";

const LIB_JSON = require( '../lib-json.js' );
// const LIB_JSON = require( '../dist/lib-json.dist.js' );

{
	let data1 = [
		{ name: 'Hello', values: [ 1, 2, 3 ] },
		{ name: 'Excelsior', value: 'burrito' },
		{ name: 'black', value: 'white' },
	];
	let data2 = {
		one: { name: 'Hello', values: [ 1, 2, 3 ] },
		two: { name: 'Excelsior', value: 'burrito' },
		three: { name: 'black', value: 'white' },
	};
	let data3 = {
		one: { name: 'Hello', values: [ 1, { two: 2 }, 3 ] },
		two: { name: 'Excelsior', value: 'burrito' },
		three: { name: 'black', value: 'white' },
	};
	// console.log( LIB_JSON.stringify( data1, LIB_JSON.STRINGIFY_OPTIONS_VERYPRETTY ) );
	// console.log( LIB_JSON.stringify( data2, LIB_JSON.STRINGIFY_OPTIONS_VERYPRETTY ) );
	// console.log( LIB_JSON.stringify( data3, LIB_JSON.STRINGIFY_OPTIONS_VERYPRETTY ) );
}
