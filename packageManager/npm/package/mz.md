# mz

现代化node.js
让node可以使用现代的es6+的api.

## installation and usage

```
npm i mz
// 使用mz/为前缀引入相关模块
const fs = require('mz/fs')
fs.exists(__filename).then((exists) => {...})
// 允许你使用es7中的async/await。
async(() => {
    let a = await fn()
    ...
})
```

## promisification

有很多方法被转换为promise。任意不被支持、不是异步的都被简单地代理了。

- child_process
- crypto
- dns
- fs
- readline
- zlib

## promise engine

mz使用了`any-promise`
