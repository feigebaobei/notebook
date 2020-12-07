# history

使用history的Api来进行控制浏览器的历史记录及前进/后退键；

var h = window.history

h: {
  length() // 历史记录数量
  state // 只读，返回历史栈顶部的值。常用于查看。
  scrollRestoration: 'auto' // 是否允许滚动恢复行为。
  back(number)
    // back(0) 刷新
  forward(number)
  go(number)
  pushState(data, title, url)
    // 新增一条历史记录。
    // data是onpopstate事件触发时的参数。
  replaceState(data, title, url)
}

## window.onpopstate

浏览器内置的点击事件。

## 调用方法

```
history.pushState()
// <=>
window.history.pushState()
```