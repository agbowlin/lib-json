"use strict";
/**
 * @module lib-json
 */


//=====================================================================
//=====================================================================
//
//		Traverse
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_traverse = require( './src/json-traverse.js' );

exports.traverse = json_traverse.traverse;


//---------------------------------------------------------------------
/**
 * Test if a Javascript object contains the specified path.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @return {boolean} True if Path exists in Root.
 */
exports.has_path =
	function has_path ( Root, Path )
	{
		return json_traverse.traverse( Root, info => 
		{
			if ( info.path === Path ) { return true; }
		} );
	}


//---------------------------------------------------------------------
/**
 * Find a field name within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Name - The name to find in the object.
 * @return {boolean} The path of the located node.
 */
exports.find_name =
	function find_name ( Root, Name )
	{
		return json_traverse.traverse( Root, info => { if ( info.name === Name ) { return info.path; } } );
	}


//---------------------------------------------------------------------
/**
 * Find a field value within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Value - The value to find in the object.
 * @return {boolean} The path of the located node.
 */
exports.find_value =
	function find_value ( Root, Value )
	{
		return json_traverse.traverse( Root, info => { if ( info.value === Value ) { return info.path; } } );
	}


//---------------------------------------------------------------------
/**
 * Get the field value at a specific path within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @return {boolean} The value that was found.
 */
exports.get_value =
	function get_value ( Root, Path )
	{
		return json_traverse.traverse( Root, info => { if ( info.path === Path ) { return info.value; } } );
	}


//---------------------------------------------------------------------
/**
 * Set the field value at a specific path within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @param {any} Value - The value to set in the object.
 * @return {boolean} The value that was set.
 */
exports.set_value =
	function set_value ( Root, Path, Value )
	{
		return json_traverse.traverse( Root, info =>
		{
			if ( info.path === Path ) 
			{
				info.parent[ info.name ] = Value;
				return Value;
			}
		} );
	}


//=====================================================================
//=====================================================================
//
//		Stringify
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_stringify = require( './src/json-stringify.js' );

exports.stringify = json_stringify.stringify;


//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to stringify.
 * This set of options produces a minimal Json representation akin
 * to Javascript's default stringify. (i.e. single line, minimal spacing)
 */
exports.STRINGIFY_OPTIONS_MINIMAL = json_stringify.STRINGIFY_OPTIONS_MINIMAL();

//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to stringify.
 * This set of options produces a standard Json representation akin
 * to Javascript's stringify called with spacing options.
 * (i.e. multi line, spacing for layout)
 */
exports.STRINGIFY_OPTIONS_STANDARD = json_stringify.STRINGIFY_OPTIONS_STANDARD();

//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to stringify.
 * This set of options produces a Json representation akin
 * to Javascript code. (i.e. multi line, spacing for layout)
 */
exports.STRINGIFY_OPTIONS_VERYPRETTY = json_stringify.STRINGIFY_OPTIONS_VERYPRETTY();


//=====================================================================
//=====================================================================
//
//		Tablify
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_tablify = require( './src/json-tablify.js' );

exports.tablify = json_tablify.tablify;


//=====================================================================
//=====================================================================
//
//		Parse
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_parse = require( './src/json-parse.js' );

exports.parse = json_parse.parse;
exports.tokenize = json_parse.tokenize;
exports.build_object = json_parse.build_object;


//---------------------------------------------------------------------
/**
 * Performs a deep copy of an object.
 */
exports.clone =
	function clone ( Json )
	{
		let json = json_stringify.stringify( Json );
		let tokens = json_parse.tokenize( json );
		// let clone = object_builder.build_object( tokens );
		let clone = json_parse.build_object( tokens );
		return clone;
	};


//=====================================================================
//=====================================================================
//
//		Transform
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_transform = require( './src/json-transform.js' );

exports.calculate_transform = json_transform.calculate_transform
exports.apply_transform = json_transform.apply_transform


//=====================================================================
//=====================================================================
//
//		Other
//
//=====================================================================
//=====================================================================

// exports.difference = JsonComparer.difference;
// exports.patch = JsonComparer.patch;

