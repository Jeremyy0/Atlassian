#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install discord.io winston mysql -save

until `/usr/bin/node ~/AtlassianBot/bot.js`; do
    echo "Atlassian Bot crashed with exit code $?.  Respawning.." >/dev/null 2>&1
    sleep 1
done
