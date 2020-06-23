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

exports.Traverse = json_traverse.Traverse;


//---------------------------------------------------------------------
/**
 * Test if a Javascript object contains the specified path.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @return {boolean} True if Path exists in Root.
 */
exports.HasPath =
	function HasPath ( Root, Path )
	{
		return json_traverse.Traverse( Root, info => 
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
exports.FindName =
	function FindName ( Root, Name )
	{
		return json_traverse.Traverse( Root, info => { if ( info.name === Name ) { return info.path; } } );
	}


//---------------------------------------------------------------------
/**
 * Find a field value within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Value - The value to find in the object.
 * @return {boolean} The path of the located node.
 */
exports.FindValue =
	function FindValue ( Root, Value )
	{
		return json_traverse.Traverse( Root, info => { if ( info.value === Value ) { return info.path; } } );
	}


//---------------------------------------------------------------------
/**
 * Get the field value at a specific path within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @return {boolean} The value that was found.
 */
exports.GetValue =
	function GetValue ( Root, Path )
	{
		return json_traverse.Traverse( Root, info => { if ( info.path === Path ) { return info.value; } } );
	}


//---------------------------------------------------------------------
/**
 * Set the field value at a specific path within a Javascript object.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {string} Path - The path to find in the object.
 * @param {any} Value - The value to set in the object.
 * @return {boolean} The value that was set.
 */
exports.SetValue =
	function SetValue ( Root, Path, Value )
	{
		return json_traverse.Traverse( Root, info =>
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

exports.Stringify = json_stringify.Stringify;


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

exports.Tablify = json_tablify.Tablify;


//=====================================================================
//=====================================================================
//
//		IniText
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_initext = require( './src/json-initext.js' );

exports.ToIniText = json_initext.ToIniText;
exports.FromIniText = json_initext.FromIniText;


//=====================================================================
//=====================================================================
//
//		Parse
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
const json_parse = require( './src/json-parse.js' );

exports.Parse = json_parse.Parse;
exports.Tokenize = json_parse.Tokenize;
exports.BuildObject = json_parse.BuildObject;


//---------------------------------------------------------------------
/**
 * Performs a deep copy of an object.
 */
exports.Clone =
	function Clone ( Json )
	{
		let json = json_stringify.Stringify( Json );
		let tokens = json_parse.Tokenize( json );
		let clone = json_parse.BuildObject( tokens );
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

exports.CalculateTransform = json_transform.CalculateTransform;
exports.ApplyTransform = json_transform.ApplyTransform;


//=====================================================================
//=====================================================================
//
//		Other
//
//=====================================================================
//=====================================================================

// exports.difference = JsonComparer.difference;
// exports.patch = JsonComparer.patch;

