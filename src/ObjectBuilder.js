"use strict";

class ObjectBuilder
{

	//---------------------------------------------------------------------
	static consume_comma ( Tokens )
	{
		if ( !Tokens.length ) { return; }
		if ( Tokens[ 0 ].token === ',' ) 
		{
			Tokens.shift();
		}
		return;
	}


	//---------------------------------------------------------------------
	static build_object ( Tokens )
	{
		while ( Tokens.length )
		{
			if ( Tokens[ 0 ].token === '[' )
			{
				Tokens.shift();
				let value = [];
				while ( Tokens[ 0 ].token !== ']' )
				{
					value.push( ObjectBuilder.build_object( Tokens ) );
				}
				Tokens.shift();
				ObjectBuilder.consume_comma( Tokens );
				return value;
			}
			else if ( Tokens[ 0 ].token === '{' )
			{
				Tokens.shift();
				let value = {};
				while ( Tokens[ 0 ].token !== '}' )
				{
					let key = Tokens.shift();
					let colon = Tokens.shift();
					if ( ( key.type !== 'literal' ) && ( key.type !== 'string' ) )
					{
						throw new Error( `At position [${ key.at }]: Expected literal, found ${ key.type } '${ key.token }' instead.`, key )
					}
					if ( colon.token !== ':' )
					{
						throw new Error( `At position [${ colon.at }]: Expected ':', found '${ colon.token }' instead.`, colon )
					}
					value[ key.token ] = ObjectBuilder.build_object( Tokens );
				}
				Tokens.shift();
				ObjectBuilder.consume_comma( Tokens );
				return value;
			}
			else
			{
				let value = Tokens[ 0 ].token;
				if ( Tokens[ 0 ].type === 'literal' )
				{
					if ( value.toLowerCase() === 'null' )
					{
						value = null;
					}
					else if ( value.toLowerCase() === 'true' )
					{
						value = true;
					}
					else if ( value.toLowerCase() === 'false' )
					{
						value = false;
					}
					if ( !isNaN( parseFloat( value ) ) && isFinite( value ) )
					{
						value = parseFloat( value );
					}
				}
				Tokens.shift();
				ObjectBuilder.consume_comma( Tokens );
				return value;
			}
		}
	}


}

module.exports = ObjectBuilder;
