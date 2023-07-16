#!/bin/sh

INITIAL_DIR=$(pwd)

export DOMAIN=pn.co.nz
export USER_NAME=alice

export USER_NAME=alice
export FRONT_END_URI=http://$USER_NAME.$DOMAIN
export VITE_BACK_END=http://$USER_NAME.be.$DOMAIN

export FE_PORT=5173

cd ../back-end

yarn dev

cd $INITIAL_DIR
