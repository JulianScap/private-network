#!/bin/sh

DOMAIN=pn.co.nz
USER_NAME=alice

export FE_HOST=0.0.0.0
export FE_PORT=5173

# Dangerzone, will be exposed in the bundle
export VITE_BACK_END=http://$USER_NAME.be.$DOMAIN:51055

nvm use && yarn --cwd ../front-end/ dev
