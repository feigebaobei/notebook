
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
