@echo off

REM Navigate to the client directory and start the Vue.js client
cd client
echo Starting the client Vue.js app...
start cmd /k "npm run dev"

REM Navigate to the admin directory and start the Vue.js admin app
cd ../admin
echo Starting the admin Vue.js app...
start cmd /k "npm run dev"

REM Navigate back to the root directory and start the Node.js server
cd ..
echo Starting the Node.js server...
start cmd /k "npm run dev"

REM Pause to keep the terminal open
pause
