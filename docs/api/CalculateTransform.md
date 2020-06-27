<!-- api/CalculateTransform.md -->

### CalculateTransform

```js
function CalculateTransform( Node1, Node2 )
```

### Description

Calculates the operations required to be performed on one JavaScript so that it will be equal to another JavaScript object.


### Parameters

| Parameter	| Type     	| Default 	| Description	|
|-----------|:--------:	|:-------:	|-------------	|
| Node1		| object 	| n/a     	| The source JavaScript object. |
| Node2		| object 	| n/a     	| The target JavaScript object. |


### Return Value

An array of `Transform` objects describing the changes required to get `Node1` to match `Node2`.


### The Transform Object

| Field		 	| Type    	| Description                                     	|
|-----------	|:-------:	|-------------------------------------------------	|
| path    		| string  	| The path of the field to operate on.	|
| type      	| string  	| The type of operation. Can be: `value missing`, `value extraneous`, `type mismatch`, or `value mismatch`.  	|
| value    		| any		| The value used in the operation.	|
| explanation	| string	| A human readable description of the operation.	|

