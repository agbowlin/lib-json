"use strict";
/**
 * @module lib-json
 */


//---------------------------------------------------------------------
exports.Traverse = Traverse;




/**
 * The Info object provided to the Visitor callback function.
 * @typedef {object} VisitorInfo
 * @property {object}	parent	- The parent of the currently visited field.
 * @property {string}	name	- The parent of the currently visited field.
 * @property {any}		value	- The parent of the currently visited field.
 * @property {string}	path	- The parent of the currently visited field.
 * @property {integer}	depth	- The parent of the currently visited field.
 */


 /**
 * @callback VisitorCallback
 * @param {VisitorInfo} Info - Info object describing the currently visited
 * 								field in the object.
 */


/**
 * @function Traverse
 * @description
 * Traverses an object structure.
 * Implements a depth-first visitor.
 * @param {object} Root - The root Javascript object to begin searching in.
 * @param {object} Visitor - The visitor function to call at each field.
 * 		Visitor is passed an info object describing the field.
 */
//---------------------------------------------------------------------
function Traverse ( Root, Visitor )
{

	//---------------------------------------------------------------------
	function traverse_recurse ( Visitor, Parent, Name, Value, Path, Depth )
	{
		let info =
		{
			parent: Parent,
			name: Name,
			value: Value,
			path: Path,
			depth: Depth,
		};
		let result = Visitor( info );
		if ( typeof result !== 'undefined' ) { return result; }

		if ( typeof Value === 'object' )
		{
			if ( Value === null ) { return; }
			if ( Array.isArray( Value ) )
			{
				for ( let index = 0; index < Value.length; index++ )
				{
					result = traverse_recurse( Visitor, Value, index, Value[ index ], Path + `[${ index }]`, Depth + 1 );
					if ( typeof result !== 'undefined' ) { return result; }
				}
			}
			else
			{
				let keys = Object.keys( Value );
				for ( let index = 0; index < keys.length; index++ )
				{
					let key = keys[ index ];
					result = traverse_recurse( Visitor, Value, key, Value[ key ], Path + `.${ key }`, Depth + 1 );
					if ( typeof result !== 'undefined' ) { return result; }
				}
			}
		}

		return;
	}

	//---------------------------------------------------------------------
	return traverse_recurse( Visitor, null, '$', Root, '$', 0 );
}
