# 引入css的方法。

1. 行内样式
1. 内部样式 `<style type="text/css"></style>`
1. 外部样式

```
// 链接式
<link type="text/css" rel="styleSheet" href="path/to/file.css" />
属于xhtml
优先加载

// 导入式
<style type="text/css">
  @import url("path/to/file.css")
</style>
属于css2.1
先加载html结构再加载css文件。
```
