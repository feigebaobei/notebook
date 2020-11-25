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

