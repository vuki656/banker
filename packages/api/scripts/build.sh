#!/bin/sh

# Remove old dist if exists
echo "Removing old dist"
rm -rf dist

# Compile JS
echo "Compiling JS"
npx tsc --build tsconfig.production.json

# Copy all files to the dist folder
echo "Copying GraphQL files"
find src -name "*.gql" -exec cp --parents {} dist/ \;
