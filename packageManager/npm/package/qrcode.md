# qrcode

## install

`npm i qrcode`

## usage

### 最简单的使用demo

```
// html
<canvas id=canvas></canvas>

// js
import QRCode from 'qrcode'
export default{
  data () {
    return {
      codes: ''
    }
  },
  components: {
    QRCode: QRCode
  },
  methods: {
    useqrcode () {
      QRCode.toCanvas(this.$refs.canvas, 'str', function (err) {
        if (err) console.log(err)
        console.log('success')
        })
    }
  },
  mounted () {
    this.useqrcode()
  }
}
```

### 引入方法

- cli
- 使用browserify/webpack打包后使用`<script>`使用
- `var qrcode = require('qrcode')`
- `import qrcode from 'qrcode'`

## 容错率

- L(low)       `~7%`
- M(modium)    `~15%` default
- Q(quartile)  `~25%`
- H(high)      `~30%`

## 二维码的容量
qr code的版本从1到40。
|mode|l|m|q|h|
|-|-|-|-|-|
|numeric|7089|5596|3993|3057|
|alphanumeric|4296|3391|2420|1852|
|byte|2953|2331|1663|1273|
|kanji|1817|1435|1024|784|

## 编码模式
## 二进制数据
## 多种符号
## api

### 在浏览器端的api
#### create(text string|array, [option]) return qrcode object
```
// qrcode object
{
  modules,
  version,
  errorCorrectionLevel,
  maskPattern,
  segments,
}
```
#### toCanvas(canvasElement, text, [options], [cb(error)])
#### toCanvas(text string|array, [options object], [cb(error, canvas) function])
把qr画在canvas上。

#### toDataURL(test, [options], [cb(erro, url)])
#### toDataURL(canvasElement, test, [options], [cb(erro, url)])
生成一个包含预置图片的data uri.

||||||
|-|-|-|-|-|
|type|string|image/png|image/png, image/jpeg, image/webp||
|reendererOpts.quality|number|0.92|||

#### toString(text string|array, [options], [cb(error, string)])

|options|||||
|-|-|-|-|-|
|type|string|utf8|terminal, utf8, svg||

### 在服务端的api
#### create()
#### toCanvas()
#### toDataURL()
#### toString()
#### toFile(path string, text string|array, [options], [cb(error)])
把qr code保存为image.

|options|||||
|-|-|-|-|-|
|type|string|png|svg utf8||
|rendererOpts.deflateLevel|number|9||只能作用于type=png|
|rendererOpts.deflateLevel|number|3||只能作用于type=png|

#### toFileStream(stream stream.Writable, text string|array, [options])
现在只支持png.把qr code写成流。
### option
|option|type|default|value||
|-|-|-|-|-|
|version|number||||
|errorCorrectionLevel|string|M|low/medium/quartile/high/L/M/Q/H||
|maskPattern|number|-|0-7||
|toSJISFunc|function||||
|margin|number|4|||
|scale|number|4|||
|width|number||||
|color.dark|string|#000000ff|||
|color.light|string|#ffffffff|||
