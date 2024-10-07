#!/bin/bash

# Navigate to the client directory and start the Vue.js client
cd client
echo "Starting the client Vue.js app..."
osascript -e 'tell app "Terminal"
    do script "npm run dev"
end tell'

# Navigate to the admin directory and start the Vue.js admin app
cd ../admin
echo "Starting the admin Vue.js app..."
osascript -e 'tell app "Terminal"
    do script "npm run dev"
end tell'

# Navigate back to the root directory and start the Node.js server
cd ..
echo "Starting the Node.js server..."
osascript -e 'tell app "Terminal"
    do script "npm run dev"
end tell'

# Pause the script
read -p "Press [Enter] to continue..."
