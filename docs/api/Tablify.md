<!-- api/Tablify.md -->

### Tablify

```js
function Tablify( Node, TablifyOptions )
```

### Description

Converts a JavaScript object to a tabular text format.


### Parameters

| Parameter			| Type     	| Default 	| Description	|
|-----------		|:--------:	|:-------:	|-------------	|
| Node				| object 	| n/a     	| The object to Tablify. |
| TablifyOptions	| object 	| n/a     	| A TablifyOptions object containing format settings. |


### Return Value

A string containing the tablified representation.


### The TablifyOptions Object

The `TablifyOptions` parameter is an object containing fields used to format the output string.

| Field					| Type    	| Default		| Description		|
|-----------			|:-------:	|---------		|------------		|
| literal_quote			| string  	| `'`			| The character used as a quotation mark for literal strings. |
| eol_char 				| string  	| `\n`			| The character used as an EOL character. |
| tab_char 				| string  	| `    `		| The character used as a TAB character. |
| max_tablify_depth		| integer  	| `2`			| The maximum depth at which to construct the table. |
