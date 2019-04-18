# seajs 

作者：玉伯  
使用cmd规范。  
听说它使用issue做为文档。 -> 不方便查阅。  
官网demo很少，不详细 -> 不方便查阅、入门。  
小版本在较大变化 -> 版本控制不规范。  
有的方法、属性说没就没了。 -> 版本变化时无文档说明  

## 模块系统

每一个文件都是一个模块。有css模块template模块js模块。  
在seajs里专注js模块。其会把css template 模块转换为js模块。  
各模块使用cmd规范编写。通过基本交互规则，彼此引用，协同工作。  

### define 用来定义模块  

    define([id][, deps,] factory)
    /*
    params
    id 模块标识 String
    deps 模块依赖 Array
    factory Object/Array/String/Function(require, exports, module){
        require 引入
        exports 输出
        module 当前模块
    }
     */

define.cmd // {} 当前页面是否有cmd模块加载器存在。  
### require 

require(id) // 加载模块  
require.async(id, callback) // 异步加载页面。加载完成后执行callback  
require.reslove(id) // 返回解析后的绝对路径。  

### exports

它是一个对象。用来向外提供模块接口。  
对外接口有三种写法：  

    // no.1
    define(function (require, exports) {
        exports.foo = 'bar'
        exports.do = function () {}
    // no.2
    define(function (require, exports, module) {
        module.exports = { // 只能同步执行，不可异步执行。
            foo: 'bar',
            do: function () {}
        }
    })
    // no.3
        define(function (require, exports, module) {
            return {
                foo: 'bar',
                do: function () {}
            }
            // 或 {a: 'a', b: function () {}}
        })
    })

### module

就是当前模块。它包含了当前模块的一切数据、方法。  

module.id // 模块标识 String  
module.uri // 返回模块的绝对路径 String  
module.dependencies // 返回模块的依赖项 Array  
module.export // 对外的接口 {}  

### 模块标识

1. 以斜线（/）分隔。  
2. 每一项都是小驼峰命名法。  
3. 可以不写文件后缀。  
4. 可以使用相对、顶级标识。  
5. 顶级标识根据模块系统的基础路径来解析。  
6. 相对标识使用require所在模块的路径来解析。  

### require书写约定

1. 必须写成require.  
2. 不能修改require。  
3. 必须使用直接量。（如：require('my-module'),正确。require('my-'+'a'),错误）  

## 实现原理

### 模块加载

当使用到require/seajs.use/require.async方法时才会执行模块加载。  
创建一个script标签再给定src属性。再append到dom文档中。  

### 模块依赖

把依赖项先加载进来。  

### 命名冲突

define()函数定义的模块，其内部都是局部变量的。  
使用exports对象输出。  
exports对象就相当于一个命名空间。  

## 配置选项

    seajs.config({
        base: '',
        preload: '',
        charset: '',
        timeout: Number
        debug: Boolean,
        alias: {key: 'value'},
        vars: {},
        paths: {key: 'value'},
        map: [[/**/, '']],
    })
    seajs.noConflict(Boolean)

### seajs.config 配置加载器

**base 基础(顶级)路径。**  
**preload 预先加载项。在普通模块前加载**  
**charset 设置`script`标签的`charset`属性。其默认为`utf-8`**  
**timeout 设置加载模块的超时时间。默认为20000。单位是ms**  
**debug Boolean** 是否使用`console.log`输出警告和错误。否则抛出异常。  
**alias Object** 用来缩短标识长度。一般在模块标识很长时使用。也可以与paths一起使用。在config里设置一次可以在其所有模块中使用。  
**vars {}** 若一些变量在运行时才能确定下来。此时需要使用vars。（使用alias不方便）
**paths {key: 'value'}** 路径  
**map: []** 一般用来管理版本号、时间戳、路径转换。如`map:[[/(.*?)\.js/i, '$1-debug.js']]    var a = require('cs/a') // base/path/cs/a-debug.js`

### seajs.noConflict(Boolean)  是否释放define方法
