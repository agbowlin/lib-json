<!-- guides/about.md -->

## Overview

`lib-json` is a JavaScript library for working with JavaScript objects.
Primarily this library supports the serialization and deserialization of
JavaScript objects to and from various text formats.

This library contains additional functions to search within and modify JavaScript objects.


---

## Installation

```bash
npm install @liquicode/lib-json
```

---

## TODO

### General

- (COMPLETED) Export top level functions in PascalCase.
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
- Option to stop parsing when indent count reaches 0. Allows parsing of embedded json.


### Transform

- calculate_transform: Handle order in arrays
- apply_transform: Implement

