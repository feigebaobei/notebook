svg (Scalable Vector Graphics)
可缩放矢量图形。
svg是使用xml描述二维图形和绘图程序的语言。
svg是纯粹的xml
`<svg></svg>`

## demo

```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
</svg>
```

第一行包含了xml声明。standalone：指明此svg文件是否独立。
第二行指明引用的外部文件。
第三行以`<svg>`开始，以`</svg>`结束。它们是svg图的根元素。
  width
  height
  version svg的版本。
  xmlns 定义svg的命名空间。
第四行 circle是一个圆。

## svg 在 html 中使用

SVG 文件可通过以下标签嵌入 HTML 文档：`<embed>、<object> <iframe>`。

### 希望这样使用

通过svg的命名空间使用。

```
<html xmlns:svg="http://www.w3.org/2000/svg">
  <body>
    <p>This is an HTML paragraph</p>
      <svg:svg width="300" height="100" version="1.1" >
        <svg:circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
      </svg:svg>
  </body>
</html>
```

### <embed>

已被主流浏览器支持。
```
<embed src="rect.svg" width="300" height="100" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
```
pluginspage 指向下载插件的url.

### <iframe>

可在大部分浏览器中工作
```
<iframe src="rect.svg" width="300" height="100"></iframe>
```

### <object>

```
<object data="rect.svg" width="300" height="100" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
```
codebase属性指向下载插件的url.

### a

```
<a href="path/to/file.svg">string</a>
```

### img

```
<img src="path/to/file.svg" />
```


