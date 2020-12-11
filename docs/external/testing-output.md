# Testing Output


```


  Json IniText
    ✓ should handle simple cases
    ✓ should ignore invalid sections and entries

  Json Parse
    Equivalence with Javascript's JSON.parse()
      ✓ should parse empty object "{}"
      ✓ should parse empty array "[]"
      ✓ should parse "true"
      ✓ should parse "3.14"

  Json Stringify
    Stringify Primitives
      ✓ should stringify null [null]
      ✓ should stringify empty string [""]
      ✓ should stringify empty array [[]]
      ✓ should stringify empty object [{}]
      ✓ should stringify [true]
      ✓ should stringify [3.14]
      ✓ should stringify ["Hello World!"]
    Equivalence with Javascript's JSON.stringify()
      ✓ should stringify null [null] the same way
      ✓ should stringify empty string [""] the same way
      ✓ should stringify empty array [[]] the same way
      ✓ should stringify empty object [{}] the same way
      ✓ should stringify [true] the same way
      ✓ should stringify [3.14] the same way
      ✓ should stringify ["Hello World!"] the same way
      ✓ should stringify test_1.json the same way

  Json Tablify
    Tablify Tests
      ✓ should tablify test data

  Json Transform
    Calculate Transforms
      ✓ should return an empty transform for equal text values
      ✓ should return a single value mismatch for non-equal text values
      ✓ should return an empty transform for equal numeric values
      ✓ should return a single value mismatch for non-equal numeric values
      ✓ should return a single type mismatch for non-equal value type
      ✓ should detect differences within an array
      ✓ should detect differences within an object

  Json Traverse
    traverse
      ✓ should return [1], the value of 'one'
      ✓ should return [2], the value of 'two'
      ✓ should return [true], the value of 'done'
    find_name & find_value
      ✓ should return '$.one', the path of 'one'
      ✓ should return '$.two', the path of 'two'
      ✓ should return '$.five.six.seven', the path of 'seven'
      ✓ should have the same path for name 'one' and value [1]
      ✓ should have the same path for name 'two' and value [2]
      ✓ should have the same path for name 'seven' and value [7]
    get_value & set_value
      ✓ should set a value and then get the new value
      ✓ should have path '$.five.six.seven'
      ✓ should not have path '$.foo'


  41 passing (11ms)


```


