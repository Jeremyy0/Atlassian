#!/bin/bash

until `/usr/bin/node ~/AtlassianBot/bot.js`; do
    echo "Atlassian Bot crashed with exit code $?.  Respawning.." >/dev/null 2>&1
    sleep 1
done
