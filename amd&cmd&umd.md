#模块化  

1. 定义封装的模块。  
2. 2. 定义新模块对其他模块的依赖。  
3. 可对其他模块的引入支持。  

在js中出现了一些非传统模块开发方式的规范commonjs的模块规范。amd(asynchronous module definition), cmd(common module definition)

##commonjs

node.js采用这个规范。  

在node.js每一个文件都是一个模块。加载模块使用require的方法，该方法读取一个文件并执行，最后返回这个模块内部的exports对象。  

    // foobar.js
    //私有变量
    var test = 123;
    //公有方法
    function foobar () {
        this.foo = function () {
            // do someing ...
        }
        this.bar = function () {
            //do someing ...
        }
    }
    //exports对象上的方法和变量是公有的
    var foobar = new foobar();
    exports.foobar = foobar;

    //require方法默认读取js文件，所以可以省略js后缀
    var test = require('./boobar').foobar;
    test.bar();

commonjs是同步加载的。  

##amd

##require.js

1. 实现异步加载js文件，避免网页失去响应。  
2. 管理模块之间的依赖性，便于代码的编写与维护。  

    <script src="path/require.js" data-main="js/main"></script>

main.js可以简写为main.  
require会第一个加载main.js  
data-mian属性指定网页程序的主模块。  

### 编写main模块。（在require中文件就是模块）  

    alert('hello')

    require(['moduleA', 'moduleB', 'moduleC'], function (moduleA , moduleB , oduleC) {
        // code
    })

回调函数会在前面的模块都加载成功后再执行。  

###加载模块  

默认情况下需要加载的模块是在与require相同的目录下。若需要加载别的目录下的模块需要使用`require.config()`方法写明配置条件。  
`require.config()`写在主模块（main）的头部。  
每个模块异步加载成功后会将其合并到一个文件中。减少http请求的数量。  

    require.config({
        // baseUrl: 'path/to/lib', // 可以写一个有基本路径。
        paths: {
            'moduleA': 'moduleAname.js',// 可以不写.js
            'moduleB': 'https://www.****.com', // 也可以写一个绝对路径。
            'moduleC': 'moduleCname.js'
        }
    })

加载采用amd规范的模块

    // 编写采用amd规范的模块
    // testAmd.js
    define(function () {
        var add = function (x, y) {
            return x + y
        }
        return {
            add: add
        }
    })
    // 加载方法
    require(['testAmd'], function (myLib) {
        alert(myLig.add(1, 2))
    })
    // 编写采用amd规范的有依赖模块的模块
    define(['athorModule'], function (athorModule) {
        function foo () {
            athorModule.doSomething()
        }
        return {
            foo: foo
        }
    })
    // 加载方法和上一个一样。

加载非采用amd规范的模块  

    require.config({
        shim: { // 用来配置不兼容amd规范的模块。
            'underscore': {
                exports: '_'// 输出到外部的调用名称。
            },
            'backbone': {
                deps: ['underscore', 'jquery'], // 依赖模块。
                exports: 'Backbone'
            }
        }
    })

###require.js插件

require.js还提供一系列插件。  
domready插件可以让回调函数在dom结构加载完成后再执行。  

    require(['domready!'], function (doc) {
        //
    })

text插件。加载文本  
image插件。加载图片  

    define([
        'text!review.txt',
        'image!cat.png'
        ],
        function (review, cat) {
            console.log(review)
            document.body.appendChild(cat)
        }
    )
json插件。
mdonw插件。  

---

2018/09/06 by stone