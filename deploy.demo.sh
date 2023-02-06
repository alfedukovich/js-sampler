#!/usr/bin/env sh

# abort on errors
set -e

# build
vite build -c vite.demo.config.js

# navigate into the build output directory
cd demo

# если вы деплоите на кастомный домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы деплоите на https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы деплоите на https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:alfedukovich/js-sampler.git master:gh-pages

cd -