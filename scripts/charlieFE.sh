#!/bin/sh

DOMAIN=pn.co.nz
USER_NAME=charlie

export FE_HOST=0.0.0.0
export FE_PORT=5175

# Dangerzone, will be exposed in the bundle
export VITE_BACK_END=http://$USER_NAME.be.$DOMAIN:51057

nvm use && yarn --cwd ../front-end/ dev
