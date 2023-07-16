#!/bin/sh
DOMAIN=pn.co.nz
USER_NAME=alice

# Back end
export FRONT_END_URI=http://$USER_NAME.$DOMAIN
export BACK_END_URI=http://$USER_NAME.be.$DOMAIN
export DATABASE_NAME=$USER_NAME-db
export DATABASE_URI=http://localhost:8080
export BE_PORT=51055
export BE_HOST=0.0.0.0

nvm use && yarn --cwd ../back-end/ dev


