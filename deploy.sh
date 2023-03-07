#!/bin/bash
yarn install
yarn build
pm2 delete chatbot
PORT=4003 pm2 start yarn --name "chatbot" -- start