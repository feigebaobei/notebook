问题
    XXX@1.0.0 dev D:\gitProjects\webapp\XXX 
    webpack-dev-server –inline –progress –config build/webpack.dev.conf.js 
    10% building modules 0/1 modules 1 active … webpack/hot/dev-server ./src/main 10% building modules 1/1 modules 0 activeevents.js:165 
    throw er; // Unhandled ‘error’ event

解决方法
    修改localhost为本地的

---

npm 安装 chromedriver  

解决方法  

    npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver