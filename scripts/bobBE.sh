#!/bin/sh

DOMAIN=pn.co.nz
USER_NAME=bob

# Back end
export FRONT_END_URI=http://$USER_NAME.$DOMAIN
export BACK_END_URI=http://$USER_NAME.be.$DOMAIN
export DATABASE_NAME=$USER_NAME-db
export DATABASE_URI=http://localhost:8080
export BE_PORT=51056
export BE_HOST=0.0.0.0
export PRIVATE_KEY_PATH=.keys/$USER_NAME/private-key.pem
export PUBLIC_KEY_PATH=.keys/$USER_NAME/public-key.pem

nvm use && yarn --cwd ../back-end/ dev
