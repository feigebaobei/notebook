
## dom.classlist属性

```
var dom = document.querySelector('div')
let classlist = dom.classlist
```

|属性、方法|params|返回|说明|
|-|-|-|-|
|length||类的数量||
|add(a, b, ...)||||
|contains(a)||boolean||
|item(index)||string / null||
|remove(a, b, ...)||||
|`toggle(class, true|false)`|boolean是强制添加、移除。||切换类|

## onhashchange事件

ie8+ Firefox 3.6+ Chrome 5+ Safari 4.0+
windown.location.hash // 得到url中fragment值。无#
```
window.onhashchange = fn
<body onhashchange="fn()" />
window.addEventListener('hashchange', fn, false)
```
