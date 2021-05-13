# parse resource code
把`@vue/cli`的源码从`github`上拉下来看。发现它使用了`lerna`管理若干包。这些包在`npm`上由`@vue`组织管理。这也是从`vue-cli`变为`@vue/cli`的原因。
`@vue/cli`包的源码在`./packages/@vue/cli`中。

## parse package.json
文件`./packages/@vue/cli/package.json`中。没有`main`字段。有`bin`字段。说明该包是用于`cli`的包。
该包依赖了`commander`/`inquirer`等包。这些包是用于开发`cli`的。

## parse vue.js
`./packages/@vue/cli/bin/vue.js`是该包向外提供功能的文件
使用`prorame`()
`program`是`Commander`的实例。
`.command()`       定义子命令。相对`package.json`中的`bin`字段定义的命令，`bin`字段定义的是主命令。`.command`定义的是子命令。
`.description()`   当前（子）命令的说明。
`.option()`        设置当前（子）命令的选项。
`.action()`        定义当前（子）命令的回调方法。
此文件中定义了好多子命令。都是使用这种方法。搞懂一个，其他的也就通了。
`program.parse(process.argv)`   解析在终端中输入的命令。即执行命令。

## 项目构架
像样的项目都有一个模块化的目录结构。此项目也是。
`bin/vue.js`是此包的输出口。
`lib/`包含此包的各个子功能文件。
`util`工具目录
`promptModules`模块目录

# 进步
相较到2.x。3.x增加了扩展插件的功能。此功能由`Generator.js`负责。


# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview