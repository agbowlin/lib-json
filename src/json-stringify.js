"use strict";


//---------------------------------------------------------------------
exports.Stringify = Stringify;


//---------------------------------------------------------------------
function Stringify( Node, StringifyOptions = null )
{

	//---------------------------------------------------------------------
	function stringify_recurse( Node, Depth, StringifyOptions, Context = null )
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
			if ( StringifyOptions.literal_quote )
			{
				value = value.replace( StringifyOptions.literal_quote, '\\' + StringifyOptions.literal_quote );
			}
			text += `${StringifyOptions.literal_quote}${value}${StringifyOptions.literal_quote}`;
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
				text += StringifyOptions.eol_char;
				text += StringifyOptions.tab_char.repeat( Depth );
				text += '[' + StringifyOptions.space_char;
				text += StringifyOptions.eol_char;
				for ( let index = 0; index < Node.length; index++ )
				{
					text += StringifyOptions.tab_char.repeat( Depth + 1 );
					text += stringify_recurse( Node[ index ], Depth + 1, StringifyOptions, 'array-element' );
					if ( ( index < ( Node.length - 1 ) ) || StringifyOptions.liberal_commas )
					{
						text += ',' + StringifyOptions.space_char;
					}
					text += StringifyOptions.eol_char;
				}
				text += StringifyOptions.tab_char.repeat( Depth );
				if ( !StringifyOptions.eol_char ) { text += StringifyOptions.space_char; }
				text += ']';
			}
			else
			{
				if ( Context === 'field-value' )
				{
					text += StringifyOptions.eol_char;
					text += StringifyOptions.tab_char.repeat( Depth );
				}
				text += '{' + StringifyOptions.space_char;
				text += StringifyOptions.eol_char;
				let keys = Object.keys( Node );
				let max_key_length = 0;
				keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += StringifyOptions.tab_char.repeat( Depth + 1 );
					//TODO: Implement: Options.always_quote_identifiers = false
					text += `${StringifyOptions.identifier_quote}${key}${StringifyOptions.identifier_quote}`;
					text += ':';
					if ( StringifyOptions.align_values )
					{
						text += ' '.repeat( max_key_length - key.length );
					}
					text += StringifyOptions.space_char;
					text += stringify_recurse( Node[ key ], Depth + 1, StringifyOptions, 'field-value' );
					if ( ( index < ( keys.length - 1 ) ) || StringifyOptions.liberal_commas )
					{
						text += ',' + StringifyOptions.space_char;
					}
					text += StringifyOptions.eol_char;
				}
				text += StringifyOptions.tab_char.repeat( Depth );
				if ( !StringifyOptions.eol_char ) { text += StringifyOptions.space_char; }
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
	StringifyOptions = StringifyOptions ? StringifyOptions : {};
	StringifyOptions.identifier_quote = set_string( StringifyOptions.identifier_quote, `"` );
	StringifyOptions.literal_quote = set_string( StringifyOptions.literal_quote, `"` );
	StringifyOptions.eol_char = set_string( StringifyOptions.eol_char, '' );
	StringifyOptions.tab_char = set_string( StringifyOptions.tab_char, '' );
	StringifyOptions.space_char = set_string( StringifyOptions.space_char, '' );
	StringifyOptions.always_quote_identifiers = StringifyOptions.always_quote_identifiers ? StringifyOptions.always_quote_identifiers : false;
	StringifyOptions.liberal_commas = StringifyOptions.liberal_commas ? StringifyOptions.liberal_commas : false;
	StringifyOptions.align_values = StringifyOptions.align_values ? StringifyOptions.align_values : false;
	StringifyOptions.extroverted_arrays = StringifyOptions.extroverted_arrays ? StringifyOptions.extroverted_arrays : false;
	StringifyOptions.extroverted_brackets = StringifyOptions.extroverted_brackets ? StringifyOptions.extroverted_brackets : false;
	StringifyOptions.extroverted_braces = StringifyOptions.extroverted_braces ? StringifyOptions.extroverted_braces : false;

	//---------------------------------------------------------------------
	return stringify_recurse( Node, 0, StringifyOptions );
}

