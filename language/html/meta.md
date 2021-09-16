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