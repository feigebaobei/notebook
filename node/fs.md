# node fs 文件系统

const fs = require('fs')

异步方法的最后一个参数是回调方法。回调方法的第一个参数是异常。若无异常则第一个参数是null/undefined.

## fs.rename(oldname, newname, (err) => {...})
## fs.stat(filename, (err, stats) => {...})
## fs.open(path, mode, (err, fd) => {...})
path string/buffer/url(file协议)
```
fs.open(Buffer.from('/demo.txt'), 'r', (err, fd) => {...})
```
## fs.opendir() / fs.opendirSync() / fs.promises.opendir()
### dir.close()
return promise
### dir.close((err) => {...})
### dir.closeSync()
### dir.path
return 目录的只读路径。 string
### dir.read()
### dir.read((err, dirent) => {...})
### dir.readSync()
### dir[Symbol.asynclterator]()
## fs.ReadStream(path)
return readstream实例
```
ReadStream {
  _readableState: ReadableState {
    objectMode: false,
    highWaterMark: 65536,
    buffer: BufferList { head: [Object], tail: [Object], length: 1 },
    length: 3763,
    pipes: null,
    pipesCount: 0,
    flowing: null,
    ended: true,
    endEmitted: false,
    reading: false,
    sync: false,
    needReadable: false,
    emittedReadable: false,
    readableListening: false,
    resumeScheduled: false,
    paused: true,
    emitClose: false,
    autoDestroy: false,
    destroyed: false,
    defaultEncoding: 'utf8',
    awaitDrain: 0,
    readingMore: false,
    decoder: null,
    encoding: null
  },
  readable: true,
  _events: [Object: null prototype] { end: [Function] },
  _eventsCount: 1,
  _maxListeners: undefined,
  path: './README.md',
  fd: 24,
  flags: 'r',
  mode: 438,
  start: undefined,
  end: Infinity,
  autoClose: true,
  pos: undefined,
  bytesRead: 3763,
  closed: false
}
```
### close事件
### open事件
### ready事件
### readStream.bytesRead
到目前为止已经读取的字节数。
### readStream.path
### readStream.pending
return bool
若未打开则为true.
## fs.Stats类
`fs.stat() / fs.lstate() / fs.fstat()`
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14713639,
  size: 3763,
  blocks: 8,
  atimeMs: 1596071526942.6165,
  mtimeMs: 1594019667636.611,
  ctimeMs: 1594019667636.611,
  birthtimeMs: 1588746944172.3745,
  atime: 2020-07-30T01:12:06.943Z,
  mtime: 2020-07-06T07:14:27.637Z,
  ctime: 2020-07-06T07:14:27.637Z,
  birthtime: 2020-05-06T06:35:44.172Z
其中Ms为毫秒，Ns为纳秒。
atime 访问时间
mtime 修改时间
ctime 更改时间
birthtime 创建时间
## fs.WriteStream类
fs.createWriteStream(path[, options])
options: {
  flags
  encoding
  fd
  mode
  autoClose
  emitClose
  start
  end
  highWaterMark
  fs
}
### close事件
### open事件
### ready事件
### writeStream.bytesWritten
### writeStream.path
### writeStream.pending
## fs.access(path[, mode], （err, fd) => {...})
是否存在指定path的文件。
## fs.accessSync(path[, mode])
## fs.appendFile(path, data[, options], (err) => {...})
异步地追加数据到文件，如果文件尚不存在则创建文件。 data 可以是字符串或 Buffer。
options: {
  encoding string | null default 'utf8'
  mode integer default 0o666
  flag string default 'a'
}
## fs.appendFileSync(path, data[, options])
## fs.chmod(path, mode, (err) => {...})
异步变更文件权限。
### xxxx
### xxxx
### xxxx
### xxxx
### xxxx
### xxxx
### xxxx
### xxxx
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## fs.stat
## 文件的模式

|常量|八进制值|说明|
|-|-|-|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IWUSR|0o200|所有者可写|
|fs.constants.S_IXUSR|0o400|所有者可执行或搜索|
|fs.constants.S_IRERP|0o400|群组可读|
|fs.constants.S_IWGRP|0o400|群组可写|
|fs.constants.S_IXGRP|0o400|所有者可读|
|fs.constants.S_IROTH|0o400|所有者可读|
|fs.constants.S_IWOTH|0o400|所有者可读|
|fs.constants.S_IXOTH|0o400|所有者可读|

|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
|fs.constants.S_IRUSR|0o400|所有者可读|
||||
||||
||||
||||
||||
||||
||||
||||


## 文件系统标志

||||
|-|-|-|
|a|||
|ax|||
|a+|||
|as|||
|as+|||
|r|||
|r+|||
|rs+|||
|w|||
|w+|||
|wx|||
|wx+|||
||||
||||
||||
||||