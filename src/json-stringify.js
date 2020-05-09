"use strict";
/**
 * @module lib-json
 */


//---------------------------------------------------------------------
exports.STRINGIFY_OPTIONS_MINIMAL = STRINGIFY_OPTIONS_MINIMAL;
exports.STRINGIFY_OPTIONS_STANDARD = STRINGIFY_OPTIONS_STANDARD;
exports.STRINGIFY_OPTIONS_VERYPRETTY = STRINGIFY_OPTIONS_VERYPRETTY;
exports.stringify = stringify;


//---------------------------------------------------------------------
function STRINGIFY_OPTIONS_MINIMAL()
{
	return {
		identifier_quote: `"`,
		always_quote_identifiers: true,
		literal_quote: `"`,
	};
};


//---------------------------------------------------------------------
function STRINGIFY_OPTIONS_STANDARD()
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
function STRINGIFY_OPTIONS_VERYPRETTY()
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


//---------------------------------------------------------------------
function stringify( Node, Options = null )
{

	//---------------------------------------------------------------------
	function stringify_recurse( Node, Depth, Options, Context = null )
	{
		let text = '';

		if ( typeof Node === 'undefined' )
		{
			// return '';
		}
		else if ( typeof Node === 'boolean' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'number' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'bigint' )
		{
			text += Node.toString();
		}
		else if ( typeof Node === 'string' )
		{
			let value = Node.toString();
			if ( Options.literal_quote )
			{
				value = value.replace( Options.literal_quote, '\\' + Options.literal_quote );
			}
			text += `${Options.literal_quote}${value}${Options.literal_quote}`;
		}
		else if ( typeof Node === 'symbol' )
		{
			// return '';
		}
		else if ( typeof Node === 'function' )
		{
			// return '';
		}
		else if ( typeof Node === 'object' )
		{
			if ( Node === null )
			{
				text += 'null';
			}
			else if ( Array.isArray( Node ) )
			{
				text += Options.eol_char;
				text += Options.tab_char.repeat( Depth );
				text += '[' + Options.space_char;
				text += Options.eol_char;
				for ( let index = 0; index < Node.length; index++ )
				{
					text += Options.tab_char.repeat( Depth + 1 );
					text += stringify_recurse( Node[ index ], Depth + 1, Options, 'array-element' );
					if ( ( index < ( Node.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += ']';
			}
			else
			{
				if ( Context === 'field-value' )
				{
					text += Options.eol_char;
					text += Options.tab_char.repeat( Depth );
				}
				text += '{' + Options.space_char;
				text += Options.eol_char;
				let keys = Object.keys( Node );
				let max_key_length = 0;
				keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += Options.tab_char.repeat( Depth + 1 );
					//TODO: Implement: Options.always_quote_identifiers = false
					text += `${Options.identifier_quote}${key}${Options.identifier_quote}`;
					text += ':';
					if ( Options.align_values )
					{
						text += ' '.repeat( max_key_length - key.length );
					}
					text += Options.space_char;
					text += stringify_recurse( Node[ key ], Depth + 1, Options, 'field-value' );
					if ( ( index < ( keys.length - 1 ) ) || Options.liberal_commas )
					{
						text += ',' + Options.space_char;
					}
					text += Options.eol_char;
				}
				text += Options.tab_char.repeat( Depth );
				if ( !Options.eol_char ) { text += Options.space_char; }
				text += '}';
			}
		}

		return text;
	}

	//---------------------------------------------------------------------
	function set_string( Value, Default )
	{
		if ( typeof Value === 'string' )
		{
			return Value;
		}
		else
		{
			return Default;
		}
	}

	//---------------------------------------------------------------------
	Options = Options ? Options : {};
	Options.identifier_quote = set_string( Options.identifier_quote, `"` );
	Options.literal_quote = set_string( Options.literal_quote, `"` );
	Options.eol_char = set_string( Options.eol_char, '' );
	Options.tab_char = set_string( Options.tab_char, '' );
	Options.space_char = set_string( Options.space_char, '' );
	Options.always_quote_identifiers = Options.always_quote_identifiers ? Options.always_quote_identifiers : false;
	Options.liberal_commas = Options.liberal_commas ? Options.liberal_commas : false;
	Options.align_values = Options.align_values ? Options.align_values : false;
	Options.extroverted_arrays = Options.extroverted_arrays ? Options.extroverted_arrays : false;
	Options.extroverted_brackets = Options.extroverted_brackets ? Options.extroverted_brackets : false;
	Options.extroverted_braces = Options.extroverted_braces ? Options.extroverted_braces : false;

	//---------------------------------------------------------------------
	return stringify_recurse( Node, 0, Options );
}

