#!/bin/bash
. build/__secrets/build-env
npx webpack-cli --config lib-json.webpack.config.js
