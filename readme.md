
# json_lib


## TODO

### General

- Export top level functions in PascalCase.
- Handle comments in json.
- Combine with hiernodejs to provide node navigation?
- Convert to/from BSON
- Convert to/from YAML


### Stringify

- Processing time for `stringify` is VERY slow
- `stringify`: Implement hierarchy lines
- `stringify`: Implement Options:
	- `always_quote_identifiers`: Force quoting of field (identifier) names.
	- `extroverted_arrays`: Array brackets on own line. (?)
	- `extroverted_brackets`: Brackets on own line.
	- `extroverted_braces`: Braces on own line.
- Implement another set of options beyond very pretty: `STRINGIFY_OPTIONS_EXPRESSIVE`
- generate_model: Implement (from json2model.js)


### Parse

- Processing time for `parse` is slow
- Option to stop parsing when indent count reaches 0.


## Transform

- calculate_transform: Handle order in arrays
- apply_transform: Implement

