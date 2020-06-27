"use strict";


const LIB_STRINGIFY = require( './json-stringify.js' );
const LIB_STRINGIFY_OPTIONS = require( './json-stringify-options.js' );


//---------------------------------------------------------------------
exports.Tablify = Tablify;


//---------------------------------------------------------------------
function Tablify( Node, TablifyOptions = {} )
{

	//---------------------------------------------------------------------
	function tablify_recurse( Node, Depth, Options, Context = null ) 
	{
		let text = '';
		let stringify_options = LIB_STRINGIFY_OPTIONS.StringifyOptionsMinimal();
		stringify_options.identifier_quote = '';
		stringify_options.always_quote_identifiers = false;
		stringify_options.literal_quote = '';
		stringify_options.space_char = ' ';

		if ( Depth > Options.max_tablify_depth )
		{
			return LIB_STRINGIFY.Stringify( Node, stringify_options );
		}

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
			text += Node.toString();
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
				if ( Context === 'field-value' )
				{
					text += Options.eol_char;
				}
				if ( Node.length === 0 )
				{
					return '';
				}
				if (
					( typeof Node[ 0 ] === 'object' )
					&& ( Node[ 0 ] !== null )
				)
				{
					if ( Array.isArray( Node[ 0 ] ) )
					{
						// Table of arrays.
						for ( let index = 0; index < Node.length; index++ )
						{
							text += Options.tab_char.repeat( Depth );
							text += LIB_STRINGIFY.Stringify( Node[ index ], stringify_options );
							if ( index < ( Node.length - 1 ) ) { text += Options.eol_char; }
						}
					}
					else
					{
						// Table of objects.
						// Get column widths.
						let keys = Object.keys( Node[ 0 ] );
						let col_widths = keys.map( key => key.length );
						for ( let index = 0; index < Node.length; index++ )
						{
							for ( let col_index = 0; col_index < keys.length; col_index++ )
							{
								let value = LIB_STRINGIFY.Stringify( Node[ index ][ keys[ col_index ] ], stringify_options );
								if ( col_widths[ col_index ] < value.length ) { col_widths[ col_index ] = value.length; }
							}
						}
						// Display column headers.
						text += Options.tab_char.repeat( Depth );
						for ( let col_index = 0; col_index < keys.length; col_index++ )
						{
							if ( col_index > 0 ) { text += ' | '; }
							let value = keys[ col_index ];
							text += value;
							text += ''.padEnd( col_widths[ col_index ] - value.length );
						}
						text += Options.eol_char;
						// Display column header line.
						text += Options.tab_char.repeat( Depth );
						for ( let col_index = 0; col_index < keys.length; col_index++ )
						{
							if ( col_index > 0 ) { text += '-+-'; }
							text += '-'.repeat( col_widths[ col_index ] );
						}
						text += Options.eol_char;
						// Display values.
						for ( let index = 0; index < Node.length; index++ )
						{
							text += Options.tab_char.repeat( Depth );
							for ( let col_index = 0; col_index < keys.length; col_index++ )
							{
								if ( col_index > 0 ) { text += ' | '; }
								let value = LIB_STRINGIFY.Stringify( Node[ index ][ keys[ col_index ] ], stringify_options );
								text += value;
								text += ''.padEnd( col_widths[ col_index ] - value.length );
							}
							if ( index < ( Node.length - 1 ) ) { text += Options.eol_char; }
						}
					}
				}
				else
				{
					// Table of primiive values.
					for ( let index = 0; index < Node.length; index++ )
					{
						text += Options.tab_char.repeat( Depth );
						text += tablify_recurse( Node[ index ], Depth + 1, Options, 'array-element' );
						if ( index < ( Node.length - 1 ) ) { text += Options.eol_char; }
					}
				}
			}
			else
			{
				if ( Context === 'field-value' )
				{
					text += Options.eol_char;
				}
				// Get the object keys.
				let keys = Object.keys( Node );
				// Get the max column width for the keys.
				let max_key_length = 0;
				keys.forEach( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				// Display Values.
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += Options.tab_char.repeat( Depth );
					text += `${key}${''.padEnd( max_key_length - key.length )} : `;
					text += tablify_recurse( Node[ key ], Depth + 1, Options, 'field-value' );
					if ( index < ( key.length - 1 ) ) { text += Options.eol_char; }
				}
			}
		}

		return text;
	}


	//---------------------------------------------------------------------
	TablifyOptions = TablifyOptions ? TablifyOptions : {};
	TablifyOptions.literal_quote = TablifyOptions.literal_quote ? TablifyOptions.literal_quote : `"`;
	TablifyOptions.eol_char = TablifyOptions.eol_char ? TablifyOptions.eol_char : `\n`;
	TablifyOptions.tab_char = TablifyOptions.tab_char ? TablifyOptions.tab_char : `    `;
	TablifyOptions.max_tablify_depth = TablifyOptions.max_tablify_depth ? TablifyOptions.max_tablify_depth : 2;


	//---------------------------------------------------------------------
	return tablify_recurse( Node, 0, TablifyOptions, null );
}


// let text = tablify(
// 	{
// 		"Report Name": 'My Super Technical Report',
// 		"Timestamp": ( new Date() ).toString(),
// 		"Author": 'Computer Algorithm',
// 		"Raw Data": [ 0.95, 0.83, 0.87 ],
// 		"More Raw Data":
// 			[
// 				[ 1, 2, 3 ],
// 				[ 0.95, 0.83, 0.87 ],
// 			],
// 		"Results":
// 			[
// 				{
// 					"Trial Number": 1,
// 					"Source": 'Category A',
// 					"Result": 0.95,
// 				},
// 				{
// 					"Trial Number": 2,
// 					"Source": 'Category B',
// 					"Result": 0.83,
// 				},
// 				{
// 					"Trial Number": 3,
// 					"Source": 'Category C',
// 					"Result": 0.87,
// 				},
// 			],
// 		"Summary":
// 		{
// 			"Number of Trials": 3,
// 			"Average Result": 0.8833,
// 		},
// 	}
// );
// console.log( text );
