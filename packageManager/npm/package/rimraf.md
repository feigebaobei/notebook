# rimraf

为node开发的`rm -rf`（unix）命令
rm -rf是一条UNIX系统下的文件删除命令，作用是无提示地强制递归删除当前目录下所有文件，并且不能够恢复。

## Installation

```
npm i rimraf
```

## API

```
rimraf(f, [opts], callback)
```
第一个参数是入口文件。若不想使用转义字符功能，则设置`opts.disableGlob: false`。
当出错是执行callback，参数是错误信息。

## Options

- unlink, chmod, stat, lstat, rmdir, readdir, unlinkSync, chmodSync, statSync, lstatSync, rmdirSync, readdirSync
- maxBusyTries
- emfileWait
- glob
- disableGlob

## rimraf.sync

这是`rimraf()`的同步方法。推荐使用异步方法。

## Cli

```
npm i rimraf -g
rimraf <path> [<path> ...]
```

## mddirp

递归新建目录。
参考[mkdirp](https://github.com/substack/node-mkdirp)