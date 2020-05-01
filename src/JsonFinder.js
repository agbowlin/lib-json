"use strict";

class JsonFinder
{


	//---------------------------------------------------------------------
	static traverse ( Root, Visitor )
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


	//---------------------------------------------------------------------
	static has_path ( Root, Path )
	{
		return JsonFinder.traverse( Root,
			function ( info )
			{
				if ( info.path === Path )
				{
					return true;
				}
			} );
	}


	//---------------------------------------------------------------------
	static find_name ( Root, Name )
	{
		return JsonFinder.traverse( Root,
			function ( info )
			{
				if ( info.name === Name )
				{
					return info.path;
				}
			} );
	}


	//---------------------------------------------------------------------
	static find_value ( Root, Value )
	{
		return JsonFinder.traverse( Root,
			function ( info )
			{
				if ( info.value === Value )
				{
					return info.path;
				}
			} );
	}


	//---------------------------------------------------------------------
	static get_value ( Root, Path )
	{
		return JsonFinder.traverse( Root,
			function ( info )
			{
				if ( info.path === Path )
				{
					return info.value;
				}
			} );
	}


	//---------------------------------------------------------------------
	static set_value ( Root, Path, Value )
	{
		return JsonFinder.traverse( Root,
			function ( info )
			{
				if ( info.path === Path )
				{
					info.parent[ info.name ] = Value;
					return Value;
				}
			} );
	}


}

module.exports = JsonFinder;
