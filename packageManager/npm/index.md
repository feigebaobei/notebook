    npm install (with no args, in package dir)
    npm install [<@scope>/]<name>
    npm install [<@scope>/]<name>@<tag>
    npm install [<@scope>/]<name>@<latest>
    npm install [<@scope>/]<name>@<version>
    npm install [<@scope>/]<name>@<version range>
    npm install <tarball file>
    npm install <tarball url>
    npm install <folder>

    npm uninstall xxx
    npm uninstall -g xxx

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
|rebuild|使用新版本的node时，重新编译所有c++插件。它会运行在与`npm build`相匹配的文件夹下。||
|init|||
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

### 安装过程

1. 执行`npm install`命令。
2. npm向registry查询模块压缩包。
3. 下载压缩包，存放在~/.npm目录
4. 解压压缩包到当前目录的node_modules目录。

本地会有2份数据，分别在`~/.npm`，`node_modules`里。因此可以实现缓存机制。
```
npm cache clean
npm cache clean --force
```

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

## 创建本地链接（常用于开发、调试）

    npm link packagename

require方法不能把全局安装的文件引入。若使用`npm link packagename`后就可以引入全局文件。  
但是`npm link xxx`不支持windows.  `-_-`  

## package.json说明

在运行时引入模块，引入的是package.json中"main"指向的文件。
在webpack打包或者webpack-dev-server的时候，引入的是package.json中"module"指向的文件。

## package.json各字段说明

|key||||
|-|-|-|-|
|name||||
|version||||
|description||||
|keywords||||
|homepage||||
|bugs||||
|license|版权说明|||
|author||||
|contributors||||
|funding|最新的信息所在网址的字段。|Object / Array||
|files|当前包包括哪个文件。|||
|main|主要入口。使用`require(packageName)`时就是从这个字段开始获取数据。|||
|browser|当该包使用在browser时，会代替main字段的功能。|||
|bin|二进制文件的目录|||
|man|不会|||
|directories|(目录)|||
|description.lib||||
|description.bin||||
|description.man||||
|description.doc||||
|description.example||||
|description.test||||
|repository|该包的仓库|Object|{"type":"git","url":"xxxx"}|
|script|可运行的脚本|Object||
|config|使用该包时需要的配置项|||
|dependencies|生产环境的依赖项|Object||
|devDependencies||Object||
|peerDependencies|本node包依赖的其他依赖包。同等依赖。|Object|{'vue': '2.6.0'}|
|unpkg|上所有的文件都开启 cdn 服务地址||
|bundledDependencies|一组包名，他们会在发布的时候被打包进去。|||
|optionalDependencies|如果一个依赖可用，但你希望在它安装错误的时候npm也能继续初始化，|||
|engines|需要什么样的运行环境支持||`{"engines": {"node": ">=10.0.0"}}`|
|engineStrict|不会|||
|os|需要什么样的操作系统|||
|cpu||||
|preferGlobal|不会|||
|private|若true，则不能`npm publish`|Boolean||
|publishConfig|不会|||
|DEFAULT VALUES|不会|||

## npm 包使用范围

只允许在客户端使用的，
只允许造服务端使用的，
浏览器/服务端都可以使用。
如果我们需要开发一个 npm 包同时兼容支持 web端 和 server 端，需要在不同环境下加载npm包不同的入口文件，显然一个 main 字段已经不能够满足我们的需求，这就衍生出来了 module 与 browser 字段。

`*.mjs`文件是在 node 环境下原生执行 ESM 规范的脚本文件。当执行`require('index') / import('index')`时，优先加载`index.mjs`，即优先级：`*.mjs > *.js`

main：npm包的入口文件。兼容browser / node。
  main字段是npm包主要入口文件`require(xxx)`时就是从main字段取值的。
module: npm包的es规范的入口文件。兼容browser / node。
browser：npm包的browser环境下的入口文件。

只npm包只允许在web端（浏览器中）运行，则使用browser。
只npm包只允许在server端（node中）运行，则使用main.
使用npm包可以在web、server端都可运行，则使用browser+main.

## 脚本
`npm run xxx` // 执行脚本
`npm xxx` // 执行脚本
npm run // 查看所有脚本
脚本运行在`shell`中。
传参数:使用`--`标明。如：`npm run lint -- --reporter checkstyle > checkstyle.xml`
`&`：同时执行。`&&`：成功后向下执行。这2个符号是`bash`的功能。
默认的脚本：`"start": "node server.js"` / `"install": "node-gyp rebuild"`。不需要定义即可执行。
钩子:
npm脚本支持`pre`/`post`2种钩子。每个脚本都可以如此处理。如：当执行`npm run build`时，会执行：`npm run prebuild && npm run build && npm run postbuild`.默认提供的金子：
- prepublish, postpublish
- preinstall, postinstall
- preuninstall, postuninstall
- preversion, postversion
- pretest, posttest
- prestop, poststop
- prestart, poststart
- prerestart, postrestart
`npm restart`是`npm stop && npm restart && npm stop`的简写。
简写：`npm start`.忽略了`run`
### 变量
通过`npm_package_`前缀可得到`package.json`中的字段。 如：`process.env.npm_package_version` / `process.env.npm_package_script_install`
通过`npm_config`前缀可得到`package.json`中`config`里的变量。如：`npm_config_tag`。`npm config get xxx`
