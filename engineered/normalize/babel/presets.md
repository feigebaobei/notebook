# presets of babel

## overview
> 内置若干插件。
> 逆序执行。

- @babel/preset-env 转换es6+语法
- @babel/preset-typescript 转换ts语法
- @babel/preset-react 转换react语法
- @babel/preset-flow 转换flow语法

## usage
- 配置文件中设置presets字段
- cli中设置programmatic option

不推荐使用`staget-X`

### create a preset
```
// 包含指定插件
module.exports = function () {
    return {
        plugins: ['pluginA', 'pluginB', 'pluginC'],
    }
}
// 包含指定preset
module.exports = function () {
    return {
        presets: [require('@babel/preset-env')],
        plugins: [
            [require('@babel/plugin-proposal-class-properties'), {loose: true}],
            require('@babel/plugin-proposal-object-rest-spread')
        ]
    }
}
```

## @babel/preset-env
它是一个很灵巧的包。
相当与`Stage-3`。

## @babel/preset-typescript

## @babel/preset-react

## @babel/preset-flow

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。