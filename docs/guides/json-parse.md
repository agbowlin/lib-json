<!-- guides/json-parse.md -->

# lib-json: Parsing

`lib-json.Parse()` emulates Javasciprt's `JSON.parse()` function which loads a Javascript object from a text string.

`lib-json.Parse()` differs from `JSON.parse()` in that it provides a more relaxed parsing of JSON strings. This is more in line with Javascipt's object syntax (as opposed to JSON's syntax).

Consider the following JSON string:

```js
{ name: 'Books', count: 4, }
```

Javascript's more strict JSON parsing will have three problems with the above string:
- You are required to use double quotes around the field names `name` and `count`.
- The string literal `'Books'` must use double quotes instead of single quotes: `"Books"`.
- There is a trailing comma after the `count` field, which is not allowed.

In order for `JSON.parse()` to read the JSON string, you would have to change it to look like this:

```json
{ "name": "Books", "count": 4 }
```

The `lib-json.Parse()` function will work equally well with either string.


---------------------------------------------------------------------


### Functions


There is one main parsing function:

- [Parse( Json )](api/Parse.md) : Takes a JSON string and returns javascript objects.
- [parse( Json )](api/Parse.md) : Added for parity with the JSON API.

These functions are used internally by `Parse` and are available for you to use for whatever reason:

- [Tokenize( Json )](api/Tokenize.md) : Tokenizes a JSON string into an array of tokens.
- [BuildObject( Tokens )](api/BuildObject.md) : Takes an array of tokens and returns a javascript object.


---------------------------------------------------------------------


### Examples


***Reading JSON from a String***

```js
const LibJson = require( '@liquicode/lib-json' );

// Our simple shopping list.
let shopping_json = "{ name: 'Milk', count: 1 }, { name: 'Eggs', count: 12 }, "

// Parse the json string into an array of shopping list items.
let list = LibJson.Parse( shopping_json );

// Print out the shopping list items to the console.
list.forEach( item ==> console.log( item.name ) );
```


***Read some JSON from a file***

```js
const LibJson = require( '@liquicode/lib-json' );
const LibFs = require( 'fs' ); // Node's File System Library

// Read the file content.
let shopping_json = LibFs.readFileSync( '~/my-files/shopping-list.json' );

// Parse the json string into an array of shopping list items.
let list = LibJson.Parse( shopping_json );

// Print out the shopping list items to the console.
list.forEach( item ==> console.log( item.name ) );
```


***Implementing the Parse function with Tokenize and BuildObject***

```js
function MyParse ( Json )
{
	// Parse the json string into an array of tokens.
    let tokens = LibJson.Tokenize( Json );

	// Force all strings to be lower cased.
	tokens.forEach(
		token ==>
		{
			if( token.type === 'string' )
			{
				token.text = token.text.toLowerCase();
			}
		}
	)

	// Use the tokens to build a Javascript object.
    let obj = LibJson.BuildObject( tokens );
	
	// Return the object.
	return obj;
}
```
