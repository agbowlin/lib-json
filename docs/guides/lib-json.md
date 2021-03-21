<!-- guides/about.md -->

## Overview

`lib-json` is a JavaScript library for working with JavaScript objects.
Primarily this library supports the serialization and deserialization of
JavaScript objects to and from various text formats.

This library contains additional functions to search within and modify JavaScript objects.


---------------------------------------------------------------------


## Installation


This library can be installed via NPM:

```bash
npm install --save @liquicode/lib-json
```

---------------------------------------------------------------------


## Simple Usage


***Include the lib-json library in your source code***

```js
const LibJson = require( '@liquicode/lib-json' );
```


***Read some JSON from a file***

```js
const LibJson = require( '@liquicode/lib-json' );
const LibFs = require( 'fs' ); // Node's File System Library

// Read the file content.
let file_content = LibFs.readFileSync( '~/my-files/shopping-list.json' );

// Parse the file content into an array of shopping list items.
let list = LibJson.Parse( file_content );

// Print out the shopping list items to the console.
list.forEach( item ==> console.log( item.item_name ) );
```


***Output some JSON to the console***

```js
const LibJson = require( '@liquicode/lib-json' );

// Our shopping list.
let list = [
	{ name: 'Milk', count: 1 },
	{ name: 'Eggs', count: 12 },
	{ name: 'Cheese', count: 3 },
];

// Stringfy our shopping list items.
let options = LibJson.StringifyOptionsStandard();
// Standard Options is similar to JSON.stringify( node, null, '    ' );
shopping_json = LibJson.Stringify( list, options );

// Print out the shopping list items to the console.
console.log( shopping_json )
```
Console:
```
[ 
    { 
        "name": "Milk", 
        "count": 1
    }, 
    { 
        "name": "Eggs", 
        "count": 12
    }, 
    { 
        "name": "Cheese", 
        "count": 3
    }
]
```
