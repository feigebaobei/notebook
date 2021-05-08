# npmrc

## decription
npm需要得到一些环境变量等数据，在cli中。
`npm config`可以更新、编辑用户的、全局的npmrc文件。

## files
有4个相关文件:
- `/path/to/my/project/.npmrc` 预项目配置文件。
- `~/.npmrc`                   预用户配置文件。
- `$PREFIX/etx/npmrc`          全局配置文件。
- `/path/to/npm/npmrc`         内置配置文件。
所有的配置文件都是`key=value`格式的。环境变量可以用`${VARIABLE_NAME}`代替。如:`prefix=${HOME}/.npm-packages`
每个文件被加载时会按优先级处理。
数组变量需要在其后使用`[]`标记。如：`key[]="first" key[]="second"`
### comments
使用`;` / `#`去注释、
```
# last modified: 01 Jan 2016
; Set a new registry for a scoped package
@myscope:registry=https://mycustomregistry.example.org
```

### pre-project config file
在项目的根目录下的`.npmrc`文件。与`node_modules`/`package.json`同级。只能放在项目的根目录。不使用使用全局安装。

### per-user config file
`$HOME/.npmrc`

### global config file
`$PREFIX/etc/npmrc` 这是一个配置文件。使用`key=value`格式。

### build-in config file
它是不可改变的内置的配置文件。可跨平台。