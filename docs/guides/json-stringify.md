<!-- guides/json-stringify.md -->

# lib-json: Stringify

`lib-json.Stringify()` emulates Javasciprt's `JSON.stringify()` function which generates a text string representation of a Javascript object.

`lib-json.Stringify()` differs from `JSON.stringify()` in that it provides more control over the syntax and format of the generated tet string.


---------------------------------------------------------------------


### Functions


There is one main `Stringify` function:

- [Stringify( Node, StringifyOptions )](api/Stringify.md) : Takes a Javascript object and returns it's JSON text representation.
- [stringify( Node, StringifyOptions )](api/Stringify.md) : Added for parity with the JSON API.


---------------------------------------------------------------------


### Examples


***Stringify with default options is the same as JSON.stringify***

```js
const LibJson = require( '@liquicode/lib-json' );

// Our shopping list.
let list = [
	{ name: 'Milk', count: 1 },
	{ name: 'Eggs', count: 12 },
	{ name: 'Cheese', count: 3 },
];

// Stringfy our shopping list items.
let shopping_json = LibJson.Stringify( list );

// Print out the shopping list items to the console.
console.log( shopping_json )
```
Console:
```
[{"name":"Milk","count":1},{"name":"Eggs","count":12},{"name":"Cheese","count":3}]
```


***Add some Stringify options to increase readability***

```js
// ... continued from previous example

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


***Increase readability even more***

```js
// ... continued from previous example

// Stringfy our shopping list items.
options = LibJson.StringifyOptionsVeryPretty();
options.identifier_quote = '';
// VeryPretty Options produces Javascript-like syntax.
shopping_json = LibJson.Stringify( list, options );

// Print out the shopping list items to the console.
console.log( shopping_json )
```
Console:
```
[ 
    { 
        name:  "Milk", 
        count: 1, 
    }, 
    { 
        name:  "Eggs", 
        count: 12, 
    }, 
    { 
        name:  "Cheese", 
        count: 3, 
    }, 
]
```
