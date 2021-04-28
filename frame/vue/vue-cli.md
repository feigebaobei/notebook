# vue-cli
是与vue2.x相配合使用的vue的命令行工具。
##installation

    $ npm install -g vue-cli // 1.x 2.x
    npm uninstall -g vue-cli
    npm i -g @vue/cli // 4.x
    vue --version

## update

```
npm update -g @vue/cli
```

## usage  

    // vue-cli
    // 它与vue2.x一起工作。
    $ vue init <template-name> <project-name>
    $ vue init webpack firstvue

    // @vue/cli
    // 创建并打包单个*.vue文件
    // 它与vue3.0一起工作。
    // 创建一个项目
    vue create program-name // 项目名需要全小写
    vue serve // 启动服务
    vue serve main.js // 指定入口文件。可以main.js/index.js/App.vue/app.vue中的一个。也可自定义。
    vue build // 打包项目

    // 在已有的项目中添加插件
    vue add eslint // 可能会修改现有文件

### 创建项目

```
vue create program-name // 项目名需要全小写
```

### 安装插件
```
vue add plugin-name // 在一个已经创建好的项目中安装插件
```
vue add 的设计意图是为了安装和调用 Vue CLI 插件。

### preset

一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。
```
// example
{
    "userConfigFiles": true,
    "cssPreprocessor": "sass",
    "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-eslink": {
            "config": "airbnb",
            "lintOn": ["save", "commit"]
        },
        "@vue/cli-plugin-router": {},
        "@vue/cli-plugin-vuex": {},
    }
}
```


```
vue create --preset username/repo pn // 使用github上的preset仓库
vue create --preset gitlab:username/repo pn // 使用gitlab上的preset仓库
vue create --preset ./my-preset pn // 使用本地的preset
```





使用vue-cli会从0开始创建一个vue项目。  

## official templates  

可以使用以下的模板名字。  

1. webpack 包括webpack的全部功能+vue-loader+热更新+linting+testing+css extraction  
2. webpack-simple 简单的webpack功能+vue-loader.  
3. browserify  
4. browserify-simple  
5. pwa PWA模板+webpack的基本模板。  
6. simple 创建一个简单html文件。  

也可使用自定义模板。  
    
    vue init username/repo projectName

## config

在`@vue/cli`创建的项目中没有配置文件。不是代表没有配置文件，而是没有显式创建出来。
`@vue/cli`的配置文件是在根目录的`vue.config.js`文件。若没有该文件，则需要手动创建。其基本结果是
```
// vue.config.js
module.exports = {
    // config
}
```
在该文件里调试的配置项会在被`@vue/cli-service`自动加载。
各配置项可参考 https://cli.vuejs.org/zh/config


## issue

```
command failed: npm install --loglevel error
```
原因：
.vuerc是@vue/cli的全局配置文件。这里默认不使用taobao的registry。估计又与墙有关。
解决方法：
打开`~/.vuerc`
修改`useTaobaoRegistry`为`true`。


# @vue/cli
是与vue3.x相配合使用的vue的命令行工具。
它是基于webpack/webpack-dev-server开发的。

## overview
### 功能
- 通过`@vue/cli`实现交互式项目脚手架。
- 通过`@vue/cli + @vue/cli-server-global`实现零配置原型开发。
- 需要一个运行时依赖`@vue/cli-service`。该依赖
    - 可升级
    - 基于webpack，自带合理默认配置。
    - 可通过项目的配置文件配置
    - 可通过通过插件扩展
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理vue.js项目的用户界面

### cli
在command line中使用`vue`调用vue的命令。
```
// 常用
vue create // new project
vue serve  // setup serve for dev
vue ui     // 使用图形化界面管理项目。
```

### cli server
是一个开发环境依赖。基于werpack/webpack-dev-server开发。
- 加载其它cli插件的核心服务
- 一个针对绝大部分应用优化过的内部的webpack配置。
- 项目内部的`vue-cli-service`命令，提供serve/build/inspect命令。

### cli plugin
以`@vue/cli-plugin-`开头。（内建插件）
以`vue-cli-plugin-`开头。（社区插件）
运行`vue-cli-service`时，会自动解析并加载`package.json`中列出的所有的cli插件。

## install

```
// uninstall vue-cli -g
npm uninstall vue-cli -g
// install @vue/cli
npm install -g @vue/cli
// check
vue --version
// upgrade
npm update -g @vue/cli
```

## basic

### 快速原型开发
可用于开发/测试单个`*.vue`。
需要全局安装一个包
`npm i @vue/cli-service-global -g`

### vue serve
```
Usage: serve [options] [entry]
在开发环境下零配置为*.js / *.vue启动一个服务器
options:
    -o  --open 打开浏览器
    -c  --copy 将本地url复制到剪切板
    -h  --help 输出用法信息
```
创建一个App.vue文件
```
<template>
    <h1>title</h1>
</template>
```
在项目的根目录下运行`vue serve`
`vue serve`的默认入口是`main.js`/`index.js`/`App.vue`/`app.vue`
也可显示指定入口文件
`vue serve entry.vue`
在`index.html`/`package.json`是安装并使用依赖/配置。
构建：`vue build`
```
Usage: build [options] [entry]
在生产环境下零配置构建一个 *.js / *.vue 文件。
options:
    -t  --target <target> 构建目标(app | lib | wc | wc-async)，默认app。
    -n --name <name>      库的名字或Web Components组件的名字（默认值：入口文件名）
    -d  --dest <dir>      输出目录（默认值：dist）
    -h  --help
```
```
// example
vue build MyComp.vue
```

### 创建一个项目

执行`vue create hello-world`可以创建一个新项目。
然后提示使用default / manually。
    default    默认preset。保存在用户的home/.vuerc（它是`*.json`）
    manually   手动选择相应配置，较灵活。最后提示是否设置为默认项。
```
用法：create [options] <app-name>
创建一个由 `vue-cli-service` 提供支持的新项目
选项：
  -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
  -d, --default                   忽略提示符并使用默认预设选项
  -i, --inlinePreset <json>       忽略提示符并使用内联的 JSON 字符串预设选项
  -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
  -r, --registry <url>            在安装依赖时使用指定的 npm registry
  -g, --git [message]             强制 / 跳过 git 初始化，并可选的指定初始化提交信息
  -n, --no-git                    跳过 git 初始化
  -f, --force                     覆写目标目录可能存在的配置
  -c, --clone                     使用 git clone 获取远程预设选项
  -x, --proxy                     使用指定的代理创建项目
  -b, --bare                      创建项目时省略默认组件中的新手指导信息
  -h, --help                      输出使用帮助信息
```
vue ui   图形化界面


















## development





