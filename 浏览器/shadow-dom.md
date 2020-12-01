# Shadow DOM

浏览器现在还支持的不太好。
可直译为影子dom.
它是
它们是实际存在的，但是对用户隐藏。在 chrome 中，我们可以通常审查元素去查看它们的具体 DOM 实现。
shadow-dom 其实是浏览器的一种能力，它允许在浏览器渲染文档（document）的时候向其中的 Dom 结构中插入一棵 DOM 元素子树，但是特殊的是，这棵子树（shadow-dom）并不在主 DOM 树中。
dom子树是被隐藏起来的。原因：浏览器开发者不想让程序员控制一堆应该有应有功能的dom.如播放按钮，就是用于播放的。浏览器封装好了，就避免了程序员写错的可能。

pseudo
chrome 浏览器可审查 shadow dom.其他浏览器不可审查。

document
shadow host: shadow dom 的宿主。
shadow root: shadow dom 的根元素
contents: shadow root 的后代元素

## 当前的问题

部件中的dom不够封闭。表现如下：
  1. id冲突。
  2. 样式被覆盖
  3. js无意修改某些dom

## shadow dom 可解决dom封装问题。

需要使用chrome 25+
api需要加`webkit`前缀。

## 开通审查功能

`settings - preferences - elements里的 show user agent shadow DOM`

## 开通开发功能

url中输入：`about:flags`
'Experimental Web Platform features' 设置为 'enabled'
一般需要重启浏览器。

```
var div = document.querySelector('div')
div
```


