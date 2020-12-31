# 介绍

可加载`*.vue`文件。具体加载原理可阅读`./vue-loder原理.md`。
大体的过程如下：
把`*.vue`文件中的`<template>``<script>``<style>`分别使用相应的loader处理。
支持ts/scss/less/stylus等。

# start

每个 vue 包的新版本发布时，一个相应版本的 vue-template-compiler 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 vue-loader 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 vue-template-compiler。
vue-loader中使用的`vue-template-comiler`是vue内置的。vue-loader加载`*.vue`时需要用到相应版本的vue-template-compiler。

## webpack配置

在vue-loader15.x.x后，在使用vue-loader时，需要在webpack的配置文件中使用vue-loader自带的插件（若没自带，则需要手动安装）。使用如下：

```
// before
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// now 2020/12/31
// 需要安装该包
const VueLoaderPlugin = require('vue-loader-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 会应用于*.js文件和*.vue文件的<script>
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 会应用于*.css文件和*.vue文件的<style>
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

# 处理资源路径

当 Vue Loader 编译单文件组件中的 `<template>` 块时，它也会将所有遇到的资源 URL 转换为 webpack 模块请求。

```
<img src="../image/first.png"/>
// =>
createElement('img', {
  attrs: {
    src: require('../image/first.png')
  }
})
```

## 转换规则

|开头|说明|使用方式|||
|-|-|-|-|-|
|/|绝对路径|原样使用|||
|.|相对路径|按路径查找|||
|~|模块依赖|从node_modules中找。|||
|@|模块依赖|在webpack的配置文件中为@设置别名。@vue/cli(or vue-cli)默认设置为`/src`|||

## 相关loader

|file-loader|url-loader|||
|-|-|-|-|
|-|基于file-loader|||
|-|小文件转换为base-64，大文件使用要file-loader|||
|可指定放置资源的位置|-|||
|可使用相对路径就近管理图片（等文件）||||
|不用担心部署时url的问题||||

# 使用预处理器

据 lang 特性以及 webpack 配置中的规则自动推断出要使用的 loader。
文档中要求使用lang指明使用的语法。我一般使用type.

## sass(sass/scss)
## less
## stylus
## postcss

在vue-loader15后不默认使用postcss。需要使用postcss-loader。

```
npm i -D postcss-loader
// webpack.config.js
{
  test: /\.css$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    'postcss-loader'
    }
  ]
}
```

## babel

```
npm i -D babel-core babel-loader

{
  test: /\.js?&/,
  laoder: 'babel-loader'
}
```
babel的配置在`.babelrc`或`babel-loader`.

## ts

```
npm i -D typescript ts-loader
// webpack.config.js
module.exports = {
  resolve: {
    // 将 `.ts` 添加为一个可解析的扩展名。
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      // ... 忽略其它规则
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  // ...plugin omitted
}
```
ts-loader的文档。

## pug

`*.pug`是一种模板文件。

|pug-loader|pug-plain-loader||
|-|-|-|
|返回模板函数|返回编译发的htm字符||

```
npm install -D pug pug-plain-loader

// *.vue
<template lang="pug">
div
  h1 string
</template>

// webpack.config.js -> module.rules
{
  test: /\.pug$/,
  oneOf: [
    // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
    {
      resourceQuery: /^\?vue/,
      use: ['pug-plain-loader']
    },
    // 这条规则应用到 JavaScript 内的 pug 导入
    {
      use: ['raw-loader', 'pug-plain-loader']
      // raw-loader 会破坏 Vue 组件内的用法。所以需要先用pug-plain-loader处理后再给raw-loader处理。
    }
  ]
}
```

# scoped css

当 `<style>` 标签有 scoped 属性时，CSS 会只作用于当前组件中的元素。

## 样式穿透

在`<style>`标签上使用了scoped。又想作用于其后代组件的样式。就需要使用样式穿透。
通过 v-html 创建的 DOM 内容不受 scoped 样式影响。

```
<style scoped>
.a >>> .b {...}
// or
.a /deep/ .b {...}
// or
.a ::v-deep .b {...}
</style>
```

# css modules

它是一个css模块化的解决方案。vue-loader集成了它。

## usage

```
// webpack.config.js
{
  module: {
    rules: [
      // ... 其它规则省略
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: true,
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      }
    ]
  }
}
// *.vue
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>
<style module>
// 这个 module 特性指引 Vue Loader 作为名为 $style 的计算属性，向组件注入 CSS Modules 局部对象。
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```

## 可选用法

```
// webpack.config.js -> module.rules
{
  test: /\.css$/,
  oneOf: [
    // 这里匹配 `<style module>`
    {
      resourceQuery: /module/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]'
          }
        }
      ]
    },
    // 这里匹配普通的 `<style>` 或 `<style scoped>`
    {
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }
  ]
}
// 和预处理器配合使用
// webpack.config.js -> module.rules
{
  test: /\.scss$/,
  use: [
    // css module在sass-loader / vue-style-loader之间
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { modules: true } // 都是设置options.modules: true
    },
    'sass-loader'
  ]
}
```

# 热重载

功能：在刷新页面时，更新了`*.vue`文件，则在浏览器中更新页面。
vue-loader提供了热重载的功能。它使用了`vue-style-loader`
默认是打开状态。

## 状态保留规则

- template 重新渲染组件实例并保留所有私有状态。
- script   销毁组件实例并重新创建。
- style    使用了`vue-style-loader`自行热重载

# 函数式组件

```
// 单文件中函数式组件的实现：
<template functional>
</template>

// 组件注册中函数式组件的实现：
const app = Vue.createApp({})
app.component('comp-a', {
  props: {...},
  render() {
    const {h} = Vue
    return h(tag, props, children)
  }
})
```
函数式组件最大的用途就是用它做中间件来实现render方法，下面是一个例子

# 自定义块

一般`*.vue`文件中会有三个标签：`template` `script` `style`。这些标签是vue-loader可处理的标签。
当有更多的标签时，它们就是自定义标签。这些标签不能被vue-loader处理，需要使用自定义loader处理。
```
// docs-loader.js
module.exports = function (source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.options.__docs = ${
        JSON.stringify(source)
      }
    }`,
    map
  )
}

// wepback.config.js
module.exports = {
  module: {
    rules: [
      {
        resourceQuery: /blockType=docs/,
        loader: require.resolve('./docs-loader.js')
      }
    ]
  }
}

<!-- ComponentB.vue -->
<template>
  <div>Hello</div>
</template>
<docs>
This is the documentation for component B.
</docs>
<!-- ComponentA.vue -->
<template>
  <div>
    <ComponentB/>
    <p>{{ docs }}</p>
  </div>
</template>
<script>
import ComponentB from './ComponentB.vue';
export default {
  components: { ComponentB },
  data () {
    return {
      docs: ComponentB.__docs
    }
  }
}
</script>
```

# css提取

请只在生产环境下使用 CSS 提取，这将便于你在开发环境下进行热重载。

```
// webpack4
npm install -D mini-css-extract-plugin
// webpack.config.js
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  // 其它选项...
  module: {
    rules: [
      // ... 忽略其它规则
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // ... 忽略 vue-loader 插件
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}

// webpack3
npm install -D extract-text-webpack-plugin
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  // 其它选项...
  module: {
    rules: [
      // ...其它规则忽略
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
        })
      }
    ]
  },
  plugins: [
    // ...vue-loader 插件忽略
    new ExtractTextPlugin("style.css")
  ]
}
```

# 代码校验

eslint-plugin-vue同时支持在 Vue 单文件组件的模板(template)和脚本(script)部分的代码校验。
```
// .eslintrc.js
module.exports = {
  extends: [
    "plugin:vue/essential"
  ]
}
// 然后在termial中运行
eslint --ext js,vue MyComp.vue
```

```
npm i -D eslint eslint-loader
// webpack.config.js
module.exports = {
  // ... 其它选项
  module: {
    rules: [
      {
        enforce: 'pre', // 请确保它是作为一个 pre-loader 运用的：
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

stylelint 支持在 Vue 单文件组件的样式(style)部分的代码校验。
```
// 正常配置stylelink后在终端运行
stylelint MyComponent.vue
```

```
npm install -D stylelint-webpack-plugin
// webpack.config.js
const StyleLintPlugin = require('stylelint-webpack-plugin');
module.exports = {
  // ... 其它选项
  plugins: [
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    })
  ]
}
```

## usage

# 选项

以下选项用于webpack.config.js里的vue-loader的options。

## transformAssetUrls

指明把哪些标签的哪些属性转换为require。

```
// 默认设置
{
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: ['xlink:href', 'href'],
  use: ['xlink:href', 'href']
}
```

## compiler

覆写用来编译单文件组件中 `<template>` 块的默认编译器。
默认值: require('vue-template-compiler')

## compilerOptions

板编译器的选项

## transpileOptions

为渲染函数的生成码配置从 ES2015+ 到 ES5 的转译选项。

## optimizeSSR

是否开启服务端渲染。
开启 Vue 2.4 服务端渲染的编译优化之后.
因为该渲染函数只能用于服务端渲染，而不能用于客户端渲染或测试环境。

## hotReload

热重载

## productionMode

强制指定为生产环境，

## shadowMode

编译用于 Shadow DOM 内部的组件。
boolean

## cacheDirectory / cacheIdentifier

当这两个选项同时被设置时，开启基于文件系统的模板编译缓存 (需要在工程里安装 cache-loader)。

## prettify

## exposeFilename

# 测试

@vue/test-utils
mocha-webpack
jest
