#!/bin/bash
. .build-env
echo "------------------------------------------"
echo "01-docs-build-docker.sh"
echo " - REPO_URL    = $REPO_URL"
echo " - AWS_PROFILE = $AWS_PROFILE"
echo "------------------------------------------"

docker build -t lib-json.liquicode.com:latest . --file lib-json.liquicode.com.dockerfile
docker tag lib-json.liquicode.com:latest $REPO_URL/lib-json.liquicode.com
