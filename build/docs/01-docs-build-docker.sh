#!/bin/bash
docker build -t lib-json.liquicode.com:latest . --file lib-json.liquicode.com.dockerfile
docker tag lib-json.liquicode.com:latest 803447307749.dkr.ecr.us-east-1.amazonaws.com/lib-json.liquicode.com
