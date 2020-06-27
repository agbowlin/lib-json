<!-- api/Tokenize.md -->

### Tokenize

```js
function Tokenize ( Json )
```

### Description

Parses a Json string and returns an array of `Token` objects.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Json		| string 	| n/a     	| The Json string to tokenize. |


### Return Value

Returns an array `Token` objects.


### The Token Object

| Field		 	| Type    	| Description                                     	|
|-----------	|:-------:	|-------------------------------------------------	|
| token    		| string  	| The token (text) parsed from the source string.      	|
| type      	| string  	| The type of token. Can be: `delimiter`, `string`, or `literal`.  	|
| at     		| integer  	| The index within the source string that this token starts at. 	|

#### Token Types

- `delimiter`: The token is a delimiter.
	The token will be one of the following characters: `[`, `]`, `{`, `}`, `:`, or `,`.
- `string`: A single `'` or double `"` quoted string.
	The token will be the entire string.
- `literal`: Any other type of text found in the source string.
	The token will be a field name or a primitive value (numeric or boolean).
