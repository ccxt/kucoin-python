#!/bin/bash

# Get arguments
EXCHANGE_NAME=$1
API_TOKEN=$2
GITHUB_SHA=$3

# Clone and push to the repo
TEMP_DIR=$(mktemp -d)
TEMP_DIR_GIT="$TEMP_DIR/$EXCHANGE_NAME-python"
git clone https://x-access-token:$API_TOKEN@github.com/ccxt/$EXCHANGE_NAME-python.git $TEMP_DIR_GIT
# at first, clean th directory (except .git directory) and copy all files
rm -rf $TEMP_DIR_GIT/*
rm -rf $TEMP_DIR_GIT/.github/*
rsync -av --exclude='.git' ./ $TEMP_DIR_GIT
# remove all yml files except remote
dir $TEMP_DIR_GIT/.github/workflows/
rm -f $TEMP_DIR_GIT/.github/workflows/transfer-all.yml && rm -f $TEMP_DIR_GIT/.github/workflows/transfer-exchange.yml
cd $TEMP_DIR_GIT
git config user.name github-actions
git config user.email github-actions@github.com
git add .
rm -f README.md
echo $EXCHANGE_NAME > name
(git commit -m "[BUILD]: $GITHUB_SHA" && git push origin main --force) || echo "No changes to commit"