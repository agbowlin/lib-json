#!/bin/bash
echo --- START OF BUILD ---

# cd ~/workspace

echo ==========================================
echo
echo === Documenting [json_lib.js]
echo === Clearing output [docs/]
rm -fdr docs
echo === Writing to [docs/]

	node_modules/.bin/jsdoc json_lib.js --configure build/jsdoc.json

echo ==========================================
echo
echo === Compiling [json_lib.js]
ls -l json_lib.js
echo === Clearing output [json_lib.min.js]
rm -f json_lib.min.js
echo === Compiling to [json_lib.min.js]
echo ...

	java -jar node_modules/google-closure-compiler/compiler.jar \
			--js json_lib.js					\
			--js src/*.js						\
			--js_output_file json_lib.min.js	\
			--externs "build/closure-compiler-externs.js"		\
			--compilation_level SIMPLE			\
			# --warning_level VERBOSE				\
			# --process_common_js_modules			\

echo ...
ls -l json_lib.min.js
echo
echo ==========================================

echo --- END OF BUILD ---
