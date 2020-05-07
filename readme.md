
# json_lib


## TODO

### General

- Export top level functions in PascalCase.
- Rewrite classes as simple functions to maintain compatibility with earlier platforms.
- Handle comments in json.
- Combine with hiernodejs to provide node navigation?
- Convert to/from BSON
- Convert to/from YAML


### Stringify

- Processing time for `stringify` is VERY slow
- [BUG:2020-05-01] `stringify` has some newline issues when dealing with nested objects and arrays.
- `stringify`: Implement hierarchy lines
- `stringify`: Implement Options:
	- `always_quote_identifiers`: Force quoting of field (identifier) names.
	- `extroverted_arrays`: Array brackets on own line.
	- `extroverted_brackets`: Brackets on own line.
	- `extroverted_braces`: Braces on own line.
- Implement another set of options beyond very pretty: `STRINGIFY_OPTIONS_EXPRESSIVE`
- generate_model: Implement (from json2model.js)
- generate_table: Display json in a tabluar format:
```
	report_name :
	timestamp   :

	field_1     | field_2
	------------+----------------
	foo         | bar
	willy wonka | rumplestiltskin
```


### Parse

- Processing time for `parse` is slow
- calculate_transform: Handle order in arrays
- apply_transform: Implement
- Option to stop parsing when indent count reaches 0.

