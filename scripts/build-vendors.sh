#!/usr/bin/env bash
readonly PUBLIC=public
readonly VENDORS="${PUBLIC}/vendors.pug"
readonly FILES=(
  node_modules/aframe/dist/aframe-v*.min.js*
  node_modules/dat.gui/build/dat.gui.min.js
  # node_modules/aframe-animation-timeline-component/dist/aframe-animation-timeline-component.min.js
  # node_modules/aframe-extras/src/loaders/animation-mixer.js
  # node_modules/aframe-sprite-component/dist/aframe-sprite-component.js
  # node_modules/aframe-animation-timeline-component/dist/aframe-animation-timeline-component.js
  # dist/aframe-warpspeed-texture.1.0.1.umd.js
)

> $VENDORS

for f in ${FILES[@]}; do
  if [[ "$f" == "node_modules"* ]]; then
    cp $f $PUBLIC
  fi
  if [[ "$f" != *"map" ]]; then
    printf "script(src=\"$(basename $f)\")\n" >> $VENDORS
  fi
done
