#!/bin/bash

concurrently "vite front-end --host" "node back-end/index.cjs"
