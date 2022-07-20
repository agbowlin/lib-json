<!-- guides/field-traversal.md -->

# lib-json: Field Traversal


`lib-json` has a number of functions that let you search for and modiy elements of a Javascript object.


---------------------------------------------------------------------


### Functions


There is one main `Traverse` function:

- [Traverse ( Root, Visitor )](api/Traverse.md) : Implements a depth-first visitor pattern to traverse a Javascript object.


These functions call `Traverse` internally and are provided to allow you to easily search and modify Javascript objects:

- [HasPath( Root, Path )](api/HasPath.md): 
- [FindName( Root, Name )](api/FindName.md): 
- [FindValue( Root, Value )](api/FindValue.md): 
- [GetValue( Root, Path )](api/GetValue.md): 
- [SetValue( Root, Path, Value )](api/SetValue.md): 


---------------------------------------------------------------------


### Examples


