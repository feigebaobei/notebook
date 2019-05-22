#require.js

##为什么使用require.js

1. 因插件之间的可能有信赖，所以必须依次加载。  

##可以解决的问题

1. 异步加载js文件。  
2. 模块化管理js文件。  

##加载require

    <script src="./js/require.js" defer async=true></script>
    // defer / async="true" 都是标明异步加载的。
    // ie 只支持 defer
    // 其它浏览器支持 async="true"

## 指定主模块

    <script src="./js/require.js" defer async=true data-main="js/main"></script>
    // data-main 指定主模块的path。可以省略ext.  

## 主模块写法

    // main.js
    require.config({
        /* 若引入的插件不是amd规范,则需要shim start */
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'], // 当前插件依赖的插件
                exports: 'Backbone' // 输出的名称
            }
        },
        /* 若引入的插件不是amd规范,则需要shim end */
        baseUrl: 'js/lib', // 相对于main.js的基本路径
        paths: {
            'jquery': 'jquery.min',
            'underscore': 'underscore.min',
            'backbone': 'https://www.xxx.xxx.min'
        }
    })
    require(['moduleA', 'moduleB', 'moduleC'], (moduleA, moduleB, moduleC) => {
        // ...
    })

## 自定义amd规范的文件

    // math.js
    define(
        /* 若当前文件需要依赖三方文件时,使用数组形式引入 start */
        ['moduleA', 'moduleB'],
        /* 若当前文件需要依赖三方文件时,使用数组形式引入 end */
        const foo = () => {
            // ...
        }
        return {
            foo: foo
        }
    )

## api

`data-main` 是代码开始的地方。这个属性值是最先添加的文件。表示从哪里开发。  
若没有设置data-main且没有设置baseUrl，则默认使用执行require.js的html文件的目录。  
baseUrl > data-main > x.html  
requirejs 默认加载的文件是scripts。所以不期望看到`.js`后缀。在转换moduleId=>path时自动添加。
若出现以下任一情况，则当作绝对链接对待。1. 以`.js`结尾。2.以`/`开头。3.包含任一协议（http/https/...）  
最好设置版本号，如：`jquery.1.7.2`  
可以使用 shim 配置非amd文件。  
最好设置`data-main`属性。在main.js文件(也可以的是别的主文件)里设置config.  
纯数据的写法：`define({k0: v0, k1: v1})`。一般用于没有dependence时。  

    define({
        color: 'black',
        size: 'unisize'
    })
    define(function () {
        return {
            color: 'black',
            size: 'unisize'
        }
    })
    // 简单包裹起来commonjs模块
    define(function (require, exports, module) {
        let a = require('a')
        let b = require('b')
        return function () {}
    })
    // 给模块定义名称
    define('foo/title', ['a', 'b'], function (a, b) {
        //
    })
    // json
    define(['http://www.xxx.com/path/to/name.json'], function(json) {
        //
    }, function (err) {
        // 出错时执行
    })

`define`有2个参数。第一个参数是一个数组。由表示每个信赖的string组成。第二个参数是一个function.在信赖全部加载完成后执行。其返回一个默认对象。其参数是第一个参数的的顺序。  

生成url  

    define(['require'], function（require) {
        var cssUrl = require.toUrl('./style.css')
    })

循环依赖  

    // no.1
    define(['a', 'exports'], function(a, exports))
    // no.2

### config

    require.config({
        baseUrl: '', // 基本路径
        paths: { // 配置路径
            path: 'some/path'
        },
        bundles: {}, // 不知道
        shim: {
            backbone: {
                deps: ['name', 'name'], // 依赖项
                exports: 'name' // 输出的 string/function
            },
            'jquery.colorize': {
                deps: ['jquery'],
                exports: 'jQuery.fn.colorize'
            }
        },
        map: { // 不知道
            
        },
        packages: {},
        config: {},
        nodeIdCompat: {},
        waitSeconds: {}, // 加载脚本的超时时间(s)
        context: {},
        deps: {},
        callback: {},
        enforceDefine: {},
        xhtml: {},
        urlArgs: {},
        scirptType: {},
        skipDataMain: {},
        enforceDefine: {},
        enforceDefine: {}
    })

### 全局配置

    requirejs.onError = function (err) {
        // 
    }

## plugin

text.js
domReady.js
I18N.js
load
normalize  
write  
pluginBuilder  

## optimizing 优化

