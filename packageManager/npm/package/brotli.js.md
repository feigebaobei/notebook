# `brotli`

## overview

使用woff2算法去压缩/解压源代码。

## install
`npm i brotli`

## usage

```
// 在浏览器环境中使用前需要使用browserify处理。
// 在node环境使用
const brotli = require('brotli');
// or
// var decompress = require('brotli/decompress')
```

## api

brotli.compress(param, isText = false)
压缩

brotli.decompress(buffer, [outsize]) => void
解压

## principle
使用了Makefile.
引入的文件应该是被Makefile处理过。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。