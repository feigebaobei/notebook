# js-sha3

使用js支持utf8编码的简单的sha-3/keccak/shake的hash文法集。
我理解的支持utf8是意思是支持中文。

## notice

- 若在最后更新hash结果，则会报错。
- 从0.2.0以后`Sha3`被替换为`keccak`。即0.1.x时使用sha3.0.2.x后使用keccak。
- `buffer`方法被删除了。若使用node.js时想使用`Buffer`，请使用`arrayBuffer`。

## download

```
https://raw.github.com/emn178/js-sha3/master/build/sha3.min.js
https://raw.github.com/emn178/js-sha3/master/src/sha3.js
```
## installation

```
bower install js-sha3
npm install js-sha3
```

## usage

```
//
sha3_512('string')
keccak('string')
...
// node 环境
sha3_512 = require('js-sha3').sha3_512
// ts
import { sha3_512 } from 'js-sha3'
```