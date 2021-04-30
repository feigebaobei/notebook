# 插件开发指南

## start
一个vue cli插件可以实现以下功能：
- 修改项目中的webpack配置项
- 添加新的vue-cli-service命令
- 扩展package.json
- 在项目中创建、修改文件。
- 提示用户选择一个特定的选项。

```
// dir construct
|-- readme.md
|-- generator.js  // 创建或编译文件 option
|-- index.js      // service 插件
|-- package.json  // 
|-- prompts.js    // prompt文件   option
|-- ui.js         // vue ui 集成  option

```

## 全名规则

`vue-cli-plugin-${name}`
```
vue add ${name}    // 根据名称安装插件
vue invoke ${name} // 调用插件的generator
```
```
// package.json
{
    name: 'vue-cli-plugin-${name}',
    version: ..
    description: ..
    repository: {
        type: 'git',
        url: ..
    }
    homepage: ..
}
```
## generator

generator（生成器）应该在generator.js 、generator/index.js。
功能是生成、修改文件。
有2种情况被调用
- 项目初始化
- 使用`vue add ..` / `vue invoke ..`专门调用。
生成器是一个方法。接收三个参数：
1. generatorAPI实例
2. generator选项
3. 整个preset

### 创建新的模板

`api.render('./template')`。使用`ejs`渲染`./template`。
```
// generator.js
module.exports = api => {
    api.render('./template')
}
```
因发布到npm上是以`.`开头的文件会被忽略。所以处理`.`开头的文件使用`_`开头代替。处理以`_`开头的文件使用`__`开头处理。

### 扩展依赖
当需要添加依赖时使用。
```
module.exports = api => {
    ...
    api.extendPackage({
        dependencies: {
            'pack-name': '0.0.2'
        }
    })
}
```
### 添加脚本
```
module.exports = api => {
    api.extendPackage({
        scripts: {
            greet: 'vue-cli-service greet'
        }
    })
}
```

### 修改主文件

```
// generator.js
api.injectImport(api.entryFile, `import router from './rotuer'`)
```
```
module.exports.hooks = (api) => {
    api.afterInvoke() // 在写入硬盘后调用。
}
```

## service插件



## 对话
## 安装本地插件
## ui集成
## ui开发