#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install discord.io winston mysql -save
npm install https://github.com/woor/discord.io/tarball/gateway_v6
npm install discord.js

until `/usr/bin/node ~/AtlassianBot/bot.js`; do
    echo "Atlassian Bot crashed with exit code $?.  Respawning.." >/dev/null 2>&1
    sleep 1
done
