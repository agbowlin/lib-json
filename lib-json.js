"use strict";


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
exports.HasPath =
	function HasPath ( Root, Path )
	{
		return json_traverse.Traverse( Root, info => 
		{
			if ( info.path === Path ) { return true; }
		} );
	};


//---------------------------------------------------------------------
exports.FindName =
	function FindName ( Root, Name )
	{
		return json_traverse.Traverse( Root, info => { if ( info.name === Name ) { return info.path; } } );
	};


//---------------------------------------------------------------------
exports.FindValue =
	function FindValue ( Root, Value )
	{
		return json_traverse.Traverse( Root, info => { if ( info.value === Value ) { return info.path; } } );
	};


//---------------------------------------------------------------------
exports.GetValue =
	function GetValue ( Root, Path )
	{
		return json_traverse.Traverse( Root, info => { if ( info.path === Path ) { return info.value; } } );
	};


//---------------------------------------------------------------------
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
	};


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
const json_stringify_options = require( './src/json-stringify-options.js' );
exports.StringifyOptionsMinimal = json_stringify_options.StringifyOptionsMinimal;
exports.StringifyOptionsStandard = json_stringify_options.StringifyOptionsStandard;
exports.StringifyOptionsVeryPretty = json_stringify_options.StringifyOptionsVeryPretty;


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
const json_initext = require( './src/json-ini-text.js' );
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
	function Clone ( Node )
	{
		let json = json_stringify.Stringify( Node );
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

