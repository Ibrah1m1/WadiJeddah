#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

rm -rf .git
git init
git checkout -b main
git add -A
git commit -m 'deploy'

# push to gh-pages branch
git push -f https://github.com/Ibrah1m1/WadiJeddah.git main:gh-pages

cd -
