"use strict";
/**
 * @module lib-json
 */


//---------------------------------------------------------------------
exports.parse = parse;
exports.tokenize = tokenize;
exports.build_object = build_object;


//---------------------------------------------------------------------
/**
 * Parses a Json string and returns a Javascript object.
 * Unlike Javascript's parse function, this function does not require
 * quoted identifiers.
 */
function parse ( Json )
{
	let tokens = tokenize( Json );
	return build_object( tokens );
};


//---------------------------------------------------------------------
function tokenize ( Json )
{
	let tokens = [];

	// Json = Json.replace( '\t', ' ' );
	// Json = Json.replace( '\n', ' ' );
	// while ( Json.includes( '  ' ) ) { Json = Json.replace( '  ', ' ' ); }

	let whitespace = ' \t\n';
	let delimiters = '[]{}:,';
	let quotes = `'"`;

	let ichar = 0;
	while ( ichar < Json.length )
	{
		let ch = Json.charAt( ichar );
		if ( whitespace.includes( ch ) )
		{
			ichar++;
		}
		else if ( delimiters.includes( ch ) )
		{
			tokens.push( {
				token: ch,
				type: 'delimiter',
				at: ichar,
			} );
			ichar++;
		}
		else if ( quotes.includes( ch ) )
		{
			let iat = ichar;
			ichar++;
			let s = '';
			while ( ichar < Json.length )
			{
				let ch2 = Json.charAt( ichar );
				if ( ch2 === ch )
				{
					ichar++;
					break;
				}
				if ( ch2 === '\\' )
				{
					ichar++;
					if ( ichar < Json.length )
					{
						ch2 = Json.charAt( ichar );
					}
					else
					{
						ch2 = '';
					}
				}
				s += ch2;
				ichar++;
			}
			tokens.push( {
				token: s,
				type: 'string',
				at: iat,
			} );
		}
		else
		{
			let iat = ichar;
			ichar++;
			let s = ch;
			while ( ichar < Json.length )
			{
				let ch2 = Json.charAt( ichar );
				if (
					whitespace.includes( ch2 )
					|| delimiters.includes( ch2 )
					|| quotes.includes( ch2 )
				)
				{
					break;
				}
				s += ch2;
				ichar++;
			}
			tokens.push( {
				token: s,
				type: 'literal',
				at: iat,
			} );
		}
	}

	return tokens;
}


//---------------------------------------------------------------------
function build_object ( Tokens )
{
	while ( Tokens.length )
	{
		if ( Tokens[ 0 ].token === '[' )
		{
			Tokens.shift();
			let value = [];
			while ( Tokens[ 0 ].token !== ']' )
			{
				value.push( build_object( Tokens ) );
			}
			Tokens.shift();
			consume_comma( Tokens );
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
				value[ key.token ] = build_object( Tokens );
			}
			Tokens.shift();
			consume_comma( Tokens );
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
			consume_comma( Tokens );
			return value;
		}
	}
}


//---------------------------------------------------------------------
function consume_comma ( Tokens )
{
	if ( !Tokens.length ) { return; }
	if ( Tokens[ 0 ].token === ',' ) 
	{
		Tokens.shift();
	}
	return;
}

