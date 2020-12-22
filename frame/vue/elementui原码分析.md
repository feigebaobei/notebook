# title

在项目创建了一个脚本文件`rename.js`，它可以批量把element中的名称改为cars的名称。
使用代码做重复的工作比手动做重复的工作好多了。

# 实现原理

它是基于element ui开发的。

## element的实现原理

### 丰富的feature

分成了 6 大类，分别是基础组件、表单类组件、数据类组件、提示类组件、导航类组件和其它类型组件。

### 自定义主题

element-ui 组件的样式、公共样式都在 packages/theme-chalk 文件中。

### 国际化

element-ui 的文档和 demo 是融为一体的。
element-ui 组件库的语言包在 src/locale/lang 目录下。
在组中使用`t('el.colorpicker.confirm')`。
t方法在`src/mixins/locale.js`
没有语义的方法名不好。
在`src/locale/index.js`里定义t方法。使用`i18nHandler`兼容别的i18n库。使用`use`安装指定的i18n。

### 文档 & demo

当我们在 element-ui 工程下运行 npm run dev 的时候，会启动它的开发调试模式。
它会运行。
```
"bootstrap": "yarn || npm i",
// 安装依赖
"build:file": "node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js",
// iconInit    初始化icon
// build-entry 输出官网的目录文件
// i18n        生成i18n的文件
// version     生成版本文件
"dev": "npm run bootstrap && npm run build:file && cross-env NODE_ENV=development webpack-dev-server --config build/webpack.demo.js & node build/bin/template.js",
// webpack.demo.js webpack的配置文件
// template.js     监听模板文件变化
```
处理md文件时使用了`build/markdown-loader/index.js`把md处理为html再处理为vue，然后给vue-loader处理。

### 安装 & 引入

支持 npm 和 CDN 2 种安装方式。
CDN 安装方式有它的好处，不需要构建工具，开箱即用，但缺点也很明显，全量引入了所有组件，体积非常大。
npm 安装，可支持完整引入和部分引入。
```
// .babelrc
{
  ...
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
element解决了组件重复加载的问题，未解决样式重复加载的问题。使用后编译的思想可解决该问题。

### 工程化

首先是开发阶段，为了保证大家代码风格的一致性，使用了 ESLint。
利用模块化开发的思想把组件依赖的一些公共模块放在了 src 目录，并依据功能拆分出 directives、locale、mixins、transitions、utils 等模块。
其次是测试方面，使用了 karma 测试框架，为每一个组件编写了单元测试，并且利用 Travis CI 集成了测试。
接着是构建方面，element-ui 把多个script编写在一起。
部署方面，element-ui 也把多个script编写在一起。
