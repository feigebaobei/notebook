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
@vue/cli是管理项目的command line工具。其中官网中多次提到多种插件（基于`webpack`的`vue-cli-service`）/编译工具`babel`
预置了很好常用配置。可在`vue.config.js`修改。该文件作用于多个地方，不只有`webpack`

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

### plugin & preset

#### plugin

vue cli使用了一套基于插件的架构。插件可以修改webpack的内部配置，也可以向`vue-cli-server`注入命令。
```
vue add eslint // 安装eslint插件
```
使用本地插件            不会

#### preset

预置项是创建项目时的配置文件。包括用到的插件/预定义项。放在`home/.vuerc`

### cli service

```
vue-cli-service serve [options] [entry]
options: 
  --open  在服务器启动时打开浏览器
  --copy  在服务器启动时将url复制到剪切板
  --mode  指定环境模式（default: development）
  --host  指定host(default: 0.0.0.0)
  --open  指定port(defalut: 8080)
  --https 是否使用https(default: false)
```
```
vue-cli-service build [options] [entry|pattern]
options:
  --mode    指定环境模式(default: production)
  --dest    指定输出目录(default: dist)
  --modern  面向现货浏览器带自动回退地构建应用
  --target  app | li | wc | wc-async(default: app)
  --name    库或Web Components 模式下的名字（default: package.json中的name字段或入口文件名）
  --no-clean    在构建项目之前不清除目标目录
  --report    生成report.html以帮助分析包内容
  --report-json    生成report.json以帮助分析包内容
  --watch    监听文件变化
```
```
vue-cli-service inspect [options] [...paths]
options:
  --mode  指定环境模式（default: development）
```
```
npx vue-cli-service help           // 查看所有注入的命令
npx vue-cli-service help [command] // 查看指定的命令
```
文件会缓存在`node_modules/.cache`。
`cache-loader`会默认为`Vue/Babel/TypeScript`编译开启。
`thread-loader`会在多核cpu上为`Babel/TypeScript`转译开启。


## development
### 浏览器兼容性

在 package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

### html和静态资源
public/index.html 文件是一个会被 html-webpack-plugin 处理的模板。在构建过程中，资源链接会被自动注入。

插值
  `<%= VALUE %>` 用来做不转义插值；
  `<%- VALUE %>` 用来做 HTML 转义插值；
  `<% expression %>` 用来描述 JavaScript 流程控制。

`<link rel="preload">` 是一种 resource hint，用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload。

`<link rel="prefetch">` 是一种 resource hint，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。默认情况下会按`import`自动生成prefetch提示。

不使用index
```
// vue.config.js
module.exports = {
  // 去掉文件名中的 hash
  filenameHashing: false,
  // 删除 HTML 相关的 webpack 插件
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
```

多页面应用 
Vue CLI 支持使用 vue.config.js 中的 pages 选项构建一个多页面的应用。
```
```

处理静态资源
在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。
放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

url转换规则
如果 URL 是一个绝对路径 (例如 /images/foo.png)，它将会被保留不变。
如果 URL 以 . 开头，它会作为一个相对模块请求被解释且基于你的文件系统中的目录结构进行解析。
如果 URL 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：
如果 URL 以 @ 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 `<projectRoot>/src` 的别名 @。(仅作用于模版中)

public文件夹
任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。（即`/`开头）
```
// 模板文件。一般是index.html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
// *.vue
data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
<img :src="`${publicPath}my-image.png`"
```

何时使用 public 文件夹
- 你需要在构建输出中指定一个文件的名字。
- 你有上千个图片，需要动态引用它们的路径。
- 有些库可能和 webpack 不兼容，这时你除了将其用一个独立的 `<script> `标签引入没有别的选择。

### css相关
Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。
创建项目是会提示选择哪种css预处理器
也可手动安装相应loader
```
npm i -D sass-loader sass
npm i -D less-loader less
npm i -D stylus-loader stylus
```
usage
```
// *.vue
...
<style lange="scss">
  $color: red;
  ...
</style>
```

自动化导入            不会

PostCSS
CSS Modules
在`vue.config.js`中向预处理loader传递选项

### webpack相关

```
vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```

链式操作
通过`webpack-chain`处理。
  修改loader选项
  添加新loader
  替换loader
  修改plugin选项

审查项目的webpack配置
`@vue/cli-service`会把内置的webpack配置与`vue.config.js`中的配置混合后得到最终的配置文件。
```
vue inspect > output.js    // 输出是被序列化的格式
vue inspect module.rules.0 // 只看一小部分
vue inspect --rule vue     // 查看指定的规则
vue inspect --plugin html  // 查看指定的插件
vue inspect --rules        // 查看所有规则
vue inspect --plugins      // 查看所有插件
 ```

以一个文件的方式使用解析好的配置                  不会

### 模式和环境变量

模式
  development 模式用于 vue-cli-service serve
  test        模式用于 vue-cli-service test:unit
  production  模式用于 vue-cli-service build 和 vue-cli-service test:e2e
环境变量，需要创建。使用`key=value`方式定义。
  .env                # 在所有的环境中被载入
  .env.local          # 在所有的环境中被载入，但会被 git 忽略
  .env.[mode]         # 只在指定的模式中被载入
  .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

别的不会


### 构建目标

使用`vue-cli-service build`创建。使用`--target`指定创建目标。有4种目标可选。创建是把同一源代码，创建为4种不同的构建目标。
应用
  index.html
  独立的包中保存第三方库
  小于4k的静态资源被内联在js中
  public目录中的静态资源被复制后到输出目录中
库
  `vue-cli-service build --target lib --name myLib [entry]`
  dist/myLib.common.js：一个给打包器用的 CommonJS 包 (不幸的是，webpack 目前还并没有支持 ES modules 输出格式的包)
  dist/myLib.umd.js：一个直接给浏览器或 AMD loader 使用的 UMD 包
  dist/myLib.umd.min.js：压缩后的 UMD 构建版本
  dist/myLib.css：提取出来的 CSS 文件 (可以通过在 vue.config.js 中设置 css: { extract: false } 强制内联)

  *.vue入口
    默认导出组件
  *.js/ts入口
    暴露为一个模块。在umd中使用window.yourLib.default获得。在commonjs中使用const myLib = require('myLib').default获得。
Web Components组件
  `vue-cli-service build --target wc --name my-element [entry]`。生成`my-element.js`。它是一个独立的js文件。所有文件都是内联。
  ```
  // usage
  <script src="https://unpkg.com/vue"></script>
  <script src="path/to/my-element.js"></script>
  <my-element></my-element>
  ```
  注册多个Web Components组件
    `vue-cli-service build --target wc --name foo 'src/components/*.vue'`
    --name 指定组件名前缀。最终结果：`foo-comp-name`。使用`<foo-comp-name />`
  异步Web Components组件
    `vue-cli-service build --target wc-async --name foo 'src/components/*.vue'`生成所有异步Web Components共享的运行时文件，并预先注册所有的自定义组件小入口文件。每个组件按需获取。
    ```
    <script src="https://unpkg.com/vue"></script>
    <script src="path/to/foo.min.js"></script>
    <!-- foo-one 的实现的 chunk 会在用到的时候自动获取 -->
    <foo-one></foo-one>
    ```
  构建时使用vuex
    - 入口是`entry-wc.js`，不是`main.js`
    - 在`App.vue`中初始化。
      ```
      import store form './store'
      export default {
        store,
        name: 'App',
        ...
      }
      ```

### 部署

`vue-cli-service build`生成的`dist/`可以部署在任意静态文件服务器上。注意保证`publicPath`

本地预览
  生成dist/index.html若直接打开会无法找到相关资源。以致不能运行。解决方法：
  - 修改publicPath为相对路由
  - 启动serve
    ```
    npm i -g serve
    serve -s dist
    ```
若使用history.pushState则需要后端做配置。
cors
pwa只能在https上工作。
npm
平台指南。列出很多云平台。












