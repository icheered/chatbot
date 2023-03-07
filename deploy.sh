#!/bin/bash
yarn install
yarn build
PORT=4006 pm2 start yarn --name "chatbot" -- start