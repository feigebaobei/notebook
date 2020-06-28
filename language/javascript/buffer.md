# buffer.md

专门存放二进制数据的缓存区。
buffer是node在处理大量二进制数据时需要的对象。如：文件处理、网络协议、图片处理。

```
new Buffer()
Buffer.from()
```

## 在buffer中指定编码方式。

```
let buf = Buffer.from('root', 'ascii');
buf.toString('hex')
buf.toString('base64')
```

- ascii
utf8
utf16le
ucs2 // utf16le的别名
base64
latin1 // 一字节编码字符串
binary // latin1的别名
hex

## 创建buffer

```
Buffer.alloc(size[, fill[, encoding]]) // 创建一个指定大小、指定填充内容、指定编码格式的buffer。
  // allocate 分配、指定

Buffer.concat(list[, totalLength])
buf.compare(otherBuffer) // 比较
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]]) // 拷贝缓冲区。targetBuffer里包括buf。
  var b0 = Buffer.from('qwert')
  var b1 = Buffer.from('werty')
  b0.copy(b1, 2)
buf.slice([start[, end]])
buf.length
```