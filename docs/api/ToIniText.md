<!-- api/ToIniText.md -->

### ToIniText

```js
function ToIniText ( Data )
```

### Description

Converts a JavaScript object to a string, in INI file format.

NOTE: This function has the following side effects:
- ignores all sections that are not of type object
- ignores all entry values that are not of a primitive type


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Data		| object 	| n/a     	| The JavaScript object to convert to INI format. |


### Return Value

An INI fomatted string.

