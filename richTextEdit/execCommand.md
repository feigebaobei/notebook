# `document.execCommand`

## overview
> document暴露的execCommand方法，是允许运行命令操作可编辑内容区域的元素。

### feature
- selection
- indent
- ……(操作文本)

## install
它浏览器document对象的属性，只能在浏览器中使用。不需要安装。

## usage
```
document.execCommand(aCommandName, aShowDefaultUI, aValueArgument) -> boolean // 是否被支持
aCommandName     DOMString 命令
aShowDefaultUI   boolean   是否展示用户界面。mozilla不支持。
aValueArgument   aCommandName需要的参数
```
请在使用此命令前先根据返回值判断浏览器是否支持。
HTMLElement.contentEditable 判断是否可编辑
    "true"      可编辑
    "false"     不可编辑
    "inherit"   从祖先元素继承来的可编辑
document.querySelector('#editBox').contentEditable = "true" // 设置为可编辑对象。

## 浏览器兼容性很好

## api
### command
|command|description|compatibility|params||
|-|-|-|-|-|
|backColor|文本容器的背景色||||
|bold|||||
|ClearAuthenticationCache|||||
|contentReadOnly||-ie|||
|copy|||||
|createLink|||||
|cut|||||
|decreaseFontSize|small||||
|defaultParagraphSeparator|||||
|delete|||||
|enableAbsolutePositionEditor|启用或禁用允许移动绝对定位元素的抓取器||||
|enableInlineTableEditing|启用或禁用表格行和列插入和删除控件。|-ie|||
|enableObjectResizing|启用或禁用图像和其他对象的大小可调整大小手柄|-ie|||
|fontName|||||
|foreColor|修改文本颜色||||
|formatBlock|格式化为块元素||||
|forwardDelete|||||
|heading||-ie-safari|||
|hiliteColor|修改背景色||||
|increaseFontSize|big|-ie|||
|indent|||||
|insertBrOnReturn|按下回车时输入br||||
|insertHorizontalRule|||||
|insertHTML|||||
|insertOrderedList|||||
|insertParagraph|||||
|insertText|||||
|italic|||||
|justifyCenter|||||
|justifyFull|||||
|justifyLeft|||||
|justifyRight|||||
|outdent|||||
|paste|||||
|redo|||||
|removeFormat|||||
|selectAll|||||
|strikeThrough|开启、关闭删除线||||
|subscript|||||
|superscript|||||
|underline|||||
|undo|||||
|unlink|||||
|useCss||-ie|||
|styleWithCSS|||||

## todo
> 可以基于此开发富文本编辑器（rich text editer）