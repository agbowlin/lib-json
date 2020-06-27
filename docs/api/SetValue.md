<!-- api/SetValue.md -->

### SetValue

```js
function SetValue ( Root, Path, Value )
```

### Description

Set the value of the field specified by `Path` within a JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Root		| object   	| n/a     	| The root Javascript object to begin searching in. |
| Path		| string 	| n/a     	| The path of the field within Root. |
| Value		| any	 	| n/a     	| The value to set. |


### Return Value

Returns the value that was set at `Path`.


### Implementation

This is a trivial implementation using the `Traverse` function.

```js
function SetValue ( Root, Name )
{
	return lib_json.Traverse( Root, info =>
	{
		if ( info.path === Path ) 
		{
			info.parent[ info.name ] = Value;
			return Value;
		}
	} );
}
```
