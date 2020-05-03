"use strict"


module.exports =
{

	plugins:
		[
			'plugins/markdown',
		],
	sourceType: "module",
	source:
	{
		include:
			[
				'./package.json',
				'./readme.md',
				'./lib-json.js',
				'./src/',
			],
		// includePattern: ".+\\.js(doc|x)?$",
		// excludePattern: "(^|\\/|\\\\)_",
		// readme: "./readme.md",
		// package: "./package.json",
	},
	tags:
	{
		AllowUnknownTags: false,
	},
	opts:
	{
		// template: "templates/default",
		template: "node_modules/docdash/",
		encoding: "utf8",
		destination: "./docs/",
		// recurse: true,
		// tutorials: "path/to/tutorials",
		verbose: true,
	},

};