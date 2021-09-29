# overview

本示例展示了：
- 使用babel命令行

1. install @babel/cli.
2. 安装依赖。
3. 在package.json中设置脚本
4. 缩写代码。
5. 执行脚本。
6. 设置配置文件。

# init project
```
mkdir projDir
cd projDir
npm i -D @babel/core @babel/cli
npm install @babel/preset-env --save-dev
npm set-script build "babel src -d lib"
```

## 创建文件
创建`<root>/src/index.js`
```
// 开关机
function * helloWorldGenerator() {
    let t = true
    while (true) {
        yield t = !t
    }
}
var hw = helloWorldGenerator();
console.log(hw.next()) // 多执行几次
console.log(hw.next()) // 多执行几次
console.log(hw.next()) // 多执行几次
console.log(hw.next()) // 多执行几次
console.log(hw.next()) // 多执行几次
```
创建`<root>/babel.config.json`
```
{
  "presets": ["@babel/preset-env"]
}
```

## run
```
npm run build
```

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- src
    |-- index.js
|-- lib
    |-- index.js
|-- xxxx
|-- xxxx
```

# 后记
## 为什么输出与输入一样？
为什么这么做示例。
如何恢复本示例的运行结果。