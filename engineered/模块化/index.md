# overview
把代码做成一个较独立的功能块。然后互相拼接使用。

# tool
模块化的工具（也叫做打包工具或模块绑定器）有很多。如webpack rollup gulp
2018.05后ff是最后一个支持esm的主流浏览器。
webpack和vite等工具就是用于模块管理
CommonJs 是运行时加载，ES6是编译时加载。
CommonJs 是先加载模块，输出一个对象，输出后内部不会再变化。而 ES6 是语言层面的改变，它 输出的是一个引用，提到引用就想到了JS的数据类型-引用类型 。等执行的时候才会取值输出。

## 为什么浏览器支持了esm后还使用打包工具
1. 减少模块的次数。
2. 打包是可以做转换（如：babel）和预处理

# 模块化如何运行
1. 从指定的入口文件开始。然后根据import找到其他文件。
2. 把每个模块解析并转换为"模块记录"的数据结构

## 模块记录
包括2部分：编码（一系列指令）/状态（变量的状态）
编码：表示该模块能做什么。
状态：表示各变量的状态。

# 模块化解决了什么
- 变量/方法的作用域问题
- 引入顺序的问题
- 更加模块化组织代码。把相关代码放在一起。

# 种类
- script标签。
- amd asynchronous module definition
- cmd common module definition
- umd universal module definition
- esm ecmascript module
- cjs commonjs
