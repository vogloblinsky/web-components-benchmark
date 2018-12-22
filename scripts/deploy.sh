#!/bin/bash
echo "Starting deployment"
echo "Target: gh-pages branch"

TEMP_DIRECTORY="/tmp/__temp_static_content"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}

echo "Compiling new static content"
mkdir $TEMP_DIRECTORY || exit 1
cp docs/index.html $TEMP_DIRECTORY || exit 1
cp common/devtools.png $TEMP_DIRECTORY || exit 1
cp -R demos $TEMP_DIRECTORY || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

echo "Removing old static content"
git rm -rf . || exit 1

echo "Static content TEMP_DIRECTORY"
ls -al $TEMP_DIRECTORY || exit 1

echo "Copying newly generated static content"
cp -r $TEMP_DIRECTORY/* . || exit 1
rm -rf todomvc || exit 1
rm -rf pascal-triangle || exit 1
rm -rf results || exit 1
rm -rf node_modules || exit 1

echo "Static content"
ls -al . || exit 1

echo "Pushing new content to $ORIGIN_URL"
git config user.name "Travis-CI" || exit 1
git config user.email "vincent.ogloblinsky@gmail.com" || exit 1

git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages > /dev/null 2>&1

echo "Cleaning up temp files"
rm -Rf $TEMP_DIRECTORY

echo "Deployed successfully."
exit 0
