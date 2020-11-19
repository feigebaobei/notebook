# 概念

4个核心概念

- entry
- output
- loader
- plugins

在命令行中使用配置项，有时更灵活。
```
// demo
webpack --mode=production --module-bind 'css=style-loader!css-loader'
```
webpack.config.js是webpack的配置文件。

```
// demo
module.exports = {
  entry: './src/app.js',
  // or
  // entry: {pageOne: './src/po.js', pageTwo: './src/pt.js'},
  output: {
    filename: 'bundle.js',
    path: __dirname + '/ dist'
    // or
    // filename: '[name].js',
    // filename: '[name][hash].js',
    // publicPath: '[filedir]',
    // path: path.resolve(__dirname, 'dist'), // 需要引入path模块。
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {modules: true}
          }
        ]
      }
    ],
  }
  plugins: {},
  mode: 'production', // or development | none
}
```
在 webpack 打包应用程序时，你可以选择各种模块语法风格，包括 ES6, CommonJS 和 AMD。
webpack将动态打包所有依赖项（创建所谓的依赖图）明确每个模块的依赖项，不会打包未使用的模块。

![webpack的生命周期](https://img.alicdn.com/tps/TB1GVGFNXXXXXaTapXXXXXXXXXX-4436-4244.jpg)

### entry

告诉webpack从哪儿开始打包。
entry: string|Array<string>
可以有多个入口。

### output

打包后的输出位置。
只能有一个出口。

```
filename: 'fn.js'
path: 'f/path'
```

### loader

加载非js模块加载器。
```
test: 检测文件是哪种文件。
use: 指定loader
```

```
// demo
module.exports = {
  output: {
    filename: 'xx.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

- 支持链式传递。
- 可同步，可异步。
- 运行在node.js中.
- 接收查询参数。
- 可使用options
- 在package.json中设置loader字段，可以使用npm模块导出为loader。
- plugin可以为loader添加更多特性。
- loader可以产生额外的任意文件


一般loader使用`--save-dev`安装。
常用的loader
|||||
|-|-|-|-|
|css-loader||||
|style-loader||||
|ts-loader||||
|css-loader||||
|css-loader||||
|css-loader||||
|css-loader||||
|css-loader||||

### plugins

webpack的plugin是一个具有`apply`属性的js对象。该属性会被webpack compiler调用。compiler可在整个编译生命周期访问。
可以在一个配置文件中多次使用同一个插件。只需要创建该插件的实例，再使用相应的option.

```
// demo
// define
const pluginName = 'string'
class pn {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('from string')
    })
  }
}
```

```
// usage demo
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ...,
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```

### mode

```
module.exports = {
  mode: 'production' // or development | none
}
```

## configuration

它是一个标准的js文件，可导出对象，是一个标准的commonjs模块。

## modules

就是模块。（没法解释）

## module resolution

可以解析：绝对路径、相对路径、模块路径。

## dependency graph

模块间的依赖关系。

## manifest

不会

## targets

构建目标。可选：`web`(默认),`node`。
string类型。
不支持多值。

## hot module replacement

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块。

在应用程序中：
1. 应用程序代码要求hmr runtime检查更新。
2. hmr runtime（异步）下载更新，然后通知应用程序代码。
3. 应用程序代码要求hmr runtime应用更新。
4. hmr runtime（同步）应用更新。

在编译器中：
编译器发出’update‘。更新manifest(json)/chunk(js).
json文件是保存模块id与chunk id之间的对应

在模块中：
hmr功能是可选功能。若在模块中实现了hmr功能，则更新当前模块。否则会冒泡，更新整个模块树。

在hmr runtime中：
。。。

# 配置

有2种方法设置配置对象。1. 终端。 2. node.js

```
// demo
const path = require('path');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  mode: "production", // enable many optimizations for production builds
  mode: "development", // enabled useful tools for development
  mode: "none", // no defaults
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: "./app/entry", // string | object | array
  entry: ["./app/entry1", "./app/entry2"],
  entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  // 这里应用程序开始执行
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: "bundle.js", // string
    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
    filename: "[chunkhash].js", // 用于长效缓存
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    publicPath: "/assets/", // string
    publicPath: "",
    publicPath: "https://cdn.example.com/",
    // 输出解析文件的目录，url 相对于 HTML 页面

    library: "MyLibrary", // string,
    // 导出库(exported library)的名称

    libraryTarget: "umd", // 通用模块定义
        libraryTarget: "umd2", // 通用模块定义
        libraryTarget: "commonjs2", // exported with module.exports
        libraryTarget: "commonjs-module", // 使用 module.exports 导出
        libraryTarget: "commonjs", // 作为 exports 的属性导出
        libraryTarget: "amd", // 使用 AMD 定义方法来定义
        libraryTarget: "this", // 在 this 上设置属性
        libraryTarget: "var", // 变量定义于根作用域下
        libraryTarget: "assign", // 盲分配(blind assignment)
        libraryTarget: "window", // 在 window 对象上设置属性
        libraryTarget: "global", // property set to global object
        libraryTarget: "jsonp", // jsonp wrapper
    // 导出库(exported library)的类型

    /* 高级输出配置（点击显示） */

    pathinfo: true, // boolean
    // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。

    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)
    // 「附加分块(additional chunk)」的文件名模板

    jsonpFunction: "myWebpackJsonp", // string
    // 用于加载分块的 JSONP 函数名

    sourceMapFilename: "[file].map", // string
    sourceMapFilename: "sourcemaps/[file].map", // string
    // 「source map 位置」的文件名模板

    devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
    // 「devtool 中模块」的文件名模板

    devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
    // 「devtool 中模块」的文件名模板（用于冲突）

    umdNamedDefine: true, // boolean
    // 在 UMD 库中使用命名的 AMD 模块

    crossOriginLoading: "use-credentials", // 枚举
    crossOriginLoading: "anonymous",
    crossOriginLoading: false,
    // 指定运行时如何发出跨域请求问题

    /* 专家级输出配置（自行承担风险） */

    devtoolLineToLine: {
      test: /\.jsx$/
    },
    // 为这些模块使用 1:1 映射 SourceMaps（快速）

    hotUpdateMainFilename: "[hash].hot-update.json", // string
    // 「HMR 清单」的文件名模板

    hotUpdateChunkFilename: "[id].[hash].hot-update.js", // string
    // 「HMR 分块」的文件名模板

    sourcePrefix: "\t", // string
    // 包内前置式模块资源具有更好可读性
  },

  module: {
    // 关于模块配置

    rules: [
      // 模块规则（配置 loader、解析器等选项）

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include

        issuer: { test, include, exclude },
        // issuer 条件（导入源）

        enforce: "pre",
        enforce: "post",
        // 标识应用这些规则，即使规则覆盖（高级选项）

        loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。

        options: {
          presets: ["es2015"]
        },
        // loader 的可选项
      },

      {
        test: /\.html$/,
        test: "\.html$"

        use: [
          // 应用多个 loader 和选项
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },

      { oneOf: [ /* rules */ ] },
      // 只使用这些嵌套规则之一

      { rules: [ /* rules */ ] },
      // 使用所有这些嵌套规则（合并可用条件）

      { resource: { and: [ /* 条件 */ ] } },
      // 仅当所有条件都匹配时才匹配

      { resource: { or: [ /* 条件 */ ] } },
      { resource: [ /* 条件 */ ] },
      // 任意条件匹配时匹配（默认为数组）

      { resource: { not: /* 条件 */ } }
      // 条件不匹配时匹配
    ],

    /* 高级模块配置（点击展示） */

    noParse: [
      /special-library\.js$/
    ],
    // 不解析这里的模块

    unknownContextRequest: ".",
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: ".",
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    // specifies default behavior for dynamic requests
  },

  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录

    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名

    alias: {
      // 模块别名列表

      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"

      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"

      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */
    alias: [
      {
        name: "module",
        // 旧的请求

        alias: "new-module",
        // 新的请求

        onlyModule: true
        // 如果为 true，只有 "module" 是别名
        // 如果为 false，"module/inner/path" 也是别名
      }
    ],

    /* 高级解析选项（点击展示） */

    symlinks: true,
    // 遵循符号链接(symlinks)到新位置

    descriptionFiles: ["package.json"],
    // 从 package 描述中读取的文件

    mainFields: ["main"],
    // 从描述文件中读取的属性
    // 当请求文件夹时

    aliasFields: ["browser"],
    // 从描述文件中读取的属性
    // 以对此 package 的请求起别名

    enforceExtension: false,
    // 如果为 true，请求必不包括扩展名
    // 如果为 false，请求可以包括扩展名

    moduleExtensions: ["-module"],
    enforceModuleExtension: false,
    // 类似 extensions/enforceExtension，但是用模块名替换文件

    unsafeCache: true,
    unsafeCache: {},
    // 为解析的请求启用缓存
    // 这是不安全，因为文件夹结构可能会改动
    // 但是性能改善是很大的

    cachePredicate: (path, request) => true,
    // predicate function which selects requests for caching

    plugins: [
      // ...
    ]
    // 应用于解析器的附加插件
  },

  performance: {
    hints: "warning", // 枚举
    hints: "error", // 性能提示中抛出错误
    hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: "source-map", // enum
  devtool: "inline-source-map", // 嵌入到源文件中
  devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
  devtool: "hidden-source-map", // SourceMap 不在源文件中引用
  devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
  devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
  devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  target: "web", // 枚举
  target: "webworker", // WebWorker
  target: "node", // node.js 通过 require
  target: "async-node", // Node.js 通过 fs and vm
  target: "node-webkit", // nw.js
  target: "electron-main", // electron，主进程(main process)
  target: "electron-renderer", // electron，渲染进程(renderer process)
  target: (compiler) => { /* ... */ }, // 自定义
  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

  externals: ["react", /^@angular\//],
  externals: "react", // string（精确匹配）
  externals: /^[a-z\-]+($|\/)/, // 正则
  externals: { // 对象
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  externals: (request) => { /* ... */ return "commonjs " + request }
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  stats: "errors-only",
  stats: { //object
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
    // ...
  },
  // 精确控制要显示的 bundle 信息

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  plugins: [
    // ...
  ],
  // 附加插件列表


  /* 高级配置（点击展示） */

  resolveLoader: { /* 等同于 resolve */ }
  // 独立解析选项的 loader

  parallelism: 1, // number
  // 限制并行处理模块的数量

  profile: true, // boolean
  // 捕获时机信息

  bail: true, //boolean
  // 在第一个错误出错时抛出，而不是无视错误。

  cache: false, // boolean
  // 禁用/启用缓存

  watch: true, // boolean
  // 启用观察

  watchOptions: {
    aggregateTimeout: 1000, // in ms
    // 将多个更改聚合到单个重构建(rebuild)

    poll: true,
    poll: 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares（译者注：Network FileSystem，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
  },

  node: {
    // Polyfills and mocks to run Node.js-
    // environment code in non-Node environments.

    console: false, // boolean | "mock"
    global: true, // boolean | "mock"
    process: true, // boolean
    __filename: "mock", // boolean | "mock"
    __dirname: "mock", // boolean | "mock"
    Buffer: true, // boolean | "mock"
    setImmediate: true // boolean | "mock" | "empty"
  },

  recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
  recordsOutputPath: path.resolve(__dirname, "build/records.json"),
  // TODO

}
```

## configuration languages
### typescript
```
npm install --save-dev typescript ts-node @types/node @types/webpack

```
```
// webpack.config.ts
import path from 'path';
import webpack from 'webpack';
const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
export default config;
```

### coffeescript

```
npm install --save-dev coffee-script
```

```
// webpack.config.coffee
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')
config =
  mode: 'production'
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new (webpack.optimize.UglifyJsPlugin)
    new HtmlWebpackPlugin(template: './src/index.html')
  ]
module.exports = config
```

### babel and jsx
```
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

```
// .babelrc
{
  "presets": [ "es2015" ]
}
```
```
// webpack.config.babel.js
import jsxobj from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <uglify-js opts={{
        compression: true,
        mangle: false
      }} />
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);

```

## configuration types

### export funciton

```
module.exports = (env, args) => {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    plugins: [
      new webpack.optimize.UglifiJsPlugin({
        compress: args['optimize-minimize']
      })
    ]
  }
}
```

### export promise

用于异步加载需要的配置项。
```
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        ...
      })
    }, 1000)
  })
}
```

### export more config object

```
module.exports = [
  {
    entry: './src/app.js',
    output: './dist/app.js',
    mode: 'production'
  },
  {
    entry: './src/app2.js',
    output: './dist/app2.js',
    mode: 'development'
  }
]
```

## entry and context

### context

基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader

### entry

几个入口就是几个页面应用。

#### 命名

当entry的值是数组时，chunk会被命名为main。
当entry的值是对象时，每个key都会对应一个chunk。

#### 动态入口

```
entry: () => './demo'
// or
entry: () => new Promise((s, j) => s(['./demo0', './demo1']))
```
## output

把使用webpack打包后的东西输出到哪里。

### output.auxiliaryComment

string object
在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 libraryTarget 每种类型都插入相同的注释，将 auxiliaryComment 设置为一个字符串：

### output.auxiliaryComment
### output.chunkFilename
非入口chunk的名称
### output.chunkLoadTimeout
### output.crossOriginLoading
### output.jsonpScriptType
### output.devtoolFallbackModuleFilenameTemplate
### output.devtollLineToLine
### output.devtoolModuleFilenameTemplate
### output.devtoolNamespace
### output.filename

每个bundle的名称。会被放在output.path里。
```
// 单个入口
filename: 'bundle.js'
// 多个入口
filename: '[name].bundle.js' // 使用入口名称
filename: '[id].bundle.js' // 使用chunk id
filename: '[name].[hash].bundle.js' // 使用每次构建过程中chunk id的hash
filename: '[chunkhash].bundle.js' // 使用每个chunk内容的hash
```

### output.hashDigest

生成hash后使用的编码格式，默认是'hex'。

### output.hashDigestLength

散列摘要的前缀长度。默认为20.

### output.hashFunction

默认md5

### output.hashSalt

一个可选的加盐值。

### output.hotUpdateChunkFilename
### output.hotUpdateFunction
### output.hotUpdateMainFilename
### output.jsonpFunction
### output.library
### output.libraryExport
### output.libraryTarget
### 暴露为一个变量
### 通过在对象上赋值暴露
### 模块定义系统
### 其他Targets
### output.path

一个绝对路径。

### output.pathinfo
### output.publicPath

默认为''

### output.sourceMapFilename

默认为'[file].map'

### output.sourcePrefix
### output.strictModuleExceptionHandling
### output.umdNamedDefine
## module

### module.noParse
RegExp|[RegExp]|function
指定不解析的模块。
### module.rules

处理模块的规则。

### Rule
包括三部分：条件、结果、嵌套规则。
#### condition

test/include/exclude/resource
issuer

#### result

loader/options/use
parser

#### nested rule

##### rule.enforce
##### rule.exclude
##### rule.include
##### rule.issuer
##### rule.loader
##### rule.loaders
##### rule.oneOf
##### rule.options
##### rule.query
##### rule.parser
##### rule.resource
##### rule.resourceQuery
##### rule.rules
##### rule.test
##### rule.use

#### UseEntry
#### 模块上下文
## resolve

设置模块如何被解析。

### resolve.alias

使用import / require时在路径部分使用别名会更简单。

```
// defind
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities'),
  Templates: path.resolve(__dirname, 'src/templates')
}
// use
import Utility from 'Utilities/utility'
```

### resolve.aliasFields
### resolve.cacheWithContext
### resolve.descriptionFiles
用于描述的json文件。
### resolve.enforceExtension
是否允许解析无扩展名文件。
### resolve.enforceModuleExtension
对模块是否需要使用的扩展。
### resolve.extensions
自动解析确定的扩展。默认值为
`extensions: ['.js', '.json']`
### resolve.mainFields
### resolve.mainFiles
### resolve.modules
### resolve.unsafeCache
### resolve.plugins
### resolve.symlinks
### resolve.cachePredicate
### resolveLoader
### resolveLoader.moduleExtensions
## plugins
Array
使用若干插件。
## devServer

webpack-dev-server能够用于快速开发应用程序。
使用webpack的开发服务提供在线加载。

### tutorial

```
// install
npm i -D webpack-dev-server // 也可以全局安装
// 所在目录
node_modules/.bin/webpack-dev-server
// 定义在脚本中
"scripts": {
  "dev": "webpack-dev-server"
}
npm run dev
// result of run
localhost:8080
```
webpack-dev-server会把代码转换为浏览器支持的es5.

### devServer.after
当服务内所有中间件运行完后运行的自定义方法。
```
after(app) {
  ...
}
```
### devServer.allowedHosts
array
允许访问dev服务的服务。
### devServer.before
```
before(app) {
  app.get('/some/path', (req, res) => {
    res.json({custom: 'response'})
  })
}
```
### devServer.bonjour
### devServer.clientLogLevel
String
设置哪些信息在开发者工具的控制台显露消息。
```
clientLogLevel: 'info' // default
                'none' | 'error' | 'warning'
```
### devServer.color
boolean
在console输出时是否使用颜色。
### devServer.compress
在服务中是否使用压缩。（gzip）
### devServer.contentBase
boolean string array
当需要提供静态文件时，需要告诉浏览器在哪里提供内容。
```
// 默认为当前工作目录。
contentBase: path.resolve(__dirname, 'public')
contentBase: false // 禁用
```
### devServer.disableHostCheck
boolean
### devServer.filename
### devServer.headers
所有响应中添加的首部内容。
### devServer.historyApiFallback
当使用html5 history api时，任意404响应是否替换为inde.html.
```
historyApiFallback: true
historyApiFallback: {

  rewrites: [
    {
      from: /^\/$/,
      to: '/view/landing.html'
    },
    {
      from: /^\/subpage/,
      to: '/view/subpage.html'
    }
  ]
}
```
### devServer.host
### devServer.hot
是否启用模块热更新
### devServer.hotOnly
### devServer.https

需要提供https服务时需要设置该字段。
```
https: {
  key: fs.readFileSync('/path/ot/server.key'),
  cert: fs.readFileSync('/path/ot/server.cert'),
  ca: fs.readFileSync('/path/ot/ca.pem')
}
```

### devServer.index
### devServer.info - cli only
### devServer.inline

boolean
是否把处理实时重载的代码插入到你的包中。

### devServer.lazy

只有在请求时才编译包。

### devServer.noInfo
### devServer.open
### devServer.openPage
### devServer.overlay

当出现编译error/warning时，是否在浏览器中全屏显示遮罩层。

### devServer.pfx
### devServer.pfxPassphrase
### devServer.port
### devServer.proxy
### devServer.progress - cli only

boolean
是否把运行进度输出到控制台。

### devServer.public
### devServer.publicPath

此目录下的文件可在浏览器中访问。

### devServer.quiet

除了启动信息以外，在控制不打印任何信息。

### devServer.setup
在这里，您可以访问Express app对象并向其添加您自己的定制中间件。
### devServer.socket
### devServer.staticOptions
### devServer.stats
### devServer.stdin - cli only
### devServer.useLocalIp
是否允许浏览器使用本地ip打开。
### devServer.watchContentBase
### devServer.watchOptions
## devtool

是否生成、如何生成source map.

## targets

为webpack设置一种目标指定的一个环境。
当需要多个环境时，需要打包多次。

||||||
|-|-|-|-|-|
|async-node|||||
|node|||||
|node-webkit|||||
|web|||||
|webworker|||||

## watch / watchOptions

webpack 可以监听文件变化，当它们修改后会重新编译。这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。

```
watch: false,
watchOptions: {
  aggredateTimeout: 300,
  poll: 1000
}
```
### watchOptions.aggregateTimeout
当文件变更后多长时间开始重新打包。
### watchOptions.ignored
不监听
### watchOptions.poll
轮询时间。
### info-verbosity
string: none info verbose
设置生命周期消息的详细程度。
### 故障排除
#### 发现修改，但未处理
#### 没有足够的文件参察者
## externals
string array object function
把指定的包不打包到bundle中。常用于library.
## performance
设置如何展示性能提示。
### performance.hints
flase | 'error' | 'warning'

### performance.maxEntrypointSize
根据入口起点的最大体积，处理提示。
### performance.maxAssetSize
根据单个资源体积，处理性能提示。
### performance.assetFilter
## node
## stats
得到一部分打包时的信息。
## other options
### amd
指明哪些模块是使用amd规范写的。
### bail
当打包失败时是否继续打包。
### cache
缓存生成的webpack模块、chunk.
### loader
### profile
### recordsPath
设置记录打包时的记录文件及目录。
### recordsInputPath
### recordsOutputPath

# api

## command line interface
## stats data
包含统计数据的文件
常用于分析应用的依赖图表、优化编译速度。

```
{
  "version": "1.4.13", // 用来编译的 webpack 的版本
  "hash": "11593e3b3ac85436984a", // 编译使用的 hash
  "time": 2469, // 编译耗时 (ms)
  "filteredModules": 0, // 当 `exclude`传入`toJson` 函数时，统计被无视的模块的数量
  "outputPath": "/", // path to webpack 输出目录的 path 路径
  "assetsByChunkName": {
    // 用作映射的 chunk 的名称
    "main": "web.js?h=11593e3b3ac85436984a",
    "named-chunk": "named-chunk.web.js",
    "other-chunk": [
      "other-chunk.js",
      "other-chunk.css"
    ]
  },
  "assets": [
    {
      "chunkNames": [], // 这个 asset 包含的 chunk
      "chunks": [ 10, 6 ], // 这个 asset 包含的 chunk 的 id
      "emitted": true, // 表示这个 asset 是否会让它输出到 output 目录
      "name": "10.web.js", // 输出的文件名
      "size": 1058 // 文件的大小
    }

  ],
  "chunks": [
    {
      "entry": true, // 表示这个 chunk 是否包含 webpack 的运行时
      "files": [
        // 一个包含这个 chunk 的文件名的数组
      ],
      "filteredModules": 0, // 见上文的 结构
      "id": 0, // 这个 chunk 的id
      "initial": true, // 表示这个 chunk 是开始就要加载还是 懒加载(lazy-loading)
      "modules": [
        // 模块对象 (module objects)的数组
        "web.js?h=11593e3b3ac85436984a"
      ],
      "names": [
        // 包含在这个 chunk 内的 chunk 的名字的数组
      ],
      "origins": [
        {
          "loc": "", // 具体是哪行生成了这个chunk
          "module": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的位置
          "moduleId": 0, // 模块的ID
          "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
          "moduleName": "./lib/index.web.js", // 模块的相对地址
          "name": "main", // chunk的名称
          "reasons": [
            // 模块对象中`reason`的数组
          ]
        }
      ],
      "parents": [], // 父 chunk 的 ids
      "rendered": true, // 表示这个 chunk 是否会参与进编译
      "size": 188057 // chunk 的大小(byte)
    }
  ],
  "modules": [
    {
      "assets": [
        // asset对象 (asset objects)的数组
      ],
      "built": true, // 表示这个模块会参与 Loaders , 解析, 并被编译
      "cacheable": true, // 表示这个模块是否会被缓存
      "chunks": [
        // 包含这个模块的 chunks 的 id
      ],
      "errors": 0, // 处理这个模块发现的错误的数量
      "failed": false, // 编译是否失败
      "id": 0, // 这个模块的ID (类似于 `module.id`)
      "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // webpack内部使用的唯一的标识
      "name": "./lib/index.web.js", // 实际文件的地址
      "optional": false, // 每一个对这个模块的请求都会包裹在 `try... catch` 内 (与ESM无关)
      "prefetched": false, // 表示这个模块是否会被 prefetched
      "profile": {
        // 有关 `--profile` flag 的这个模块特有的编译数据 (ms)
        "building": 73, // 载入和解析
        "dependencies": 242, // 编译依赖
        "factory": 11 // 解决依赖
      },
      "reasons": [
        {
          "loc": "33:24-93", // 导致这个被加入依赖图标的代码行数
          "module": "./lib/index.web.js", // 所基于模块的相对地址 context
          "moduleId": 0, // 模块的 ID
          "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
          "moduleName": "./lib/index.web.js", // 可读性更好的模块名称 (用于 "更好的打印 (pretty-printing)")
          "type": "require.context", // 使用的请求的种类 (type of request)
          "userRequest": "../../cases" // 用来 `import` 或者 `require` 的源字符串
        }
      ],
      "size": 3593, // 预估模块的大小 (byte)
      "source": "// Should not break it...\r\nif(typeof...", // 字符串化的输入
      "warnings": 0 // 处理模块时警告的数量
    }
  ],
  "errors": [
    // 错误字符串 (error string) 的数组
  ],
  "warnings": [
    // 警告字符串 (warning string) 的数组
  ]
}
```

## node.js api

```
// install
npm i -D webpack
// usa
const webpack = require('webpack')
import webpack from 'webpack'
webpack({
  // 配置对象
}, (err, stats) => { // callback
  // stat
})
```
webpack()需要2个参数。第一个参数是配置对象。第二个参数是回调函数。
当只有配置对象时，会返回webpack copiler实例.
当传入2个参数时，会立即执行webpack.

### compiler instance
compiler实例具有2个方法属性。`run(cb) / watch(watchOptions, handler)`.
#### run()
开始执行编译工作，完成后执行cb，记录下概括信息。
```
const compiler = webpack({...})
compiler.run((err, stats) => {...})
```
#### watch
触发webpack执行器，并监听变更。若有变更，则重新编译。
```
const watching = compiler.watch({...}, (err, stats) => {...})
// close watch
watching.close(() => {...})
// invalidate watching
watching.invalidate()
```
具体配置项目可参考watchOptions.
### stats object

获取编译过程中的信息。
```
stats.hasErrors() // 是否有错误
stats.hasWarning()
stats.toJson(options)
stats.toString(options)
```
具体配置项目可参考stats

### MultiCompiler

```
// 给单个compiler设置多个配置项。每个配置项完成编译后再调用cb.
webpack([
  {entry: './index1.js', output: {filname: 'bundle1.js'}},
  {entry: './index2.js', output: {filname: 'bundle2.js'}}
], (err, stats) => {...})
```

### error handling

```
webpack({
  // 配置对象
}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  // 记录结果...
});

```
### custom file systems

## hot module replacement

若使用HotModuleReplacementPlugin启用了hmr。则它的接口会暴露在module.hot属性下。用户在使用hmr前，先检查该属性。
```
if (module.hot) {...}
```

### module.hot.accept
```
module.hot.accept(dependencies, cb) // 更新dependencies后执行cb
```
### module.hot.decline
### module.hot.disponse
### module.hot.removeDisposeHandler
### module.hot.status
|||||
|-|-|-|-|
|idle||||
|check||||
|prepare||||
|ready||||
|dispose||||
|apply||||
|abort||||
|fail||||
### module.hot.check
### module.hot.apply
### module.hot.addStatusHandler
### module.hot.removeStatusHandler

## loader api

所谓 loader 只是一个导出为函数的 JavaScript 模块。loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。函数的 this 上下文将由 webpack 填充，并且 loader runner 具有一些有用方法，可以使 loader 改变为异步调用方式，或者获取 query 参数。

### this（loader的上下文）

||||||
|-|-|-|-|-|
|version|||||
|context|||||
|request|||||
|query|||||
|callback|||||
|async|||||
|data|||||
|cacheable|||||
|laoders|||||
|loaderIndex|||||
|resource|||||
|resourcePath|||||
|resourceQuery|||||
|target|||||
|webpack|||||
|sourceMap|||||
|emitWarning|||||
|loadModule|||||
|resolve|||||
|addDependency|||||
|addContextDependency|||||
|clearDependencies|||||
|emitFile|||||
|fs|||||

## module methods

### es6
动态地加载模块。调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
```
if (module.hot) {
  import('lodash').then(_ => {...})
}
```
### commonjs
### amd
### labeled modules
### webpack

## module variables

webpack在编译过程中的变量。

module.loaded (nodejs)
是否完成加载。
module.hot(webpack特有变量)
是否启用hmr.
module.id (commonjs)
模块id
module.exports (commonjs)
exports (commonjs)
global (nodejs)
process (nodejs)
`__dirname` (nodejs)
`__filename` (nodejs)
`__resourceQuery` (webpack特有变量)
`__webpack_public_path__` (webpack特有变量)
<=>output.publicPath
`__webpack_require__` (webpack特有变量)
`__webpack_chunk_load__` (webpack特有变量)
内部chunk载入函数。参数是chunkId / cb(require)
`__webpack_modules__` (webpack特有变量)
模块的内部对象
`__webpack_hash__` (webpack特有变量)
`__non_webpack_require__` (webpack特有变量)
`DEBUG` (webpack特有变量)

## plugin api

插件被钩入到每个编译过程中。可访问compiler对象，还可以访问compilation对象。

### tapable

为插件提供持钩的包。
```
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParalleHook,
  AsyncParalleBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
  } = require('tapable')
```

### plugin types
### custom hooks
## compiler hook

compiler模块是基于tapable模块的。

### watching
### 相关钩子

```
compiler.hooks.someHook.tap(...)
```
entryOption
afterPlugins
afterResolvers
environment
afterEnvironment
beforeRun
run
watchRun
normalModuleFactory
contextModuleFactory
beforeCompile
compile
thisCompilation
compilation
make
afterCompile
shouldEmit
needAdditionalPass
emit
afterEmit
done
failed
invalid
watchClose

## compilation hook
## resolver

基于tapable模块。

## parser

# 指南
## install

需要安装node.js。
最好是lts版的node.js。

### local install (recommend)

```
npm i --save-dev webpack
npm i --save-dev webpack@<version>

// 若需要使用webpack4+则还需要安装cli
npm i --save-dev webpack-cli
```

### global install

```
npm i -g webpack
```
### install laster version

```
npm i webapck@beta
npm i webapck/webpack#<tagname/branchname>
```

## start

安装好就可以使用`cli`/`api`了。

```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

创建一个如下的项目。
```
webpack-demo
|- package.json
|- webpack.config.js
|- dist
    |- index.html
|- src
    |- index.js
```
使用npm安装依赖。
在webpack4.+中可以不指定webpack.config.js。
webpack.config.js中可以指定被修改过的webpack的默认配置项。
打包：
`npx webpack`

## 管理资源
## 管理输出
## 开发

开发工具3种
### webpack --watch
当发现模块有变更时重新打包。
经测试发现打包后没有index.html
### webpack-dev-serve
平时使用最多。
webpack4/5与webpack-dev-server3+不兼容。
### webpack-dev-middleware
在本地启动个node服务。
经测试：可以在模块变更后重新打包。
需要在浏览器中手动刷新。

## 模块热替换

### 启用hmr

webpack.config.js
```
module.exports = {
  entry: {},
  output: {},
  devtool: '',
  devServer: {
    ...
    hot: true
  },
  plugin: [
    // new webpack.NameModulesPlugin(),
    new webpack.HotModuleReplacePlugin()
  ],
}
```

index.js
```
...
if (module.hot) {
  module.hot.accept('./print.js', () => {
    fn()
  })
}
```
### 通过node.js api调用hmr

new webpackDevServer(compiler, options)
在options中设置devServer的配置项。

```
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config.js')
let compiler = webpack(config)
let options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
}
webpackDevServer.addDevServerEntrypoints(config, options)
const server = new webpackDevServer(compiler, options)
server.listen(5000, 'localhost', () => {
  ...
})
```

### hmr css
### other code and frame
## tree shaking

不打包未引用的代码。

## 生产环境构建

生产环境、开发环境使用不同的配置文件。
在一个基本配置文件上扩展出2个环境的配置文件。

```
npm i -D webpack-merge
```

webpack.base.js
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'string'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
webpack.prod.js
```
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.base.js')
module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
})
```
webpack.dev.js
```
const merge = require('webpack-merge')
const common = require('./webpack.base.js')
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: [
    contentBase: './dist',
    hot: true
  ]
})
```
package.json
```
"script": {
  ...
  "start": "webpack-dev-server --open --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js"
}
```
## 代码分离

### 1. 多入口
### 2. 提取公共部分 CommonsChunkPlugin
webpack.config.js
```
entry: {
  one: '',
  two: '',
  ...
}
plugins: [
  ...
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  })
]
```
### 3. 动态导入。使用模块的内联函数。

```
function () {
  return import().then(() => {...}).catch(() => {...})
}
```

### bundle analysis

https://github.com/webpack/analyse

```
webpack --profile --json > stats.json

grunt dev
grunt
grunt deploy
```

## 懒加载
## 缓存

webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

### output filenames
推荐使用
```
output: {
  ...
  filename: '[name].[chunkhash].js'
}
```
### extracting boilerplate

先提取单独的vender，再提取manifest。
```
enter: {
  ...
  vender: ['lodash'],
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vender'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  })
]
```

### module identifiers

main bundle 会随着自身的新增内容的修改，而发生变化。
vendor bundle 会随着自身的 module.id 的修改，而发生变化。
manifest bundle 会因为当前包含一个新模块的引用，而发生变化。
第一个插件是 NamedModulesPlugin，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。第二个选择是使用 HashedModuleIdsPlugin，推荐用于生产环境构建：

```
plugins: [
  new HtmlWebpackPlugin({...}),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({...}),
  new webpack.optimize.CommonsChunkPlugin({...})
]
```
## create library

创建一个项目：
```
webpack-numbers
|- webpack.config.js
|- package.json
|- /src
    |-index.js
    |-res.json
```
创建一个js库。可用于script标签引入html.
该library的使用方法：
```
// es
import * as webpackNumbers from 'webpack-numbers'
// commonjs
let webpackNumbers = require('webpack-numbers')
webpackNumbers.wordToNum('two')
// amd
require(['webpackNumbers'], function (webpackNumbers) {
  webpackNumbers.wordToNum('two')
})
```
## shimming

### shimming全局变量
把指定模块成为全局变量。
```
plugins: [
  new webpack.ProvidePlugin({
    _: 'lodash'
  })
]
```

### 细粒度shimming

```
module: {
  rules: [
    {
      test: require.resolve('index.js'),
      use: 'imports-loader?this=>window'
    }
  ]
}
```

### 全局exports

## 渐进式网络应用程序

```
npm i -D http-server
npm run build
http-server dist
```
## ts

npm i -D typescript ts-loader

## 迁移到新版本
## 构建性能
将 loaders 应用于最少数的必要模块中。
```
{
  test: /\.js$/,
  include: path.resolve(__dirname, 'src') // 有它会提高性能
  loader: 'babel-loader'
}
```
每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具。
尽量减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中类目的数量，因为他们会增加文件系统调用的次数。
如果你不使用 symlinks ，可以设置 resolve.symlinks: false (例如 npm link 或者 yarn link).
如果你使用自定义解析 plugins ，并且没有指定 context 信息，可以设置 resolve.cacheWithContext: false 。
使用 DllPlugin 将更改不频繁的代码进行单独编译。
减少编译的整体大小，以提高构建性能。尽量保持 chunks 小巧。
thread-loader 可以将非常消耗资源的 loaders 转存到 worker pool 中。

## 内容安全策略

## 开发vagrant
## 管理依赖
## 公共路径
## 集成
# loaders
# plugins

# title
# title
# title
# title
# title
# 编写一个loader
# 编写一个插件

插件包括：
1. 一个js命名函数。
2. 插件函数的原型对像上定义apply方法。
3. 绑定一个webpack的事件钩子。
4. 处理webpack内部实例的特定数据。
5. 功能完成时调用webpack提供的回调。

compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。
compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。

// 定义plugin
```
function HelloWorldPlugin (options) {
  console.log('HelloWorldPlugin options', options)
}
HelloWorldPlugin.prototype.apply = (compiler) => {
  // compiler: {options, loader, plugin}
  compiler.plugin('done', () => {
    console.log('hello finish')
  })
}
```
// 使用plugin
```
// webpack.config.js
var HelloWorldPlugin = require('HelloWorldPlugin')
...
let config = {
  ...
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
}
...

```
# title
# title
# title
# title
# title
