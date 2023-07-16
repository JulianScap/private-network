#!/bin/sh

DOMAIN=pn.co.nz
USER_NAME=bob

export FE_HOST=0.0.0.0
export FE_PORT=5174

# Dangerzone, will be exposed in the bundle
export VITE_BACK_END=http://$USER_NAME.be.$DOMAIN:51056

nvm use && yarn --cwd ../front-end/ dev
