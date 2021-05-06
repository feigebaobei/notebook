# overview

一个管理多包的工具。
它是一个一库多包的管理工具。

# about

把代码分离到独立版本库中是很有用的，对于代码共享。但是会跨很多库会很乱，较难跟踪。并跨库测试很难。
为了解决这些问题，一些库/组织把它们的代码放在一个多包库（muli-package repositories / monorepos）里。像Babel/React/Angular/Ember/Meteor/Jest，还有很多开发者在一个库时开发它们的多个包。
lerna是一个使用git/npm管理多包库工作流的工具。
lerna可以减小在开发/buil环境中必要的复制。通常分离一个项目为多个npm包。详情见：hoist document.

## lerna创建的库

```
my-lerna-repo
|--package.json
|--packages
    |--packages-1
        |--package.json
    |--packages-2
        |--package.json
```

## 可以做

它有2个命令。
```
lerna bootstrap
lerna publish
```

## 不可以做

它不是一个无服务一库多包的部署工具。不能兼容传统的一库多包部署工具。

# getting started

推荐使用3.x版本的lerna。
让我们使用从安装它开始。
```
mkdir lerna-repo && cd &_
npx lerna init
```
此时会创建`lerna.json`，它是一个`packages`目录的配置文件。所以你的目录如下：
```
lerna-repo/
  |--packages/
  |--package.json
  |--lerna.json
```

# how it works

它有2种模式去管理项目：fixed / independent。

## fixed（固定模式）默认

固定模式下项目操作一个单独的版本。版本号在`lerna.json`的`version`中。当你执行了`lerna publish`，若从上次发布后有包被修改过，则该包会使用新的版本号去发布。即只需要修改`lerna.json`中的`version`就可作用于所有被修改的包。
`babel`就是使用这种模式。若你想使用这种自动作用于全部包的版本号管理工具，你就可以这么做。

## independent（分离模式）

`lerna init --independent`
在该模式下每个包使用当前包的`package.json`管理版本号。每次发布时，会得到一个提示，关于每个包的补丁/小更改/主要更改/自定义变动。
该模式下允许你更自由地升级每个包的版本，用于组件组更合适。

# trubleshooting

# commands

这些命令的说明是专门有它们的说明页面。

## learn publish


## learn version
## learn bootstrap
## learn publish
## learn list
## learn changed
## learn diff
## learn exec
## learn run
## learn init
## learn add
## learn clean
## learn import
## learn link
## learn create
## learn info
# concepts

lerna会把日志写在`lerna-debug.log`也叫`npm-debug.log`。当遇到error时会执行该命令。

# lerna.json

```
{
  "version": "1.1.3",
  "npmClient": "npm",
  "command": {
    "publish": {
      "ignoreChange": ["ignored-file", "*.md"],
      "message":"chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    },
  },
  "packages": ["packages/*"]
}
```
|key|||description||
|-|-|-|-|-|
|version|||当前库的版本号||
|npmClient|||可选项。指定哪种包管理工具。||
|command|||||
||publish||||
|||ignoreChange|一个不包括在`lerna publish`中的文件组成的数组。||
|||message|自定义在执行提交时的信息||
|||registry|自定义发布平台的url。默认是`npmjs.org`。请注意：你必须有权限。||
||bootstrap||||
|||ignore|由执行`lerna bootstrap`时忽略的文件组成的数组。||
|||npmClientArgs|`lerna bootstrap`时会执行`npm install`，该字段是为`npm install`提供参数的字段。由字符串组成的数组。||
|||scope|定义`lerna bootstrap`的作用域。由字符串组成。||
|packages|||由当地包组成。由字符串组成。||
lerna.json里面是所有包的配置项。每个包的配置项由各包内的`package.json`设置。
lerna默认初始化时把packages list设置为`["packages/*"]`，也可以自定义为其他目录。如：`["modules/*"]`/`["package1","package2"]`。该字段使用相对于lerna.json的相对路径。lerna.json通常在库的根目录下。各包不能嵌套。
如`packages: ["packages/*","src/**"]`，则匹配的目录树如下：
```
packages/
|--foo-pkg
    |--package.json
|--bar-pkg
    |--package.json
|--baz-pkg
    |--package.json
|--qux-pkg
    |--package.json
src/
|--admin
  |--foo-pkg
  |   |--package.json
  |--stuff
  |   |--package.json
  |--things
      |--package.json
|--profile
  |--more-things
  |   |--package.json
|--property
  |--more-stuff
  |   |--package.json
  |--other-things
  |   |--package.json
  |--things
      |--package.json
|--upload
  |--other-stuff
  |   |--package.json
```
通过在`packages/*`下定义包。
在lerna.json中有遗留字段`lerna`,它与`version`的作用相同。现在不用`lerna`字段了。

## common devDependencies

大多数的`devDependencies`可以使用`lerna link convert`转换到项目的根目录中。该命令可以自动提升依赖包，使用时使用相对文件`file:`。
提升文件的好处：
- 所有文件使用相同版本的依赖。
- 可以使用自动化工具（如snyk）使根目录中的依赖保持最新。
- 减少安装时间。
- 减少存储空间。
提供二进制执行文件的`devDependencies`仍需要安装在相应包的依赖中。
如：`nsp`是一个依赖。使用`lerna run nsp` / `npm run nsp`执行。
```
"scripts": {
  "nsp": "nsp"
},
"devDependencies": {
  "nsp": "^2.3.3"
},
```
## git hosted dependencies
lerna允许使用远程仓库的url地址和版本/标记来安装依赖。当包是私有时可以使用git发布。
lerna不会把git历史分隔到只读仓库中。
```
// packages/pkg-1/package.json
{
  name:"pkg-1",
  version: "1.0.0",
  dependencies: {
    "pkg-2": "github:example-user/pkg-2#v1.0.0"
  }
}
// packages/pkg-2/package.json
{
  name: "pkg-2",
  version: "1.0.0"
}
```
在该例中,
执行`lerna bootstrap`，会链接`pkg-2`到`pkg-1`中。
执行`lerna publish`，会当`pkg-2`改变时更新`pkg-1`中的版本号。




# global flags
# filter flags






# start

```
npm i -g lerna
git init lerna-repo && cd lerna-repo
lerna init 
```

# commands

```
Usage: lerna <command> [options]

命令：
  lerna add <pkg> [globs..]  Add a single dependency to matched packages
  lerna bootstrap            Link local packages together and install remaining
                             package dependencies
  lerna changed              List local packages that have changed since the
                             last tagged release              [aliases: updated]
  lerna clean                Remove the node_modules directory from all packages
  lerna create <name> [loc]  Create a new lerna-managed package
  lerna diff [pkgName]       Diff all packages or a single package since the
                             last release
  lerna exec [cmd] [args..]  Execute an arbitrary command in each package
  lerna import <dir>         Import a package into the monorepo with commit
                             history
  lerna info                 Prints debugging information about the local
                             environment
  lerna init                 Create a new Lerna repo or upgrade an existing repo
                             to the current version of Lerna.
  lerna link                 Symlink together all packages that are dependencies
                             of each other
  lerna list                 List local packages           [aliases: ls, la, ll]
  lerna publish [bump]       Publish packages in the current project.
  lerna run <script>         Run an npm script in each package that contains
                             that script
  lerna version [bump]       Bump version of packages changed since the last
                             release.

Global Options:
      --loglevel       What level of logs to report.     [字符串] [默认值: info]
      --concurrency    How many processes to use when lerna parallelizes tasks.
                                                              [数字] [默认值: 6]
      --reject-cycles  Fail if a cycle is detected among dependencies.    [布尔]
      --no-progress    Disable progress bars. (Always off in CI)          [布尔]
      --no-sort        Do not sort packages topologically (dependencies before
                       dependents).                                       [布尔]
      --max-buffer     Set max-buffer (in bytes) for subcommand execution [数字]
  -h, --help           显示帮助信息                                       [布尔]
  -v, --version        显示版本号                                         [布尔]

When a command fails, all logs are written to lerna-debug.log in the current
working directory.

For more information, find our manual at https://github.com/lerna/lerna
turbo@turbo-System-Product-Name:~$ 

```

# title
# title
# title
# title
# title
