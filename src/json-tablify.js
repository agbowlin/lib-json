"use strict";
/**
 * @module lib-json
 */

const LIB_STRINGIFY = require( './json-stringify.js' );


//---------------------------------------------------------------------
exports.tablify = tablify;


//---------------------------------------------------------------------
function tablify( Node, Options = {} )
{

	//---------------------------------------------------------------------
	function tablify_recurse( Node, Depth, Options, Context = null ) 
	{
		let text = '';

		if ( Depth > Options.max_tablify_depth )
		{
			return LIB_STRINGIFY.stringify( Node );
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
				for ( let index = 0; index < Node.length; index++ )
				{
					text += Options.tab_char.repeat( Depth + 1 );
					text += tablify_recurse( Node[ index ], Depth + 1, Options, 'array-element' );
					if ( index < ( Node.length - 1 ) ) { text += Options.eol_char; }
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
				keys.map( ( key ) => { if ( key.length > max_key_length ) { max_key_length = key.length; } } );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					text += Options.tab_char.repeat( Depth + 1 );
					text += `${key}${''.padEnd( max_key_length - key.length )} : `;
					text += tablify_recurse( Node[ key ], Depth + 1, Options, 'field-value' );
					if ( index < ( key.length - 1 ) ) { text += Options.eol_char; }
				}
			}
		}

		return text;
	}


	//---------------------------------------------------------------------
	Options = Options ? Options : {};
	Options.literal_quote = Options.literal_quote ? Options.literal_quote : `"`;
	Options.eol_char = Options.eol_char ? Options.eol_char : `\n`;
	Options.tab_char = Options.tab_char ? Options.tab_char : `    `;
	Options.max_tablify_depth = Options.max_tablify_depth ? Options.max_tablify_depth : 1;


	//---------------------------------------------------------------------
	return tablify_recurse( Node, 0, Options, null );
}


let text = tablify(
	{
		"Report Name": 'My Super Technical Report',
		"Timestamp": ( new Date() ).toString(),
		"Author": 'Computer Algorithm',
		"Results":
			[
				{
					"Trial Number": 1,
					"Source": 'Category A',
					"Result": 0.95,
				},
				{
					"Trial Number": 2,
					"Source": 'Category B',
					"Result": 0.83,
				},
				{
					"Trial Number": 3,
					"Source": 'Category C',
					"Result": 0.87,
				},
			],
		"Summary":
		{
			"Number of Trials": 3,
			"Average Result": 0.8833
		}
	}
);
console.log( text );