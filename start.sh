#!/bin/sh

if [ $NODE_ENV == "dev" ]; then
  exec npm run start:watch
else
  exec npm run start:watch
fi
