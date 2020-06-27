<!-- api/FindName.md -->

### FindName

```js
function FindName ( Root, Name )
```

### Description

Finds a field name within a JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Root		| object   	| n/a     	| The root Javascript object to begin searching in. |
| Name		| string 	| n/a     	| The name of the field to search for within Root. |


### Return Value

Returns the path of the located field.


### Implementation

This is a trivial implementation using the `Traverse` function.

```js
function FindName ( Root, Name )
{
	return lib_json.Traverse( Root, info => { if ( info.name === Name ) { return info.path; } } );
}
```
