# sha3

## sha-3 for js

一个实现了hash算法家族的keccak家族的纯js.它几乎包括了keccak/sha3.

> 在以前`SHA3Hash`对象提供keccak哈希。现在使用有`SHA-3`做哈希。为了兼容以前的版本，这个对象还可以使用。但是我们鼓励用户使用`SHA3`、`Keccak`对象代替`SHA-3`、`Keccak`.

## install]

```
npm i sha3
yarn add sha3
```

## usage

这个包可以用于node.js/browser/es6。

```
// node
const {SHA3} = require('sha3')
const {Keccak} = require('sha3')
// es6
import {SHA3} from 'sha3'
import {Keccak} from 'sha3'
```

这个包包括3个算法。

- SHA3
- Keccak
- SHAKE (SHAKE XOF 算法)

```
// demo
import {SHA3} from 'sha3'
import {Keccak} from 'sha3'
import {SHAKE} from 'sha3'

const hash = new SHA3(512)
hash.update('foo')
hash.digest('hex')

const hash = new Keccak(256)
hash.update('foo')
hash.digest('hex')

// 以2048byte使用SHAKE128
const hash = new SHAKE(128)
hash.update('foo')
hash.digest({buffer: Buffer.alloc(2048), format: 'hex'})
```

### api reference

这个库提供的所有方法遵守下列规定。

|key|describ|demo|data type|default|可选值|
|-|-|-|-|-|-|
|constructor(size=512)|配置每一个hash方法。|`const hash = new Keccak(256)`|number|512|224/256/384/512|
|update(data, [encoding='utf8'])|使用给定的data更新hash的内容，返回一个hash对象。|`hash.update('foo')`|data:buffer/string encoding:string|'uft8'|224/256/384/512|
|digest([encoding='binary'])|配置每一个hash方法。|`const hash = new Keccak(256)`|number|512|224/256/384/512|
|constructor(size=512)|配置每一个hash方法。|`const hash = new Keccak(256)`|number|512|224/256/384/512|
|constructor(size=512)|配置每一个hash方法。|`const hash = new Keccak(256)`|number|512|224/256/384/512|
|constructor(size=512)|配置每一个hash方法。|`const hash = new Keccak(256)`|number|512|224/256/384/512|

#### constructor

配置每一个hash方法。
size 指定bits。
  默认 512
  可选 224、256、384、512
```
const hash = new Keccak(256)
```

#### update(data, [encoding='utf8'])

使用给定的data更新hash内容。返回一个hash对象。
data buffer/string
encoding string 给定data的编码类型。若data是string类型，则encoding默认为utf8.
```
const hash = new Keccak(256)
hash.update('foo')
hahs.update('string').update('str')
```

#### digest([encoding='binary'])

执行完hash方法后，再执行该方法，使用该hash可以再接收输入。
encoding string 使用指定的编码格式去编译。
  默认 'binary'，编码为buffer
  若不使用'binary'，则编码为string
```
const hash = new Keccak(256)
hash.update('str')
hash.digest('hex')

```

#### digest([options={}])

options包括
buffer buffer 预设存放输出的buffer的bytes.
format string 以何种编码返回摘要。默认使用'binary'。若指定了buffer,则把该值传递给`Buffer#toString()`.
padding byte 添加到算法的块大小里。通常会省略。
```
const hash = new Keccak(256)
hash.update('str')
hash.digest({buffer: Buffer.alloc(32)j, format: 'hex'})
```


#### reset

重置该hash为初始状态。
该hash对象可以安全地再次用于计算别的hash。

```
const hash = new Keccak(256)
hash.update('foo')
hash.digest()
hash.reset()
hash.update('string')
hash.disgest()
```

## testing

```
yarn test
```

## disclaimer
## special thanks