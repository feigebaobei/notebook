##module.exports|exports|export|export defaut的区别

|module.exports|exports|export|export default|
|-|-|-|-|
|node.js中的语法。用来导出对象用法。|node.js中的语法。用来导出对象用法。|es6的语法|es6的语法|
|module.exports = {}|exports={}|export {var0, var1}|export default {}|
|-|-|import {a, b as c} from 'map'|import a from 'map'|

[JS - 各浏览器对ES2015/ES6的支持情况（桌面端、移动端、以及服务器）](http://www.hangge.com/blog/cache/detail_1692.html)  

##桌面端浏览器对ES2015的支持情况
1. Chrome：51 版起便可以支持 97% 的 ES6 新特性。
1. Firefox：53 版起便可以支持 97% 的 ES6 新特性。
3. Safari：10 版起便可以支持 99% 的 ES6 新特性。
4. IE：Edge 15可以支持 96% 的 ES6 新特性。Edge 14 可以支持 93% 的 ES6 新特性。（IE7~11 基本不支持 ES6）

`<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>`
