#!/bin/bash

rm -f AtlassianImport.sql
egrep "\"[0-9][0-9]+\"\ :" islands.json | cut -d"\"" -f2 | xargs -L1 ./island.sh $1 >>AtlassianImport.sql
