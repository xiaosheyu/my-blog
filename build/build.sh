echo remove dist
rm -rf dist
echo install...
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
npm install
echo build...
npm run build
echo move files
rm -rf /opt/application/frontend/admin/*
mv -f dist/* /opt/application/frontend/admin