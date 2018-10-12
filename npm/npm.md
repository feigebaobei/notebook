    npm install (with no args, in package dir)
    npm install [<@scope>/]<name>
    npm install [<@scope>/]<name>@<tag>
    npm install [<@scope>/]<name>@<version>
    npm install [<@scope>/]<name>@<version range>
    npm install <tarball file>
    npm install <tarball url>
    npm install <folder>

    npm i

|缩写|全写||
|-|-|-|
|-S|--save|安装包信息将加入dependencies(生产阶段的依赖)（默认）|
|-D|--save-dev|安装包信息将加入到devdependencies(开发阶段的依赖)|
|-O|--save-optional|optionalDependencies(可选阶段的依赖)|
|-E|--save-exact|精确安装指定模块版本|
||--dry-run||
||local|本地安装|
|-g|--global|全局安装|  

npm uninstall 卸载模块  
npm  

||||
|-|-|-|
|uninstall|卸载模块||
|update|更新模块|按照package.js里标注的版本号进行更新|
|outdated|检查模块是否已经过时||
|ls|查看安装的模块||
|help|查看详细信息||
|root|查看安装路径||
|config|设置配置|npm config set proxy=http://xxx.com:8080(设置代理)npm config set registry="http://r.cnpmjs.org"(设置镜像)npm install -g cnpm --registry=https://registry.npm.taobao.org(设置淘宝镜像)|
|cache|管理模块的缓存||
|start|启动模块||
|stop|||
|restart|||
|test|||
|version|||
|view|查看模块的注册信息||
|adduer|用户登录||
|publish|发布模块||
|access|在发布的包上设置访问级别||
||||
||||

##全局安装和局部安装的区别  

###全局安装

在任何地方都可以调用。  
在安装后可以在“C:/user/(pc's name)/AppData/Roaming/npm”里面有`*.cmd`  

###局部安装  

只在本项目中可以使用。  
安装在`./node_modules`  
使用时需要引入  

    var webpack = require('webpack')

何时使用全局安装、局部安装？  

首先需要理解全局安装在c盘里的，局部安装在本项目的./node_modules里。  
引用时需要使用相对链接的方式引用（../）。  
各个项目使用各个依赖版本可能与别的项目的版本不一样。  
使用的工具适合使用全局安装。  
项目的依赖适合使用本地安装。  

##安装淘宝镜像  

    npm i -g cnpm --regitstry=https://registry.npm.taobao.org

安装项目依赖时报错。  

    $ npm i

    > chromedriver@2.41.0 install D:\code\github\colosseum\node_modules\chromedriver
    > node install.js

    Downloading https://chromedriver.storage.googleapis.com/2.41/chromedriver_win32.zip
    Saving to C:\Users\Admin\AppData\Local\Temp\chromedriver\chromedriver_win32.zip

安装项目依赖的解决方法。  

    npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

从远程拉下来的项目运行`npm run dev`时报错。  

     94% asset optimization ERROR  Failed to compile with 18 errors14:20:00                                                                                                                                                                                                        
     error  in ./src/components/elementui/user.vue

    Module build failed: Error: ENOENT: no such file or directory, scandir 'D:\code                                                                                                                                                                                                \github\colosseum\node_modules\node-sass\vendor'
        at Object.fs.readdirSync (fs.js:904:18)
        at Object.getInstalledBinaries (D:\code\github\colosseum\node_modules\node-                                                                                                                                                                                                sass\lib\extensions.js:129:13)
        at foundBinariesList (D:\code\github\colosseum\node_modules\node-sass\lib\e                                                                                                                                                                                                rrors.js:20:15)
        at foundBinaries (D:\code\github\colosseum\node_modules\node-sass\lib\error                                                                                                                                                                                                s.js:15:5)
        at Object.module.exports.missingBinary (D:\code\github\colosseum\node_modul                                                                                                                                                                                                es\node-sass\lib\errors.js:45:5)
        at module.exports (D:\code\github\colosseum\node_modules\node-sass\lib\bind                                                                                                                                                                                                ing.js:15:30)
        at Object.<anonymous> (D:\code\github\colosseum\node_modules\node-sass\lib\                                                                                                                                                                                                index.js:14:35)
        at Module._compile (module.js:653:30)
        at Object.Module._extensions..js (module.js:664:10)
        at Module.load (module.js:566:32)
        at tryModuleLoad (module.js:506:12)
        at Function.Module._load (module.js:498:3)
        at Module.require (module.js:597:17)
        at require (internal/module.js:11:18)
        at Object.sassLoader (D:\code\github\colosseum\node_modules\sass-loader\lib                                                                                                                                                                                                \loader.js:46:72)

     @ ./node_modules/vue-style-loader!./node_modules/css-loader?{"sourceMap":true}                                                                                                                                                                                                !./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-500a44fa                                                                                                                                                                                                ","scoped":false,"hasInlineConfig":false}!./node_modules/sass-loader/lib/loader                                                                                                                                                                                                .js?{"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&in                                                                                                                                                                                                dex=0!./src/components/elementui/user.vue 4:14-384 13:3-17:5 14:22-392
     @ ./src/components/elementui/user.vue
     @ ./src/router/index.js
     @ ./src/main.js
     @ multi (webpack)-dev-server/client?http://localhost:8080 webpack/hot/dev-serv                                                                                                                                                                                                er ./src/main.js
解决方法。  

    npm rebuild node-sass
