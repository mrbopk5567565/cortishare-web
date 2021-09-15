npm install
npm run build-prod
mv ./build/index.html ./
pm2 delete CortishareFrontEnd-Production
pm2 start server-production.js --name CortishareFrontEnd-Production