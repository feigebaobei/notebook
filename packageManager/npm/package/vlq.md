# `vlq`

## overview
把整数转换为base64编码的vlq字符串。

### feature
- feature0
- feature1
- feature2

## install
`npm i vlq`

## usage
```
const vlq = require('vlq');
// or
// import vlq from 'vlq';
vlq.encode( 123 ); // '2H';
vlq.encode([ 123, 456, 789 ]); // '2HwcqxB'
vlq.decode( '2H' ); // [ 123 ]
vlq.decode( '2HwcqxB' ); // [ 123, 456, 789 ]
```

## 什么是vlq字符串
variable length quantity
数字占的空间比vlq string占的空间大。

## api
`vlq.encode(number | number[]) => string | string[]`
把数字编码为string

`vlq.decode(string) => number[]`
把字符串解码

## 限制
因整个过程会用到32bit，所以数字的范围是2^30或1073741823

## principle
定义a-zA-Z0-9与码值的对应表。
在编码、解码时按一定位运算逻辑从对应表中取得数据，并返回此数据。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。