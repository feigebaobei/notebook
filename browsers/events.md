# 事件

事件冒泡会从当前触发的事件目标一级一级往上传递，依次触发，直到document为止。
事件捕获会从document开始触发，一级一级往下传递，依次触发，直到真正事件目标为止。

## 事件流

标准事件流
  捕获阶段 - 目标阶段 - 冒泡阶段
ie事件流
  目标阶段 - 冒泡阶段

## 鼠标事件

## 事件对象

```
MouseEvent: {
  altKey: false // 是否按下alt
  bubbles: true // 是否是冒泡阶段
  button: 0
  buttons: 0
  cancelBubble: false
  cancelable: true
  clientX: 463
  clientY: 77
  composed: true
  ctrlKey: false
  currentTarget: null
  defaultPrevented: false
  detail: 1
  eventPhase: 0
  fromElement: null
  isTrusted: true
  layerX: 463
  layerY: 23157
  metaKey: false
  movementX: 0
  movementY: 0
  offsetX: 133
  offsetY: 37
  pageX: 463
  pageY: 23157
  path: (6) [h2#Proxy-revocable.Proxy-revocable, div#content, body, html, document, Window]
  relatedTarget: null
  returnValue: true // 是否不阻止默认行为
  screenX: 463
  screenY: 211
  shiftKey: false
  sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
  srcElement: h2#Proxy-revocable.Proxy-revocable
  target: h2#Proxy-revocable.Proxy-revocable
  timeStamp: 4569151.805000002
  toElement: h2#Proxy-revocable.Proxy-revocable
  type: "click"
  view: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
  which: 1
  x: 463
  y: 77
  __proto__: MouseEvent
}
```

event.stopPropagation // 阻止冒泡

## 老ie

无addEventListener/removerEventListener
有attachEvent(eventName, fn) / detachEvent(eventName, fn)
事件源（与event.target相同）srcElement
阻止事件冒泡 event.cancelBubble = true
```
function stopPropagation (event) {
  event = event || window.event
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}
```

// 阻止事件默认行为
```
function preventDefaut (event) {
  event = event || window.event
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}
```

## 非事件委托

$(domSel).on(eventName, fn)

## 事件委托

$(domSel).on(eventName, 被委托的元素, fn)
事件委托利用了事件冒泡。若阻塞冒泡则，无法完成事件委托。

document.getElementById('id').addEventListener('click', function (event) {
  var target = event.target
  let ele = target.nodeName.toLowerCase()
  switch (ele) {
    case: 'p'
      fnp()
      break
    case: 'h2'
      fnh2()
      break
    case: 'span'
      fnspan()
      break
    default
      fndefault()
      break
  }
})

## 统一浏览器的差异


```
let bindEvent = function (dom, type, fn, data) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    var data = data || {}
    dom.attachEvent('on' + type, function (e) {
      fn.call(dom, e, data)
    })
  } else {
    dom['on' + type] = fn
  }
}
```

```
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function(){obj["e"+type+fn]( window.event );}
    obj.attachEvent("on"+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
  if ( obj.detachEvent ) {
    obj.detachEvent("on"+type, obj[type+fn] );
    obj[type+fn] = null;
  } else
    obj.removeEventListener( type, fn, false );
}
```

## addEventListener

document.addEventListener('mousedown', fn, false)
document.addEventListener('keydown', fn, false)
事件名
方法
Boolean true  捕获阶段执行
        false 冒泡阶段执行

事件委托
switch
## 针对ie
<!--[if IE 9]> ... <!end if-->

## CustomEvent

new CustomEvent(type, options)
type 事件类型
option {
  bubbles: boolean,
  cancelable: boolean,
  detail: 初始化时传递的数据
}



属性

new CustomEvent(detail)
CustomEvent.detail

|CustomEvent||||
|-|-|-|-|
|detail||||

|Event||||
|-|-|-|-|
|bubbles||||
|cancelBubble||||
|cancelable||||
|composed||||
|currentTarget||||
|deepPath|捕获路径|||
|defaultPrevented||||
|eventPhase||||
|explicitOriginalTarget||||
|originalTarget||||
|returnValue||||
|srcElement||||
|target||||
|timeStamp||||
|type||||
|isTrusted|true 浏览器触发 false js触发|||

方法

CustomEvent.initCustomEvent()
|||||
|-|-|-|-|
|initCustomEvent()||||
|composedPath()|事件的捕获路径|||
|preventDefault()|若可取消，则取消事件。|||
|stopImmediatePropagation()||||
|stopPropagation()|不传播事件|||

**不建议使用event.initEvent('eventName', 是否可以冒泡, 是否无法被取消)**

## 自定义事件

// 创建事件
let mye = new CustomEvent('hi', {detail: 'from hi'})
// 绑定事件
window.addEventListener('hi', function(e) {console.log(e)})
// 分发事件
window.dispatchEvent(mye)

## onchange & oninput & onpropertychange

||||
|-|-|-|
|onchanage|当内容改变且失去焦点时触发||
|onpropertychange|实时触发。当disable=true时不触发。ie专用。||
|oninput|非ie浏览器都支持，当用户改变value时触发，js改变value时不触发。可使用addEventListener()注册。||
