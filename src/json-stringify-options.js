"use strict";
/**
 * @module lib-json
 */


//---------------------------------------------------------------------
exports.StringifyOptionsMinimal = StringifyOptionsMinimal;
exports.StringifyOptionsStandard = StringifyOptionsStandard;
exports.StringifyOptionsVeryPretty = StringifyOptionsVeryPretty;


//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to Stringify.
 * This set of options produces a minimal Json representation akin
 * to Javascript's default stringify. (i.e. single line, minimal spacing)
 */
function StringifyOptionsMinimal()
{
	return {
		identifier_quote: `"`,
		always_quote_identifiers: true,
		literal_quote: `"`,
	};
};


//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to Stringify.
 * This set of options produces a standard Json representation akin
 * to Javascript's stringify called with spacing options.
 * (i.e. multi line, spacing for layout)
 */
function StringifyOptionsStandard()
{
	return {
		identifier_quote: `"`,
		always_quote_identifiers: true,
		literal_quote: `"`,
		eol_char: '\n',
		tab_char: '    ',
		space_char: ' ',
	};
};


//---------------------------------------------------------------------
/**
 * A predefined set of options to pass to Stringify.
 * This set of options produces a Json representation akin
 * to Javascript code. (i.e. multi line, spacing for layout)
 */
function StringifyOptionsVeryPretty()
{
	return {
		identifier_quote: `'`,
		literal_quote: `"`,
		eol_char: '\n',
		tab_char: '    ',
		space_char: ' ',
		always_quote_identifiers: false, // Not implemented
		liberal_commas: true,
		align_values: true,
		//TODO: The following options have not been implemented:
		extroverted_arrays: true,
		extroverted_brackets: true,
		extroverted_braces: true,
	};
};

