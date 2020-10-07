# debug

node远程调试支持方式有 --debug参数（使用V8 debugging protocol）和 --inspect参数。两者的原理和适用版本是不一样的。
--debug 适用于node8之前     --inspect 适用于8之后。

```
// 在服务端运行
node --inspect=0.0.0.0:9229 ./bin/stoneServer
// 在浏览器中
1. 打开开发者工具
2. 点击左上角的node图标。会打开新窗口。就可以正常使用了。
3. 服务器的终端中会出现`Debugger attached.`
```

## 使用内置debug功能

```
node debug app.js // 进入调试模式
debugger // 在代码中设置断点
sb(<lineNumber>) // 进入相应的断点行
next // 执行下一步
cont // 运行到下一个断点
repl // 进入查看断点的模式。
  <var> // 变量名
  ctrl + c // 退出
watch(expr) // 添加到监视对象
watchers // 列出监视对象
unwatch(expr) // 移出监视对象
step in / s // 进入函数
step out / o // 跳出函数
restart // 重新运行
```

```
// 1. 在远程服务器上运行
node --debug-brk app.js
// 2. 在本地机器中运行
node debug ip:port

```
## 通过node-inspector

这个方法比较老了，一般不使用了。

## 使用ide(vscode)

我不喜欢使用vscode。喜欢使用sublime

## confuse

--inspect 和--inspect-brk的区别是--inspect-brk默认会在第一行代码进行断点
在浏览器中输入: `chrome//inspect`