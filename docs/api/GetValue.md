<!-- api/GetValue.md -->

### GetValue

```js
function GetValue ( Root, Path )
```

### Description

Get the value at a specific `Path` within a JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Root		| object   	| n/a     	| The root Javascript object to begin searching in. |
| Path		| string 	| n/a     	| The path of the field within Root. |


### Return Value

Returns the value that was found at `Path`.


### Implementation

This is a trivial implementation using the `Traverse` function.
It is included and exported from `lib-json` as a matter of convenience.

```js
function GetValue ( Root, Name )
{
	return lib_json.Traverse( Root, info => { if ( info.path === Path ) { return info.value; } } );
}
```
