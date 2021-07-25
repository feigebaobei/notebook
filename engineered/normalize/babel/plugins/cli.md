# `@babel/cli`

## overview
babel的命令行工具
只在命令行中使用babel.不具有转译功能。

### feature
- feature0
- feature1
- feature2

## install
`npm i @babel/cli -D`

## usage
```
npx babel <file.ext> --out-file <result.js>
```

## configuration
默认配置文件：`<root>/babel.config.json`等。

## api
`--out-file` `-o`
编译成指定文件。

`--source-maps [inline]`
`--out-dir` `-d`
编译到指定目录。

`--ignore`
`--plugins`
`--presets`
`--no-babelrc`
忽略配置文件。使用命令行中的选项。

`--config-file`
指定配置文件。

## principle
分情况执行指定方法。
const fn = opts.cliOptions.outDir ? dirCommand : fileCommand;
想看看它的怎么整理的选项，也看不到。不会玩儿。
在`util.js`中调用了`@babel/core`的`transform` / `transformFile`方法。只有这2个方法用于转译代码。别的代码都是做辅助工作，如：创建相应的目录。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。