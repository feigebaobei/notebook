# meta
## description
<meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
放在`<header>`内。

## 属性
||value|description|default||
|-|-|-|-|-|
|content|string|与http-equiv、name相对应的值|-||
|http-equiv|'content-type' / 'expires' / 'refresh' / 'set-cookie'|把 content 属性连接到一个 HTTP 头部。|-||
|name|'author' / 'description' / 'keywords' / 'generator' / 'revised' / 'others'|把 content 属性连接到某个名称。|-||
|scheme|string|设置或返回用于解释 content 属性的值的格式。|-||

## meta对象
```
let meta = document.getElementByTagName('meta')[0]
meta: {
    content,
    http-equiv,
    name,
    scheme,
}
```

## viewport
可分为：
- layout viewport 布局视口 受到动态键盘、地址栏是否显示影响
- visual viewport 视觉视口 总是不变

iframe/svg中都有自己视口。

在移动设备中一般视口大小小于页面大小。若页面中无视口相关设置，则被设备浏览器缩放页面后全视口显示。一般会做如下设置：
```
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=3, minimum-scale=0.5, user-scalable=yes" />
```

|||||||
|-|-|-|-|-|-|
|width||正整数或设备宽度device-width||||
|height||正整数或device-height||||
|initial-scale||整数或小数||||
|maximum-scale||整数或小数||||
|minimum-scale||整数或小数||||
|user-scalable||yes/no||||

## viewport-fit="cover"
因iphone x自作聪明搞坏了页面布局。只好想一个补救办法。
```
<meta name="viewport" content="viewport-fit=cover">
.class {
   padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
}
```