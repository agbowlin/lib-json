"use strict";
/**
 * @module lib-initext
 */


//---------------------------------------------------------------------


//---------------------------------------------------------------------
exports.to_initext = to_initext;
exports.from_initext = from_initext;


//---------------------------------------------------------------------
function to_initext ( Data )
{
	//NOTE: This function has the following side effects:
	//		- ignores all sections that are not of type object
	//		- ignores all entry values that are not of a primitive type
	let ini_text = '';
	let section_keys = Object.keys( Data );
	for ( let section_index = 0; section_index < section_keys.length; section_index++ )
	{
		let section_key = section_keys[ section_index ];
		let section_data = Data[ section_key ];
		if ( !( typeof section_data === 'object' ) ) { continue; }
		if ( Array.isArray( section_data ) ) { continue; }
		ini_text += `[${ section_key }]\n`;
		let entry_keys = Object.keys( section_data );
		for ( let entry_index = 0; entry_index < entry_keys.length; entry_index++ )
		{
			let entry_key = entry_keys[ entry_index ];
			let entry_value = section_data[ entry_key ];
			if (
				( typeof entry_value === 'symbol' )
				|| ( typeof entry_value === 'function' )
				|| ( typeof entry_value === 'object' )
			)
			{
				continue;
			}
			ini_text += `${ entry_key }=${ entry_value }\n`;
		}
	}
	return ini_text;
}


//---------------------------------------------------------------------
function from_initext ( IniText )
{
	//NOTE: This function has the following side effects:
	//		- ignores all lines before the first section is found
	//		- ignores all entry lines which do not contain an '=' character
	//		- All entry values are stored as strings and no conversion is attempted
	let data = {};
	let lines = IniText.split( '\n' );
	let section_name = '';
	for ( let line_index = 0; line_index < lines.length; line_index++ )
	{
		let line = lines[ line_index ];
		if ( !line ) { continue; }
		line = line.trim();
		if ( line.startsWith( '[' ) )
		{
			// New Section
			let ich = line.indexOf( ']' );
			if ( ich < 0 ) { ich = line.length; }
			section_name = line.substring( 1, ich );
			section_name = section_name.trim();
			data[ section_name ] = {};
		}
		else if ( section_name )
		{
			// New Entry
			let ich = line.indexOf( '=' );
			if ( ich < 0 ) { continue; }
			let entry_name = line.substring( 0, ich );
			entry_name = entry_name.trim();
			let entry_value = line.substring( ich + 1 );
			entry_value = entry_value.trim();
			data[ section_name ][ entry_name ] = entry_value;
		}
	}
	return data;
}


