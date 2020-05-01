"use strict";

class JsonFormatter
{


	//---------------------------------------------------------------------
	static STRINGIFY_OPTIONS_MINIMAL ()
	{
		return {
			identifier_quote: `"`,
			always_quote_identifiers: true,
			literal_quote: `"`,
		};
	};


	//---------------------------------------------------------------------
	static STRINGIFY_OPTIONS_STANDARD ()
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
	static STRINGIFY_OPTIONS_VERYPRETTY ()
	{
		return {
			identifier_quote: `'`,
			always_quote_identifiers: false, // Not implemented
			literal_quote: `"`,
			eol_char: '\n',
			tab_char: '    ',
			space_char: ' ',
			liberal_commas: true,
			align_values: true,
			/*
				TODO: The following options have not been implemented.
			*/
			extroverted_arrays: true,
			extroverted_brackets: true,
			extroverted_braces: true,
		};
	};


	//---------------------------------------------------------------------
	static stringify ( Node, Options = null )
	{

		//---------------------------------------------------------------------
		function stringify_recurse ( Node, Depth, Options )
		{
			let json = '';

			if ( typeof Node === 'undefined' )
			{
				// return '';
			}
			else if ( typeof Node === 'boolean' )
			{
				json += Node.toString();
			}
			else if ( typeof Node === 'number' )
			{
				json += Node.toString();
			}
			else if ( typeof Node === 'bigint' )
			{
				json += Node.toString();
			}
			else if ( typeof Node === 'string' )
			{
				let value = Node.toString();
				value = value.replace( Options.literal_quote, '\\' + Options.literal_quote );
				json += `${ Options.literal_quote }${ value }${ Options.literal_quote }`;
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
					json += 'null';
				}
				else if ( Array.isArray( Node ) )
				{
					json += Options.eol_char;
					json += Options.tab_char.repeat( Depth );
					json += '[';
					json += Options.eol_char;
					for ( let index = 0; index < Node.length; index++ )
					{
						json += Options.tab_char.repeat( Depth + 1 );
						json += stringify_recurse( Node[ index ], Depth + 1, Options );
						if ( ( index < ( Node.length - 1 ) ) || Options.liberal_commas )
						{
							json += ',';
						}
						json += Options.eol_char;
					}
					json += Options.tab_char.repeat( Depth );
					json += ']';
				}
				else
				{
					json += Options.eol_char;
					json += Options.tab_char.repeat( Depth );
					json += '{';
					json += Options.eol_char;
					let keys = Object.keys( Node );
					let max_key_length = 0;
					keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
					for ( let index = 0; index < keys.length; index++ )
					{
						let key = keys[ index ];
						json += Options.tab_char.repeat( Depth + 1 );
						//TODO: Implement: Options.always_quote_identifiers = false
						json += `${ Options.identifier_quote }${ key }${ Options.identifier_quote }`;
						json += ':';
						if ( Options.align_values )
						{
							json += ' '.repeat( max_key_length - key.length );
						}
						json += Options.space_char;
						json += stringify_recurse( Node[ key ], Depth + 1, Options );
						if ( ( index < ( keys.length - 1 ) ) || Options.liberal_commas )
						{
							json += ',';
						}
						json += Options.eol_char;
					}
					json += Options.tab_char.repeat( Depth );
					json += '}';
				}
			}

			return json;
		}

		//---------------------------------------------------------------------
		Options = Options ? Options : {};
		Options.identifier_quote = Options.identifier_quote ? Options.identifier_quote : `"`;
		Options.always_quote_identifiers = Options.always_quote_identifiers ? Options.always_quote_identifiers : true;
		Options.literal_quote = Options.literal_quote ? Options.literal_quote : `"`;
		Options.eol_char = Options.eol_char ? Options.eol_char : ``;
		Options.tab_char = Options.tab_char ? Options.tab_char : ``;
		Options.space_char = Options.space_char ? Options.space_char : ``;
		Options.liberal_commas = Options.liberal_commas ? Options.liberal_commas : false;
		Options.align_values = Options.align_values ? Options.align_values : false;
		Options.extroverted_arrays = Options.extroverted_arrays ? Options.extroverted_arrays : false;
		Options.extroverted_brackets = Options.extroverted_brackets ? Options.extroverted_brackets : false;
		Options.extroverted_braces = Options.extroverted_braces ? Options.extroverted_braces : false;

		//---------------------------------------------------------------------
		return stringify_recurse( Node, 0, Options );
	}

}

module.exports = JsonFormatter;
