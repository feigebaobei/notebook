# 介绍

SVG 意为可缩放矢量图形（Scalable Vector Graphics）。
SVG 使用 XML 格式定义图像。
svg与 Flash 相比，SVG 最大的优势是与其他标准（比如 XSL 和 DOM）相兼容。而 Flash 则是未开源的私有技术。
使用时可以引入svg文件，也可以插入svg代码。
所有的开启标签必须有关闭标签！

```
<div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
</div>
```

```
// svg实例
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
```

# 在html中使用

SVG 文件可通过以下标签嵌入 HTML 文档：`<embed>`、`<object>` 或者 `<iframe>`。
SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。

## 使用方式


|方式|优点|缺点|demo||
|-|-|-|-|-|
|`<embed>`|所有主要浏览器都支持，并允许使用脚本|不推荐在HTML4和XHTML中使用（但在HTML5允许）|`<embed src="circle1.svg" type="image/svg+xml" />`||
|`<object>`|所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准|不允许使用脚本。|`<object data="circle1.svg" type="image/svg+xml"></object>`||
|`<iframe>`|||||
|嵌入svg|||||
|链接svg|||||

# svg代码

以元素的名称为标签，再设置相应属性。

|元素|属性|说明||
|-|-|-|-|
|a|xlink|||
|||||
|||||
|||||
|||||
|||||
|||||
|||||
|||||

## rect

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```

## circle

cx
cy
r

```
<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
```

## ellipse
## line
## polyline
## polygon
## path
## rect
## rect
## rect
## rect


# svg文件模板

```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!-- <tag></tag> -->
</svg>
```

standalone 属性表示此 SVG 文件是否是"独立的"。
dtd文件位于 http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd
该命名空间中包含所有常用命名空间声明。

# 命名空间

”命名空间声明“告诉用户代理标记名称属于哪个方言。
使用xmlns属性标识。
命名空间声明只需要在根标记上提供一次。
如果根标记的所有后代也被定义在默认命名空间中。需要使用嵌套的命名空间时，再次命名。则会在其及之后使用该命名空间。

```
document.createElementNS('http://www.w3.org/2000/svg', 'rect')
rect.getAttributeNS('null, 'x')
```

xml xml方言。
dtd

# dtd

仅用于验证。




