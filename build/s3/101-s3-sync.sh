#!/bin/bash
. build/__secrets/build-env
echo "------------------------------------------"
echo "101-s3-sync.sh"
echo " - AWS_PROFILE = $AWS_PROFILE"
echo "------------------------------------------"

aws s3 sync docs s3://$AWS_BUCKET


# # = BUCKET POLICY =
# {
#     "Version": "2012-10-17",
#     "Statement": [
#         {
#             "Effect": "Allow",
#             "Principal": "*",
#             "Action": "s3:GetObject",
#             "Resource": "arn:aws:s3:::search.news-arc.com/*"
#         }
#     ]
# }

# # = CORS CONFIG =
# <?xml version="1.0" encoding="UTF-8"?>
# <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
# <CORSRule>
#     <AllowedOrigin>*</AllowedOrigin>
#     <AllowedMethod>GET</AllowedMethod>
# </CORSRule>
# </CORSConfiguration>

