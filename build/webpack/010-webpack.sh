#!/bin/bash
. build/__secrets/build-env
npx webpack-cli --config build/__secrets/webpack.config.js
