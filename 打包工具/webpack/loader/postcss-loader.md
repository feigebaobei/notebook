# introduce

为webpack使用postcss处理css的loader.

# install

```
npm i -D postcss-loader
```

# usage

```
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'cssnano': {},
  }
}
```
[还有很多配置](https://github.com/postcss/postcss-load-config)

# options


## exec

当使用了css-in-js方式时没有使用postcss-js。则需要使用要exec选项。
boolean

## parser

解析者
string | object
'sugarss'

## syntax

语法

## stringifier

## config

设计`postcss.config.js`的路径。
Object

## plugins

postcss使用到的插件。
Array | Function

## sourceMap

是否使用源码地图。
boolean
