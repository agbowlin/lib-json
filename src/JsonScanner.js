"use strict";

const JsonFinder = require( __dirname + '/JsonFinder.js' );


class JsonScanner
{


	//---------------------------------------------------------------------
	static calculate_transform ( Node1, Node2 )
	{

		//---------------------------------------------------------------------
		function calculate_transform_recurse ( Node1, Node2, Path, Transform )
		{
			// Handle cases where one or another Node is undefined.
			if ( typeof Node1 === 'undefined' )
			{
				if ( typeof Node2 === 'undefined' ) { return; }
				// Value missing
				Transform.entries.push( {
					path: Path,
					type: 'value missing',
					value: Node2,
					explanation: `${ typeof Node1 } !== ${ typeof Node2 }`,
				} );
				return;
			}
			if ( typeof Node2 === 'undefined' )
			{
				// Value extraneous
				Transform.entries.push( {
					path: Path,
					type: 'value extraneous',
					value: Node2,
					explanation: `${ typeof Node1 } !== ${ typeof Node2 }`,
				} );
				return;
			}

			// Handle cases where the types of values differ.
			if ( typeof Node1 !== typeof Node2 )
			{
				// Type mismatch
				Transform.entries.push( {
					path: Path,
					type: 'type mismatch',
					value: Node2,
					explanation: `${ typeof Node1 } !== ${ typeof Node2 }`,
				} );
				return;
			}

			// Handle cases where the values differ.
			if (
				( typeof Node1 === 'boolean' )
				|| ( typeof Node1 === 'number' )
				|| ( typeof Node1 === 'bigint' )
				|| ( typeof Node1 === 'string' )
				|| ( Node1 === null )
				|| ( Node2 === null )
			)
			{
				if ( Node1 !== Node2 )
				{
					// Value mismatch
					Transform.entries.push( {
						path: Path,
						type: 'value mismatch',
						value: Node2,
						explanation: `${ Node1 } !== ${ Node2 }`,
					} );
				}
				return;
			}

			// Handle Arrays and Objects.
			if ( typeof Node1 === 'object' )
			{
				if ( Array.isArray( Node1 ) )
				{
					for ( let index = 0; index < Node1.length; index++ )
					{
						calculate_transform_recurse( Node1[ index ], Node2[ index ], Path + `[${ index }]`, Transform );
					}
				}
				else
				{
					let keys = Object.keys( Node1 );
					for ( let index = 0; index < keys.length; index++ )
					{
						let key = keys[ index ];
						calculate_transform_recurse( Node1[ key ], Node2[ key ], Path + `.${ key }`, Transform );
					}
				}
			}

			return;
		}


		//---------------------------------------------------------------------
		let transform = {
			root: '$',
			entries: [],
		};
		calculate_transform_recurse( Node1, Node2, '$', transform );
		return transform;

	}


	//---------------------------------------------------------------------
	static apply_transform ( Node, Transform )
	{
		
		return null;
	}


}

module.exports = JsonScanner;
