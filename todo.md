# lib-json: TODO


### General

- ***COMPLETED*** Export top level functions in PascalCase.
- Combine with hiernodejs to provide node navigation?
- Convert to/from [BSON](https://bsonspec.org/)
- Convert to/from [YAML](https://yaml.org/)
- Convert to/from [HJSON](https://hjson.github.io/)
- Handle comments in json.
	- Like HJSON but maintain the comments.
- Make lib-json-cli.js
	- Command line utility to perform conversions


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
- Option to stop parsing when indent count reaches 0 to Allow parsing of embedded json.


### Transform

- calculate_transform: Handle order in arrays
- apply_transform: Implement

