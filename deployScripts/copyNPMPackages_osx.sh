#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
    rsync -r ./appMetaFetcher/node_modules ../QlikSenseQMCUtility/plugins/appMetaFetcher
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo "Linux not supported."
fi
