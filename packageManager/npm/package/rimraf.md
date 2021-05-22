# rimraf

为node开发的`rm -rf`（unix）命令
rm -rf是一条UNIX系统下的文件删除命令，作用是无提示地强制递归删除当前目录下所有文件，并且不能够恢复。

## Installation

```
npm i rimraf
```

## API

```
rimraf(f, [opts], cb)
```
第一个参数用于匹配文件。若不想匹配，则使用`opts.disableGlob`(默认为`false`)。若使用通配符，则可匹配一些文件。
cb会在要出错是执行。参数包括以下内容
- windows: EBUSY / ENOTEMPTY。最多尝试`opts.maxBusyTries`（默认为3）。每次尝试间隔100ms。
- ENOENT 若文件不存在在，`rimraf`会返回成功。
- EMFILE 当目录内有文件被打开，会提示`EMFILE`。当同步执行时，不做事。当异步执行时，会被执行超时处理`opt.emfileWait`（默认为1000）。

## Options
这块内容我不太明白。
大概意思好像是该包默认使用了node的fs模块在文件系统中处理。若该包的使用者想用别的文件系统可以通过`opts`的下列参数传入该包。
unlink, chmod, stat, lstat, rmdir, readdir, unlinkSync, chmodSync, statSync, lstatSync, rmdirSync, readdirSync
同步方法是`rimraf.sync(path, options)`。

- maxBusyTries  当失败时的最大尝试次数
- emfileWait    最大等待时间（ms）
- glob          是不否使用glob匹配。可设置glob（默认`{nosort: true, silent: true}`）。该包使用glob v6（我在代码中看到使用^7.1.3）。在同步方法中用法相同。
- disableGlob   可以使用非假值。

## rimraf.sync

这是`rimraf()`的同步方法。推荐使用异步方法。

## Cli

```
npm i rimraf -g
rimraf <path> [<path> ...]
```

## mkdirp

递归新建目录。
参考[mkdirp](https://github.com/substack/node-mkdirp)
详见`./mkdirp`

## 备注

EMFILE 进程文件表溢出
ENFILE 达到打开文件的系统限制
