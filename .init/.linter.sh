#!/bin/bash
cd /home/kavia/workspace/code-generation/myflix-streaming-platform-129621-129630/myflix_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

