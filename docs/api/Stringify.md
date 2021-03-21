<!-- api/Stringify.md -->

### Stringify

```js
function Stringify( Node, StringifyOptions )
function stringify( Node, StringifyOptions )
```

### Description


### Parameters

| Parameter			| Type     	| Default 	| Description	|
|-----------		|:--------:	|:-------:	|-------------	|
| Node				| object 	| n/a     	| The JavaScript object to convert to text. |
| StringifyOptions	| object 	| null    	| A StringifyOptions object to control the format of the output text. |


### Return Value

A Json string representation of the given JavaScript object.


### The StringifyOptions Object

The `StringifyOptions` parameter is an object containing fields used to format the output Json string.

| Field					 	| Type    	| Default		| Description                                     	|
|-----------				|:-------:	|---------		|-------------------------------------------------	|
| identifier_quote    		| string  	| `"`			| The character used as a quotation mark for identifiers. |
| literal_quote				| string  	| `'`			| The character used as a quotation mark for literal strings. |
| eol_char 					| string  	| `(empty)`		| The character used as an EOL character. |
| tab_char 					| string  	| `(empty)`		| The character used as a TAB character. |
| space_char				| string  	| `(empty)`		| The character used as a space character. |
| always_quote_identifiers	| boolean  	| `false`		| If `true`, always quotes identifiers even if they don't need it. Not implemented? |
| liberal_commas			| boolean  	| `false`		| If `true`, puts commas at the end of a list of array elements and at the end of a list field names. |
| align_values				| boolean  	| `false`		| If `true`, left aligns the output of field values. |
| extroverted_arrays		| boolean  	| `false`		| Not yet implemented. |
| extroverted_brackets		| boolean  	| `false`		| Not yet implemented. |
| extroverted_braces		| boolean  	| `false`		| Not yet implemented. |


### Predefined StringifyOptions Objects

Predefined `StringifyOptions` objects are available via constructor functions.

#### Minimal StringifyOptions

This set of options produces a minimal Json representation akin to JavaScript's default stringify. (i.e. single line, minimal spacing)

```js
function StringifyOptionsMinimal()
{
	return {
		identifier_quote: `"`,
		always_quote_identifiers: true,
		literal_quote: `"`,
	};
};
```

#### Standard StringifyOptions

This set of options produces a standard Json representation akin to Javascript's stringify called with spacing options. (i.e. multi line, spacing for layout)

```js
function StringifyOptionsStandard()
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
```

#### VeryPretty StringifyOptions

This set of options produces a Json representation akin to Javascript code. (i.e. multi line, spacing for layout)

```js
function StringifyOptionsVeryPretty()
{
	return {
		identifier_quote: `'`,
		literal_quote: `"`,
		eol_char: '\n',
		tab_char: '    ',
		space_char: ' ',
		always_quote_identifiers: false, // Not implemented
		liberal_commas: true,
		align_values: true,
		//TODO: The following options have not been implemented:
		extroverted_arrays: true,
		extroverted_brackets: true,
		extroverted_braces: true,
	};
};
```
