# roadhog

基于create-react-app的服务和构建react app的命令行工具。
因create-react-app的默认配置项不丰富，所以作者创建了roadhog.

## introduce

提供server/build/test三个命令用于本地调试、构建等。

## install

```
npm i roadhog
```

## usage

```
roadhog server
roadhog build
roadhog test
// 默认执行./test目录下的文件
```
## characteristic

1. 更好的错误提示。
  1.1 .roadhogrc做了错误优化
  1.2 roadhog不捕获运行时错误，所有运行时错误需要在浏览器的console里查看。
2. hmr
  ```
  若使用了dva，则需要使用babel-plugin-dva-hmr实现css热更新。

  "env": {
    "development": {
      "extraBabelPlugins": ["dva-hmr"]
    }
  }
  ```
3. mock
  ```
  // .roadhogrc.mock.js
  export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};
  ```
4. 智能重启
修改配置文件（如下）后会触发roadhog server重启。
> - .roadhogrc
.roadhogrc.js
.roadhogrc.mock.js

## set

配置存在于.roadhogrc文件。
支持.js/.json格式。
配置项是boolean值的默认值为false.
```
// 默认配置
{
"entry":               "src/index.js", //入口
"disableCSSModules":   false,          //是否禁用css modle
"publicPath":          "/",            // 配置生产环境的publicPath.在开发环境永远为/
"outputPath":          "./dist",       // 输出路径（就是打包后的路径）。默认为'./dist'
"extraBabelPlugins":   [],             // babel plugin只能添加，不允许删除、覆盖。若使用了dva/antd，则应该设置配置`"extraBabelPlugins": ["transform-runtime","dva-hmr",["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]]`,并安装依赖。
"extraPostCSSPlugins": [],             // 配置额外的postcss插件。配置只能在`.roadhogrc.js`里。
"autoprefixer":        null,           // 设置autoprefixer、browserlist的参数。
"proxy":               null,           // 设置代理
"externals":           null,           // 设置webpack的external
"library":             null,           // 设置webpack的library
"libraryTarget":       "var",          // 设置webpack的libraryTarget
"multipage":           false,          // 是否是多页面应用。若是，则自动提取公共部分为common.js/common.css
"define":              null,           // 设置webpack的DefinePlugin
"env":                 null,           // 对指定的环境设置。server: development, build: production
"theme":               null,           // 设置主题，即less的modifyVars。
```


## 环境变量

|变量|默认值|
|PSOT|8000|
|HOST|localhost|
|HTTPS|关闭|
|BROWSER|-|
|CLEAR_CONSOLE|-|

```
// example
$ POST=3000 roadhog server
```

## 命令行参数

```
roadhog server -h
roadhog build --debug
              --watch -w
              --output-path -o
              --analyze
              -h
roadhog test -h
            --coverage
```

## use public dir

默认在public目录里的内容会被克隆到输出路径。
