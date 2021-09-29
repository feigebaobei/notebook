# 介绍css module

ICSS: interoperable css
1. 所有的类名和动画名称默认都有各自的作用域的CSS文件。
2. 使用url/@imports的模块请求格式。
2.1 ./xxx  ../xxx 相对路径
2.2 xxx  /xxx     绝对路径
vue-loader集成了css module，限定了css范围。

## demo

```
import styles from './path/style.css'
element.innerHTML = `<div class="${styles.className}"></div>`
```

## naming

推荐使用camelCase.

## exceptions

```
:global(.className) {
  color: red
}
.first {
  ...
}
// 默念是本地
:local(.second) {
  ...
}
```

## composition

```
.className {
  color: green;
}
.otherClassName {
  composes: className;
  color: red;
}
```
使用composes前先定义相应的类。可以一行写多个类。`composes: first second three`
默认是本地作用域。`:local(className)`.

## dependencies

.first {
  composes: className from './style.css' // 引入了多个类。
}

## usage with preprocessors

```
:global {
  .global-class-name {
    color: red;
  }
}
```

## usage

```
<style module>
.red {
  color: red
}
.bold {
  font-weight: bold
}
</style>
```

它会为css-loader返回一个css module.作为一个class对象。该对象会被组件的computed处理为$style.可心在template中使用动态使用$style.
```
<template>
  <p :class="$style.red">
    string
  </p>
  <p :class="{[$style.red]: isRed}"></p>
  <p :class="[$style.red, $style.bold]"></p>
</template>
<script>
export default {
  created () {
    console.log(this.$style.red)
  }
}
</script>
```

# custom inject name

为了解决样式冲突，可以在`*.vue`中写多个`<style>`并标明不同的module。
```
<style module="a">
  /* identifiers injected as a */
</style>
<style module="b">
  /* identifiers injected as b */
</style>
```

# configuring css-loader query

css module使用css-loader处理。
使用`<style module>`默认使用css-loader查询。

```
{
  modules: true,
  importLoaders: 1,
  localIdentName: '[hash:base64]'
}
```
可以使用vue-loader提供一些配置项为css-loader。
```
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        cssModules: {
          localIdentName: '[path][name]---[local]---[hash:base64:5]',
          camelCase: true
        }
      }
    }
  ]
}
```

# 
# title
# title
# title
# title
# title
# title