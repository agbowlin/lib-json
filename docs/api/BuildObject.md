<!-- api/BuildObject.md -->

### BuildObject

```js
function BuildObject ( Tokens )
```

### Description

Constructs a JavaScript object from an array of `Token` objects.

For an understanding of `Token` objects, see the `Tokenize` function.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Tokens	| array 	| n/a     	| Array of Token objects. |


### Return Value

The construicted JavaScript object.

This function will throw errors if an invalid syntax (sequence of tokens) is encountered.
