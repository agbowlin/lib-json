<!-- api/FromIniText.md -->

### FromIniText

```js
function FromIniText ( IniText )
```

### Description

Constructs a JavaScript object from INI formatted text.

NOTE: This function has the following side effects:
- ignores all lines before the first section is found
- ignores all entry lines which do not contain an '=' character
- All entry values are stored as strings and no conversion is attempted


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| IniText	| string 	| n/a     	| The INI text to construct an object from. |


### Return Value

The constructed JavaScript object.
