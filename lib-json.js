"use strict";


//---------------------------------------------------------------------
const JsonFormatter = require( './src/JsonFormatter.js' );
const JsonTokenizer = require( './src/JsonTokenizer.js' );
const ObjectBuilder = require( './src/ObjectBuilder.js' );
const JsonFinder = require( './src/JsonFinder.js' );
const JsonScanner = require( './src/JsonScanner.js' );

//---------------------------------------------------------------------
function parse ( Json )
{
	let tokens = JsonTokenizer.tokenize( Json );
	// console.log( stringify( tokens, STRINGIFY_OPTIONS_VERYPRETTY ) );
	return ObjectBuilder.build_object( tokens );
}


//---------------------------------------------------------------------
function clone ( Json )
{
	let json = JsonFormatter.stringify( Json );
	let tokens = JsonTokenizer.tokenize( json );
	let clone = ObjectBuilder.build_object( tokens );
	return clone;
}


//---------------------------------------------------------------------
exports.stringify = JsonFormatter.stringify;
exports.STRINGIFY_OPTIONS_MINIMAL = JsonFormatter.STRINGIFY_OPTIONS_MINIMAL();
exports.STRINGIFY_OPTIONS_STANDARD = JsonFormatter.STRINGIFY_OPTIONS_STANDARD();
exports.STRINGIFY_OPTIONS_VERYPRETTY = JsonFormatter.STRINGIFY_OPTIONS_VERYPRETTY();
exports.parse = parse;
exports.clone = clone;
exports.traverse = JsonFinder.traverse;
exports.has_path = JsonFinder.has_path;
exports.find_name = JsonFinder.find_name;
exports.find_value = JsonFinder.find_value;
exports.get_value = JsonFinder.get_value;
exports.set_value = JsonFinder.set_value;
// exports.difference = JsonComparer.difference;
// exports.patch = JsonComparer.patch;
exports.calculate_transform = JsonScanner.calculate_transform
exports.apply_transform = JsonScanner.apply_transform
