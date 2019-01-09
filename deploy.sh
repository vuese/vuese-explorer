#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git config user.name 'HcySunYang'
git config user.email 'HcySunYang@outlook.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com:HcySunYang/vuese-explorer.git master:gh-pages

cd -