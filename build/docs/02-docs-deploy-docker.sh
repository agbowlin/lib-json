#!/bin/bash
docker login -u AWS -p $(aws ecr get-login-password --profile admin) 803447307749.dkr.ecr.us-east-1.amazonaws.com
docker push 803447307749.dkr.ecr.us-east-1.amazonaws.com/lib-json.liquicode.com
