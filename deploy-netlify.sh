#!/usr/bin/env bash
set -o errexit
set -o nounset

npm run build

aws s3 cp dist s3://demo-calculated-control/ --recursive --acl public-read
