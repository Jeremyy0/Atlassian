#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"
~/nodejs/bin/npm install discord.js winston mysql -save
~/nodejs/bin/npm install https://github.com/woor/discord.io/tarball/gateway_v6

until `~/nodejs/bin/node ~/AtlassianBot/bot.js`; do
    echo "Atlassian Bot crashed with exit code $?.  Respawning.." >/dev/null 2>&1
    sleep 1
done
