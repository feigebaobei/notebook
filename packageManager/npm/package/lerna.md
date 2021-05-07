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
按常用顺序展示。

## learn init
初始化lerna项目或更新当前库的lerna版本。生成基本的项目结构。
## learn create
创建一个lerna管理的包
## learn bootstrap
链接一个本地包或添加一个远程包。
## learn publish
发布当前项目中的包
## learn add
在适当的包中添加依赖。
## learn link
互相链接所有包
## learn exec
在每个包中执行任意命令。
## learn run
在每个包括此脚本的包中执行此脚本
## learn changed
列出从最后一次发布后有改变的本地包
## learn diff
显示所有包或一个包的从最后一次发布后的不同
## learn info
打印本地环境信息
## learn clean
清除所有包中的`node_modules`
## learn import
使用`commit history`引入一个包到多包一库中。
## learn list
列出本地包
## learn version
从最后一次发布后有改变的所有包的集成版本号。
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

# commands 详细说明

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


## learn version
## learn bootstrap

### overview

链接本地包并安装剩余的依赖包。

### usage

```
lerna bootstrap
```
在lerna项目的根目录执行，会安装所有包的依赖并链接跨依赖（即：链接本地包之间的依赖）。该命令会执行以下命令：
1. `npm i` 安装每个包的依赖
2. 链接各包间的依赖。
3. 在所有包中执行`npm run prepublish`。若不需要执行该命令请添加`--ignore-prepublish`
4. 在每个包中执行`npm run prepare`

`lerna bootstrap`还可以接收所有的`filter flags`。
额外的参数需要前缀`--`。
`lerna bootstrap -- --production --no-optional`
也可以在`lerna.json`中配置。
```
{
  ...
  "npmClient": "yarn",
  "npmClientArgs": ["--production", "--no-optional"]
}
```
#### --hoist [glob]

在根目录中安装`[glob]`。（glob是一个包名），会作用于当前项目中的所有包。若被安装的包是二进制文件。则该包会被安装在各个包中的`node_modules/.bin/`中，这为了方便包中脚本调用。若`lerna bootstrap --hoist`后没有指定`[glob]`，则默认使用`**`，会做作用于全部包。否则只作用于指定包。
若需要依赖同一个包的不同版本，则在使用`--hoist`命令时需要明确指定版本号，否则警告会被忽略。

#### --strict

当与

`hoist`结合使用时，会报错误并停止引导程序。若没有与`hoist`结合使用或没有警告，则没有影响。
`lerna bootstrap --hoist --strict`

#### --nohoist [glob]

指定不安装配置的依赖在项目根目录中。
`lerna bootstrap --hoist --nohoist=babel-*`

#### --ignore

指定`bootstrap`的忽略项。它与lerna.json中`command.bootstrap.ignore`的作用相同。但是`--ignore`的优先级高。
```
{
  "version": "0.0.0",
  "command": {
    "bootstrap": {
      "ignore": "component-*"
    }
  }
}
```

### options
#### --ignore-prepublish

在执行bootstrap时跳过`prepublish`钩子函数。有可能在下一版lerna中删除该功能。
`lerna bootstrap --ignore-prepublish`

#### --ignore-scripts

路过所有生命周期脚本（prepare等）。
`lerna bootstrap --ignore-scripts`

#### --registry <url>

不会。

#### --npm-client <client>

必须明确指定一个npm包管理工具。默认是`npm`。
`lerna bootstrap --npm-client=yarn`
也可以在lerna.json中配置
```
{
  ...
  "npmClient": "yarn"
}
```

#### --use-workspaces

可以集成`yarn workspaces`。
可在package.json中配置。
```
{
  ...
  "npmClient": "yarn",
  "useWorkspaces": true
}
```
lerna.json中必须包括workspaces数组。
```
{
  "private": true,
  "devDependencies": {
    "lerna": "^2.2.0"
  },
  "workspaces": ["packages/*"],
}
```
`--use-workspaces`优先级高于lerna.json中的配置。

#### --no-ci

在ci环境下`lerna bootstrap`会使用`npm ci`代替`npm i`。若不想如此做，则使用`--no-ci`
`lerna bootstrap --no-ci`
若强制使用代替，则使用`--ci`
`lerna bootstrap --ci`

#### --force-local

```
lerna bootstrap --force-local
```
不管版本号是否匹配。强制链接本地包。

#### publishConfig.directory

这是一个人非标准字段，它允许您自定义符号链接子目录，它将是符号链接的源目录，就像如何使用已发布的包一样。
```
"publishConfig": {
  "directory": "dist"
}
```
在此例中，该包被引导并链接，`dist`目录会成为源代码的目录（e.g. `package-1/dist => node_modules/package-1`） 

### 如何工作

以`babel`为例。
- `babel-generator` / `source-map`是`babel-core`的依赖。
- `babel-core`的`package.json`如下
```
{
  "name": "babel-core",
  ...
  "dependencies": {
    ...
    "label-generator": "^6.9.0",
    ...
    "source-map": "^0.5.0"
  }
}
```
- lerna会检查每个包是否是当前项目的子包。
  - 此例中lablel-generator是内部依赖。source-map是外部依赖。
  - 在`babel-core`的`package.json`中指定`babel-generator`的版本号。使用内部依赖。
  - `source-map`使用`npm i`安装，是外部依赖。
- `packages/babel-core/node_modules/babel-generator`被本地链接到`packages/babel-generator`
- 允许嵌套目录引入。
### 提示
不会

## learn publish

### overview

发布当前项目中的包。

### usage

```
lerna publish               # 发布从最后一次开发有变化的包。
lerna publish from-git      # 发布当前提交中的包。
lerna publish from-package  # 发布注册表中不存在的最新版本的包
```
可实现以下功能之一：
- 发布从最后一次开发有变化的包。会执行`lerna version`.
- 发布当前提交中标记的包。`from-git`
- 发布注册表中不存在的最新版本的包`from-package`
- 发布在前一次提交中更新的包(及其依赖项)的未版本控制的“金丝雀”版本。

lerna不会发布私有包。package.json中private: true控制的。
会在每个包中执行适当的生命周期钩子。若不需要则使用`--ignore-scripts`。

### opsitionals

#### bump `from-git`

`lerna version`不仅支持`semver`关键字，也支持`from-git`关键字。`lerna version`会区分包的要标记并工发布到npm上。这样会方便ci。

#### bump `from-package`

与`from-git`相似。根据每个package.json决定是否发布，并决定每个不在注册表中的包的版本。任何不在注册表中的包都会发布。这样对于`lerna publish`很有用。

### options

支持所有`lerna version`的选项，并增加了以下选项。
- `--canary`
- `--contents <dir>`
- `--dist-tag <tag>`
- `--git-head <sha>`
- `--graph-type <all|dependencies>`
- `--ignore-scripts`
- `--ignore-prepublish`
- `--legacy-auth`
- `--no-git-reset`
- `--no-granular-pathspec`
- `--no-verify-access`
- `--otp`
- `--preid`
- `--pre-dist-tag <tag>`
- `--registry <url>`
- `--tag-version-prefix`
- `--temp-tag`
- `--yes`

#### --canary
#### --contents <dir>
发布指定的子目录。`lerna publish --contents dist`
#### --dist-tag <tag>
发布到指定的标签中。`lerna publish --dist-tag next`
#### --git-head <sha>
只能在`from-package`中运行。明确设置`gitHead`。
#### --graph-type <all|dependencies>
设置包图的类型，默认是`dependencies`。即只列出`package.json`中的`dependencies`，为设置为`all`则列出`dependencies`/`devDependencies`。然后设置包的结构图（包图）
`lerna publish --graph-type all`
配置`lerna.json`
```
{
  "command": {
    "publish": {
      "graphType": "all"
    }
  }
}
```
#### --ignore-scripts
是否不使用生命周期脚本。
#### --ignore-prepublish
是否不执行`prepublish`脚本。
#### --legacy-auth
不会
#### --no-git-reset
不会
#### --no-granular-pathspec
不会
#### --no-verify-access
不会
#### --otp
设置验证时的密码。
`lerna publish --otp 123456`
#### --preid
与`lerna version`的用法不全相同。需要与`--canary`一起使用。
#### --pre-dist-tag <tag>
不会
#### --registry <url>
设置注册表
#### --tag-version-prefix
版本号的前缀，默认：`v`
#### --temp-tag
不会
#### --yes
跳过所有的提示。
### Deprecated options
#### --skip-npm
### per-package configuration
#### publishConfig.access
#### publishConfig.registry
#### publishConfig.tag
#### publishConfig.directory
### lifecycle scripts
- prepublish
- prepare
- prepublishOnly
- prepack
- postpack
- publish
- postpublish
## learn list
## learn changed
## learn diff
## learn exec

### overview

在每个包中执行任意命令。

### usage

```
lerna exec -- <command> [...args] 
lerna exec -- rm -rf ./node_modules
lerna exec -- protractor conf.js
```

### options
#### --stream
不会
#### --parallel
不会
#### --no-bail
当返回非零退出码时返回。
#### --no-prefix
不会
#### --profile
不会
#### --profile-location <location>



## learn run
## learn init
## learn add

### overivew

添加匹配package.json的依赖。

### usage

`lerna add <package>[@version] [--dev] [--exact] [--peer]`
在lerna项目中安装依赖，一次只能安装一个依赖包。
执行这行命令时会：
1. 会在每个适用的包安装。若某个包没有package.json。则不安装。
2. 引导包会改变package.json.(翻译不正确)
若版本号不正确，则安装`latest`版本。
### options
#### --dev
#### --exact
#### --peer

把包安装在`peerDependencies`中。

#### --registry <url>

不会

#### --no-bootstrap

跳过`lerna bootstrap`
## learn clean
### overivew
### overivew
### overivew
## learn import
## learn link
### overview

链接所有互相依赖包。

### usage

`lerna link`
### options
#### --force-local
不管版本号是否匹配，都链接本地包。
#### publishConfig.directory
不会
## learn create

### overview

创建一个lerna管理的包

### usage

```
lerna create <name> [loc]

Create a new lerna-managed package

Positionals:
  name  The package name (including scope), which must be locally unique _and_
        publicly available                                   [string] [required]
  loc   A custom package location, defaulting to the first configured package
        location                                                        [string]

Command Options:
  --access        When using a scope, set publishConfig.access value
                             [choices: "public", "restricted"] [default: public]
  --bin           Package has an executable. Customize with --bin
                  <executableName>                             [default: <name>]
  --description   Package description                                   [string]
  --dependencies  A list of package dependencies                         [array]
  --es-module     Initialize a transpiled ES Module
  --homepage      The package homepage, defaulting to a subpath of the root
                  pkg.homepage                                          [string]
  --keywords      A list of package keywords                             [array]
  --license       The desired package license (SPDX identifier)   [default: ISC]
  --private       Make the new package private, never published
  --registry      Configure the package's publishConfig.registry        [string]
  --tag           Configure the package's publishConfig.tag             [string]
  --yes           Skip all prompts, accepting default values
```


## learn info
## learn version

### overview

从上一次发布后改变的版本号。

### usage
```
lerna version 1.0.1
lerna version patch
lerna version
```
执行后会做以下工作：
1. 标记哪个包被修改过。
2. 提示新版本号
3. 修改无数据。在根目录执行适当的生命周期脚本。
4. 提交所有改变。
5. push到远端仓库。
### positional

```
lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
```

### prerelease

### options
#### --allow-branch <glob>
#### --amend

### overview
