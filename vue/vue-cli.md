##installation

    $ npm install -g vue-cli // 1.x 2.x
    npm uninstall -g vue-cli
    npm i -g @vue/cli
    vue --version

## usage  

    // vue-cli
    $ vue init <template-name> <project-name>
    $ vue init webpack firstvue

    // @vue/cli
    // 创建并打包单个*.vue文件
    vue serve
      ver serve main.js // 指定入口文件。可以main.js/index.js/App.vue/app.vue中的一个。也可自定义。
    vue build

    // 创建一个项目
    vue create program-name // 项目名需要全小写

    // 在已有的项目中添加插件
    vue add eslint // 可能会修改现有文件



使用vue-cli会从0开始创建一个vue项目。  

## official templates  

可以使用以下的模板名字。  

1. webpack 包括webpack的全部功能+vue-loader+热更新+linting+testing+css extraction  
2. webpack-simple 简单的webpack功能+vue-loader.  
3. browserify  
4. browserify-simple  
5. pwa PWA模板+webpack的基本模板。  
6. simple 创建一个简单html文件。  

也可使用自定义模板。  
    
    vue init username/repo projectName

