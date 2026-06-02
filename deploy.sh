#!/usr/bin/env bash
# Deploy the TruServ site to Cloudflare Pages.
#   ./deploy.sh        -> production (https://truservplumbing.com)
#   ./deploy.sh dev    -> sandbox preview URL (live site untouched)
set -euo pipefail

BRANCH="${1:-main}"

rm -rf dist && mkdir dist
cp index.html privacy.html terms.html styles.css app.js dist/
cp -r assets dist/

npx -y wrangler pages deploy dist --project-name=truserv --branch="$BRANCH" --commit-dirty=true
