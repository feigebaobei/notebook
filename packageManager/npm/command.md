# overview
整理npm的命令。
# command
## npm access
### overview
发布包时设置访问级别。
### synopsis （大纲）
```
npm access public [<package>]
npm access restricted [<package>]

npm access grant <read-only|read-write> <scope:team> [<package>]
npm access revoke <scope:team> [<package>]

npm access 2fa-required [<package>]
npm access 2fa-not-required [<package>]

npm access ls-packages [<user>|<scope>|<scope:team>]
npm access ls-collaborators [<package> [<user>]]
npm access edit [<package>]
```
### description
所有子命令都作用于在当前目录下的包。
- public / restricted              设置该是公开的或受限制的。
- grant / revoke                   添加或移除用户或团队的只读权限或读写仅限。
- 2fa-required / 2fa-not-required  配置任何人发布是否需要2种因子验证。
- ls-packages                      列出能够访问该包的用户、团队。除了只读权限。
- ls-collaborators                 列出该包的所有权限。
- edit                             设置编辑权限。

### detail
`npm access`总是直接操作注册源（registry）。
不作用的包总是公开的。
作用的包默认是`restricted`，也可以直接设置，如：`npm publish --access=public`.
你必须有权限去设置包的访问权限：
- 你是作用域或非作用域包的拥有者。
- 你是作用域包的拥有团队的成员。
- 你有为包设置读写权限的权限。或你是直接拥有者团队的成员。
若你通过二因子验证，则你会得到一个otp token,它会在命令行中使用`--otp=...`。
若你的账号是免费的。当你发布一个作用域包时，你会得一个失败信息。状态码是`HTTP 402`。若使用`--access=public`，则会成功。
使用`npm team`可以管理团队、团队成员。

## npm link
### overview
链接包文件夹。

### synopsis
```
npm link (in package dir)
npm link [<@scope>/]<pkg>[@<version>]
alias: npm ln
```

### description
这是控制安装你拥有的包，为了不用复制rebuild在工作中。
链接包需要2步。
1. `npm ln`会在全局目录中创建链接。`{prefix}/lib/node_modules/<package>`会链接到执行`npm link`的目录的包。它会链接任何包中的bin文件到`{prefix}/bin/{name}`。执行`npm link`会全局安装。
2. 在别的位置执行`npm link package-name`到创建一个软链接，从全局安装的`package-name`到当前目录的`node_modules/`。

> package-name是`package.json`中的包名。不是目录的名字。

包名中的scope部分必须遵守作用域的规则。
当执行`npm publish`时，若某包被`bundleDependencies`处理，则会被快照到当前状态中。
```
cd ～/projects/node-redis
npm link                      // 创建全局链接
cd ~/projects/node-bloggy
npm link redis                // 软链接redis包。
```
运行结果：在`~/projects/node-redis`中的改变会影响到`~/projects/node-bloggy/node_modules/node-redis/`。提示：link后应该是包名，不是包的目录名。
你也可以把两步合并到一步：
```
cd ~/projects/node-bloggy
npm link ../node-redis      // 软链接依赖
```
第二行等价于
```
(cd ../node-redis; npm link)
npm link
```
第一步创建了一个全局链接，然后链接全局链接到本项目中的`node_modules`目录中。
若使用作用域包。则link命令必须包括作用域。
`npm link @myorg/privatepackage`

### caveat
默认不会把软链接的包保存在`package.json`中。若不想使用软链接，则把`file:../path/to/node-redis`代替为`redis@^3.0.1`。
若使用软链添加一个新包，则应该需要添加相关元数据`npm i <dep> --package-lock-only`
若你想保持`file:`引用到你的`package.json`和`package-lock.json`文件中。你需要执行`npm i <dep> --save`

## npm prefix
### overview
display prefix
显示前缀

### synopsis
`npm prefix [-g]`
该命令不感知工作区。

### description
若使用`-g`，则显示全局前缀。
若不使用`-g`，则显示最近的拥有`package.json`或`node_modules`的祖先目录。
```
npm prefix
// /usr/local/projects/foo
npm prefix -g
// /usr/local
```

### overview
### overview

## npm bin
## npm diff
## npm test
## npm init
创建一个npm项目。包括`package.json`等。
### synopsis
```
npm init [--force|-f|--yes|-y|--scope]
npm init <@scope> (same as `npm exec <@scope>/create`)
npm init [<@scope>/]<name> (same as `npm exec [<@scope>/]create-<name>`)
npm init [-w <dir>] [args...]
```
### description
`npm init <initializer>`可以用于初始化一个人新的或已经存在的npm包。
当使用时`initializer`，其他完成的包名是`create-<initialzer>`。如：`npm init @vitejs/app`的完成的拼写是`npm init @vitejs/create-app`。
该命令会执行`npm exec`，然后会使用主要的脚本创建或更新packag.json。再执行所有初始化相关的操作。
初始化命令相当于`npm exec`的下列操作
- `npm init foo` => `npm exec create-foo`
- `npm init @usr/foo` => `npm exec @usr/create-foo`
- `npm init @usr` => `npm exec @usr/create`

**若要自己开发此功能，则需要开通付费功能。^…^**
若使用`npm init`则会使用原始的初始化功能。它会询问你一起创建`package.json`需要的问题。若想使用默认选项，请使用`-y`/`--yes`。若使用`--scope`，则会创建一个作用域包。

#### forwarding additional options
若想在cli中使用附加字段，则用法如下 `npm init foo -- --hello`，相当于`npm exec -- create-foo --hello`

### example
略

### workspace suport
文档说可以支持工作空间，但是按文件操作走不通。

### a note on caching
npm cli工具会根据包名在缓存中使用本地缓存的包。

#### prefer-online
强制使用远程的包。

#### prefer-offline
不使用本地缓存的包，使用远程的包。
#### offline
强制使用本地缓存的包

#### workspace
- alias:   -w
- type:    Array
- default: []
可以与`npm init`一起使用。用于指定工作空间。可以创建、更新任意不存在的目录。生成文件并添加、更新项目中根目录的`package.json`中的`workspaces`字段。
- 工作空间的名字。
- 指向工作空间的路径
- 指向父工作空间的路径

#### workspaces
- alias:   -ws
- type:    Boolean
- default: false
在当前项目的所有已配置工作区的上下文中运行`npm init`。

## npm exec
在本地、远程的npm包中执行命令

### synopsis
```
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]
npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'
npm exec [--ws] [-w <workspace-name] [args...]

npx <pkg>[@<specifier>] [args...]
npx -p <pkg>[@<specifier>] <cmd> [args...]
npx -c '<cmd> [args...]'
npx -p <pkg>[@<specifier>] -c '<cmd> [args...]'
Run without --call or positional args to open interactive subshell

alias: npm x, npx

common options:
--package=<pkg> (may be specified multiple times)
-p is a shorthand for --package only when using npx executable
-c <cmd> --call=<cmd> (may not be mixed with positional arguments)
```
### description
可在npm包中中执行二进制命令脚本的命令。


### npx vs npm exec
### exmaple
### workspace support
### compatibility with older npx versions
### a note on caching


## set-script
### synopsis
在package.json中的script部分添加脚本命令的命令。
在npm v7+时支持。

#### example
```
npm set-script [<script>] [<command>]
```
运行结果
```
{
    "script": {
        "start": "http-server ."
    }
}
```

### configuration
#### workspace
设置工作空间。默认是当前工作空间。也可设置：
- workspace name
- path to workspace directory
- path to parent workspace directory(基于运行结果是选中所有嵌套的工作空间)
执行`npm init`时，不存在workspace。
在子线程中不支持。

#### workspaces
是否包括所有工作空间。
