
# Procedures


## Publish a New Release

- Run the build script: `bash build/build.sh`.
- Make a new release in GitHub. This updates the bower registry.
	- [https://github.com/agbowlin/hiernodejs/releases](https://github.com/agbowlin/hiernodejs/releases).
- Publish to Npm: `npm publish`.
- Update `hiernode.js`, `bower.json`, and `package.json` with the next version number.
	All subsequent code changes will be done under the new version number.
	During next publish, this version number will be used in the new release.


# Commands

## Git

Add all changes

	git add .

Commit your changes

	git commit -m "changes"

Tag the commit

	git tag -a v0.0.2 -m "New release v0.0.2"

Push to GitHub.
Make sure the version is updated in bower.json and package.json

	git push origin master --tags

## Npm

Publish the module to Npm.
Make sure the version is updated in package.json

	npm publish


## Build

Produces `hiernode.min.js`. May also report warnings and errors.
To build, run the folowing command in the project's top directory (where hiernode.js is located).

	bash build/build.sh


# Notes

- [Ascii Art](http://patorjk.com/software/taag/#p=display&c=c%2B%2B&f=Dr%20Pepper)

