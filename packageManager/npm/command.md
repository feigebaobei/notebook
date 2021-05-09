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