#!/bin/bash
. .build-env
echo "02-docs-deploy-docker : AWS_ACCOUNT=$AWS_ACCOUNT"
docker login -u AWS -p $(aws ecr get-login-password --profile admin) $AWS_ACCOUNT
docker push $AWS_ACCOUNT/lib-json.liquicode.com
