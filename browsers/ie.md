
|||||
|-|-|-|-|
|!|[if !IE]|不是ie||
|lt|[if lt IE5.5]|`<ie5.5`||
|lte|[if lte IE 8]|`<=ie8`||
|gt|[if gt IE 8]|>ie 8||
|gte|[if gte IE 9]|>=ie 9||
|()|[if !(IE 7)]|不是ie7||
|&|[if (gt IE 5) & (lt IE 7)]|`>ie5并<ie7`||
|`|`|[if (IE 6) | (IE 7)]|ie 6 或 ie 7||

<![if IE 9]-->
<!end if-->

propertychange

<input onchange="fn" />
<input oninput="fn" />
<input onpropertychange="fn" />
$('input').bind('input propertychange', fn) // 兼容ie的绑定input事件。

attachEvent(eventName, fn)
detachEvent(eventName, fn)
event.srcElement
event.cancelBubble = true

#ie的兼容问题
这里总结了我的平时工作、学习中遇到的ie兼容问题。  

- 高版本jq不支持ie低版本。
- ie不支持html新标签
- ie不支持css新标签
- 360兼容模式使用ie内核，极速模式使用webkit内核。
- onchange,onkeyup,onkeypress,onkeydown

##ie的处理方法
![](./image/ie0.png)

|windown.navigate|window.location.href|
|-|-|
|只针对ie|兼容所有浏览器|
|都是实现页面跳转的方法|都是实现页面跳转的方法|
