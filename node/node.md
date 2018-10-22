#node.js


##node核心设计理念
##node核心模块api
##web开发
##数据库
##测试

异步io. 服务器端js  
node.js的运行基于chrome开发的v8引擎。  

##安装

1. 进行 `http://nodejs.org`下载*.msi。
2. 一直点下一步。  
3. 在cmd中输入 `node -v`。若得到版本号就说明安装成功。  

##npm

它是由node写的一个包管理工具。关于它的用法去看它的笔记吧。  

##js基础

基本类型 number, boolean, string, null, undefined  
复杂类型 array, function, object  

作用域，闭包，原型链，继承。  

##node是单线程的。

事件轮询是node io的基础核心。  

process是nodejs中的全局变量。  
require相对于当前目录。  

    require('module_a.js') // 载入/node_modues/module
    require('./module_b.js') // 载入./module.js

##node重要的api

fs模块是唯一一个