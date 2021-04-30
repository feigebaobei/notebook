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

位于`service.js` / `service/index.js`。
输出一个方法，该文件接收2个参数：
1. 一个pluginAPI实例。
2. 一个包含`vue.config.js`内指定的项目本地选项的对象。或者在 package.json 内的 vue 字段。
功能：
- 修改webpack配置。
```
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')
module.exports = (api, options) => {
    api.chainWebpack(webpackConfig => {
        webpackConfig.plugin('vue-auto-routing').use(VueAutoRoutingPlugin, [
            {
                pages: 'src/pages',
                nested: true
            }
        ])
    })
}
```
- 添加新的cli-service命令。
```
api.registerCommand('greet', {
    description: '..',
    usage: 'vue-cli-service greet'
    options: {'--name': '...'}
}, (arg) => {
    console.log('hi')
    if (arg.name) {
        console.log(...)
    } else {
        console.log(...)
    }
})
// usage
vue-cli-service greet // hi
```
- 修改已经存在的cli-service命令
```
const {serve} = api.service.commands
const serveFn = serve.fn
serve.fn = (...args) => {
    return serveFn(...args).then(res => {
        if (res ** res.url) {
            console.log('...')
        }
    })
}
```
- 为命令指定模式
```
module.exports = api => {
    api.registerCommand('build', () => {...})
}
module.exports.defaultModes = {
    build: 'production'
}
```
## 对话
是为使用cli的程序员列出选项的功能。基于`requirer`实现的。
位于`prompts.js` / `prompts/index.js`。
输出一个由问题组成的数组或是一个能返回这样数组的方法。
```
// array
module.exports = [
    {
        type: 'input',
        name: 'locale',
        message: '..',
        validate: input => !!input
        default: 'en'
    },
    ...
]
// function
module.exports = pkg => {
    // pkg: package.json
    ...
}
```
usage:
`vue invoke my-plugin --mode awesome`

## 安装本地插件

```
vue create test-app
npm i --save-dev file:/full/path/to/plugin
vue invoke <your-plugin-name>
```

## ui集成

该插件如何与`vue ui`对接：
```
vue ui
vue项目管理
选择项目
添加新的插件
浏览本地插件
```
为任务增加ui界面
展示配置页面
配置logo
展示对话
logo

## ui开发

# 小结

在开发的组件中按（vue-cli的）要求配置相应配置项。该组件的具体工作逻辑在`vue-cli`的里。我需要去看看它的源码。
大体分为：
```
// dir construct
|-- readme.md
|-- generator.js  // 创建或编译文件 option
|-- index.js      // service 插件          主要功能
|-- package.json  //                      可能作用于prompts
|-- prompts.js    // prompt文件   option
|-- ui.js         // vue ui 集成  option
```
这些插件是运行在terminal中的。常常用到package.json/本地的vue.config.js。这些插件都是作用于项目的。出发点是项目工程化。
写个插件倒是挻简单。
