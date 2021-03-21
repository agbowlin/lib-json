<!-- guides/json-tablify.md -->

# lib-json: Tablify


Outputs Javascript objects into a tabular format.


---------------------------------------------------------------------


### Functions


There is one main `Tablify` function:

- [Tablify( Node, TablifyOptions )](api/Tablify.md): Takes a Javascript object and outputs the object in a tabular format.


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
let shopping_json = LibJson.Tablify( list );

// Print out the shopping list items to the console.
console.log( shopping_json )
```
Console:
```
name   | count
-------+------
Milk   | 1    
Eggs   | 12   
Cheese | 3    
```

