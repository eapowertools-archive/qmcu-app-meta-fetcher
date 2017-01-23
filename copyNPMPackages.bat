#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
    rsync -r ./appMetaFetcher/node_modules ../QlikSenseQMCUtility/plugins/appMetaFetcher
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo "Linux not supported."
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    xcopy appMetaFetcher\node_modules ..\QlikSenseQMCUtility\plugins\appMetaFetcher\node_modules /I /Y /R /S
fi
