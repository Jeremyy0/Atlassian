#!/bin/bash

#Get islands.json
wget https://antihax.github.io/json/islands.json

GRID=`./bashjson.sh islands.json $1 grid`
RESOURCES=`./bashjson.sh islands.json $1 resources | sed 's/[\{\[\ ]u//g' | sed 's/[]}]//g' | sed 's/: [0-9]//g' | sed "s/'//g"`
ANIMALS=`./bashjson.sh islands.json $1 animals | sed 's/[\{\[\ ]u//g' | sed 's/[]}]//g' | sed "s/'//g"`

#echo "$GRID | $1 | $RESOURCES | $ANIMALS"
#echo ""
IFS=,
if [ "$ANIMALS" != "[" ]; then
  INSERT=""
  printf "%s" "INSERT INTO locations (tile, island, resource) VALUES "
  for i in $RESOURCES
  do
    if [[ ! ${i} =~ Treasure\ Spawns ]] && [[ ! "${i}" =~ Maps ]]; then
      li=`echo $i | sed 's/Wild\ //g' | sed 's/\ //g' | sed 's/[0-9]*//g'`
      INSERT="${INSERT}(\"$GRID\", $1, \"${li,,}\"),"
    fi
  done
  printf "%s" "$INSERT" | sed "s/,$/;/"

  INSERT=""
  echo ""
  printf "%s" "INSERT INTO animals (tile, island, animal) VALUES "
  for i in $ANIMALS
  do
    INSERT="${INSERT}(\"$GRID\", $1, \"${i,,}\"),"
  done
  printf "%s" "$INSERT" | sed "s/,$/;/"
  echo ""
fi
