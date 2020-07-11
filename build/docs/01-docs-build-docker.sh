#!/bin/bash
. .build-env
echo "01-docs-build-docker : AWS_ACCOUNT=$AWS_ACCOUNT"
docker build -t lib-json.liquicode.com:latest . --file lib-json.liquicode.com.dockerfile
docker tag lib-json.liquicode.com:latest $AWS_ACCOUNT/lib-json.liquicode.com
