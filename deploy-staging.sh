npm install
npm run build-staging
mv ./build/index.html ./
pm2 delete CortishareFrontEnd-Staging
pm2 start server-staging.js --name CortishareFrontEnd-Staging