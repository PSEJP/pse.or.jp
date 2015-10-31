#!/bin/bash
cd dist
find . -type f -name .gitignore -exec rm {} \;
git init
git commit -m "Deploy to GitHub Pages $(date +"%Y-%m-%d %T")"
git push --force git@github.com:PSEJP/pse.or.jp.git master:gh-pages
