## 新特性  

1. 语意特性。heaher/nav/article/section/  
2. 多媒体。video/audio  
3. 图像效果。canvas/svg。  
4. 离线 & 存储。 localStorage/sessionStorage/cookie  
5. 设备兼容特性。  
6. 连接特性。Server-sent Event/WebSockets，可以实现从服务端向客户端推送信息、数据的功能。  
7. 性能和集成特性。html5会通过XMLHttpRequest2等技术，实现网站在多样化的的环境中更快速的完成工作。  

## 新增的标签
### embed
插入的内容。如：插件

- width
heigh
src
type

### object

用于在xhtml中添加一个对象。
可以包括图像、音频、视频、java applets、activex、pdf、flash……
主流浏览器都使用不同的代码实现加载类型。
为实现对应每个浏览器的object，可以使用要多个object元素。

### iframe

包含在另一个文档中的内联框架。

frameborder  1/0
height       px
width        px
longdesc     url         与该页面的相关描述
marginheight             上下的边距
marginwidth              左右的边距
name
sandbox                  启用一系列对iframe中内容的额外限制
scrolling    yes/no/auto 是否出现滚动条
seamless     seamless
src
srcdoc       html_code   在iframe中显示的页面的html内容

### template

`<template>`元素的出现旨在让HTML模板HTML变得更加标准与规范。

就是html的模板盒子

1.跟script标签一样在文档中是不可见的；
2.拥有content属性（通过这个也可以判断浏览器是否支持template标签）；
3.标签内的节点虽然不可见但支持DOM操作；

importNode() 方法把一个节点从另一个文档复制到该文档以便应用。

DocumentFragment是一个节点类型，代表轻量级的 Document 对象，能够容纳文档的某个部分，DocumentFragment 节点不属于文档树。



