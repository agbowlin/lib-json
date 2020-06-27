<!-- api/Traverse.md -->

### Traverse

```js
function Traverse ( Root, Visitor )
```


### Description

Implements a depth-first visitor pattern and traverses a JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Root		| object   	| n/a     	| The root Javascript object to begin searching in. |
| Visitor	| function 	| n/a     	| The visitor function to call at each field. Visitor is passed a `VisitorInfo` object describing the field being visited. |


### Return Value

This function returns either `undefined` or the last value returned from a `Visitor` callback function.


### The Visitor Callback Function

```js
function Visitor( VisitorInfo )
```

At each field within the traversal process, The Visistor callback function is called.

If the `Visitor` function returns a value, then the traversal process is ended and the
return value is sent back as a return value from the initial call to `Traverse`.

For examples of using `Traverse` and the `Visitor` callback function, see the implementations of:

- [HasPath ( Root, Path )](api/HasPath.md "lib-json.HasPath()")
- [FindName ( Root, Name )](api/FindName.md "lib-json.FindName()")
- [FindValue ( Root, Value )](api/FindValue.md "lib-json.FindValue()")
- [GetValue ( Root, Path )](api/GetValue.md "lib-json.GetValue()")
- [SetValue ( Root, Path, Value )](api/SetValue.md "lib-json.SetValue()")



### The VisitorInfo Object

Each time the `Visitor` function is called, it is passed a `VisitorInfo` object describing the currently visited field.

| Field		 	| Type    	| Description                                     	|
|-----------	|:-------:	|-------------------------------------------------	|
| parent    	| object  	| The parent of the currently visited field.      	|
| name      	| string  	| The field name of the currently visited field.  	|
| value     	| string  	| The field value of the currently visited field. 	|
| path      	| string  	| The path of the currently visited field.        	|
| depth     	| integer 	| The depth of the currently visited field.       	|


