<!-- api/FindValue.md -->

### FindValue

```js
function FindValue ( Root, Value )
```

### Description

Finds a field value within a JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Root		| object   	| n/a     	| The root Javascript object to begin searching in. |
| Value		| any	 	| n/a     	| The value to search for within Root. |


### Return Value

Returns the path of the located value.


### Implementation

This is a trivial implementation using the `Traverse` function.
It is included and exported from `lib-json` as a matter of convenience.

```js
function FindValue ( Root, Name )
{
	return lib_json.Traverse( Root, info => { if ( info.value === Value ) { return info.path; } } );
}
```
