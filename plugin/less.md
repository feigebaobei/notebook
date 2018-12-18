#less

less(leaner style sheets)向后兼容的css扩展语言。  
运行于node.js、服务器端。  
把把less文件转换为css文件。  

##install

    npm i less
    npm i less -g

若需要less.js把less文件编译为css文件，需要全局安装less.这样才能做在命令行里使用`lessc`

##usage

###variables
###mixins
###nesting 

&代表父选择器。  

###operation

各算术操作符都可用于的less.带单位也行。  

###function

    // define
    .class() {
        font-size: 23px;
        .first {
            ...
        }
        .second {
            ...
        }
    }
    // use
    .other {
        color: @orage;
        font-size: .class[first];// 使用classs类进而的font-size的数据值
        .class.first(); // 使用class类里的first类里的样式
    }

###scope

在作用域链是依次寻找。  

###comments

    /* ... */
    // ...

###importing

    @import 'name'
    @import 'name.css'

###服务端和命令行的用法

    lessc [option option=parameter ...] <source> [destination]
    // lessc name.less toname.css

###less 的 option

|||
|-|-|
|lessc --silent||
|lessc --version||
|lessc --help||
|lessc --depends||
|lessc --no-color||  

###在浏览器中使用

第一种： 单独设置options  
![](../image/plugin/less/lessStep.jpg)  

第二种： 在script标签中以`data-`属性的方法设置options  

    <script src="path/to/less.js" data-env="development"></script>

第三种： 在link标签中以`data-`属性的方法设置options    

注意：  

- 先加载less.js再加载***.less  
- 使用同源加载。  

options详解

|关键字|说明|值|
|-|-|-|
|env|环境|'development'/'production'|
|async|是否异步加载文件|Boolean/false|
|fileAsync|当前页面是否使用异步加载文件|Boolean/false|
|poll|多长时间监测一次mode|Integer/1000|
|errroReporting|当编译失败时使用什么方式报告。|'html'/'console'/'function'|
|logLevel|显示哪些输出。0-nothing 1-error 2-info/error|Number|
|function|???||
|relativeUrls|当加载失败时修改less文件的url|Boolean/false|
|useFileCache|是否缓存|Boolean/true|

所有现代浏览器（ie11+）都支持less.编译文件可以在服务端和客户端运行。但二者有区别。在服务端运行时等待时间会较长。性能稳定。在客户端运行等待时间较短，性能有时不稳定。  
使用在服务端提前把less文件渲染成css文件。  

less 跨平台的设置项  

|option|example|说明||
|-|-|-|-|
|Include Paths|`lessc --include-path=PATH1;PATH2` `{paths: ['PATH1', 'PATH2']}`|把指定路径的文件加入编译工作||
|Rootpath|`lessc -rp=resources` `lessc--rootpath=resouces` `{rootpath: 'resources/'}`|设置根目录||
|Relative URLs|`lessc -ru` `lessc --relative-urls` `{relativeUrls: true}`|是否使用相对链接（默认使用绝对链接）||
|Strict Math|`lessc -sm=on` `lessc --strict-math=on` `{strictMath: true}`|是否使用严格数学运算(默认off/false)。false：会计算所有用到算术符号的表达式。true：只计算括号里的用到算术符号的表达式。||
|Strict Units|`lessc -su=on` `lessc --strict-unit=on` `{strictUnits: true}`|是否使用严格单位。当进行算术运算时出现单位不正确时如何操作。默认为false/off。false:将错就错算出结果。true：若出现单位错误就报错。||
|Global Variables|`lessc --global-var="color1=red"` `{globalVars: {color1: 'red'}}`|设置全局变量。||
|Modify Variables|`lessc --modify-var="color1=red"` `{modifyVars: {color1: 'red'}}`|改变全局变量的值||
|URL Arguments|`lessc --url-args="cache724522"` `{urlArgs: 'cache724522'}`|为每一个url添加参数||
|Lint|`lessc --lint -l` `lint: true`|检查less文件中的错误，并输出。||
|Compress|`lessc --compress -x` `{compress: true}`|是否压缩||
|Allow Imports from Insecure HTTPS Hosts|`lessc --insecure` `{insecure: true}`|是否可以从不安全的http中引入文件。||
|Source Map Options||||
|Generate a Source Map|`lessc --source-map` `{sourceMap: {}}`|生成sourceMap||
|Source Map Rootpath|`lessc --source-map-rootpath=dev-files/` `{sourceMap: {{sourceMapRootpath: 'dev-files/'}}`|||
|Source Map Output Filename|`lessc --source-map=file.map` `{sourceMap: {outputFilename: 'file.map'}}`|source map 的文件名||
|Source Map Basepath|`lessc --source-map-basepath=less-files` ``|||
|Include Less Source in the Source Map|`lessc --source-map-include-source` `{sourceMap: {outputSourceFiles: true}}`|是否在source map 文件里包含source 文件||
|Source Map Map Inline|`lessc --source-map-inline` `{sourceMap: {sourceMapFileInLine: true}}}`|是否在行内写入source map||
|Source Map URL|`lessc --source-map-url=../my-map.json` `{sourceMap: {soruceMapURL: '../my-map.json'}}`|设置source map的路径||
|Pre-Loaded Plugin||在加载less.js前加载指定的文件||

###node中使用要less的插件  

1. install `npm i less-plugin-myplugin`  
2. use `lessc --myplugin`  
3. 注册 `lessc --plugin=myplugin`  
4. 为插件设置配置 `lessc --myplugin="advenced"` / `lessc --plugin=myplugin=advanced`  

###编程的方式使用less

    less.render(lessInput, options).then(function (output) {
        // output.css = string of css
        // output.map = string of sourcemap
        // output.imports = array of string filenames of the imports referenced
    }, function (error) {
        // operate error
    })
    // or
    less.render(css, options, function(error, output) {})

    less.logger.addListener({
        debug: function (msg) {...},
        info: function (msg) {...},
        warn: function (msg) {...},
        error: function (msg) {...}
    })

---

2018/12/18 by stone