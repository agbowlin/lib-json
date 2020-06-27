<!-- api/Parse.md -->

### Parse

```js
function Parse ( Json )
```

### Description

Parses a Json string and returns a Javascript object.
Unlike Javascript's native parse function, this function does not require field names/identifiers to be quoted.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Json		| string 	| n/a     	| The Json string to parse. |


### Return Value

The JavaScript object constructed from the Json string.


### Implementation

This is a trivial implementation using the `Tokenize` and `BuildObject` functions.
It is included and exported from `lib-json` as a matter of convenience.

```js
function Parse ( Json )
{
	let tokens = Tokenize( Json );
	return BuildObject( tokens );
}
```
