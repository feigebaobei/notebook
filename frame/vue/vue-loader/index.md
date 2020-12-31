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

# title
# title
# title
# title
# title
# title
# title
# title