#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
    rsync -r ./appMetaFetcher ../QlikSenseQMCUtility/plugins/ --exclude */node_modules/
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo "Linux not supported."
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    xcopy appMetaFetcher ..\QlikSenseQMCUtility\plugins\appMetaFetcher /I /Y /R /S /EXCLUDE:exclusionList.txt
fi