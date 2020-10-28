# 浏览器原理

## 多进程架构

浏览器的功能分为若干进程。每个进程（process）承担一个职责，多个进程间互不影响。进程间互相配合共同完成浏览器的整体功能。每个进程由若干线程（thread）组成，线程间协同工作，配合完成所在进程的职责。

```
|---------------------------------------------------|
|                                                   |
|             thread           thread               |
|         ----------       ----------               |
|         |        |       |        |               |
|         |        |       |        |               |
|         |-->     ^       |-->     ^               |
|                  |                |               |
|                                                   |
|                                                   |
| Process                                           |
|---------------------------------------------------|
```

若在计算机中启动一个进程，则计算机会开辟一部分内存运行该进程。该进程产品的数据都在该内存中。若计算机关闭该进程，则该内存会被释放。

一个进程可以要求计算机开辟另一个进程。进程间使用ipc(inter process communication)通信。

## 浏览器的架构
不同的浏览器使用不同的架构方式。
可以是一个进程多个线程，也可以是多个进程多个线程。

```
|-------------------------------------------------------------------------------------|
|                                                                                     |
|    |----------------------|  |----------------------|  |---------------------|      |
|    |                      |  |                      |  |                     |      |
|    |  Network Process     |  |  Browser Process     |  |  UI Process         |      |
|    |                      |  |                      |  |                     |      |
|    |----------------------|  |----------------------|  |---------------------|      |
|                                                                                     |
|    |----------------------|  |----------------------|  |---------------------|      |
|    |                      |  |                      |  |                     |      |
|    |  Storage Process     |  |  GPU Process         |  |  Device Process     |      |
|    |                      |  |                      |  |                     |      |
|    |----------------------|  |----------------------|  |---------------------|      |
|                                                                                     |
|    |----------------------|  |----------------------|  |---------------------|      |
|    |                      |  |                      |  |                     |-|    |
|    |  Render Process      |  |  Plugin Process      |  |  xxx Process        | |    |
|    |                      |  |                      |  |                     | |    |
|    |----------------------|  |----------------------|  |---------------------| |    |
|                                                           |--------------------|    |
|                                                                                     |
|-------------------------------------------------------------------------------------|
```

## Chrome 的主要进程及其职责

chrome为用户提供了任务管理器。`右上角的更多按钮-更多工具-任务管理器`。

### Browser Process

1. 负责地址栏、书签栏、前进、后退……功能。
2. 负责处理浏览器一些不可见的底层操作。如网络请求、文件访问。

### Render Process

负责渲染

### Plugin Process

负责控制浏览器中的插件。如flash

### GPU Process

负责处理与gpu相关的工作

### 优点

1. 多进程间互不影响。
2. 为不同进程设置不同权限。更安全。

### 缺点

1. 进程间内存不共享。

### iframe的渲染。site isolation

chrome可以在同一个tab内渲染多个嵌套的iframe.

## 导航过程

主要由Browser Process负责。其内有三个线程：
1. UI thread
2. network thread
3. storage thread

### ui thread

判断输入的是url还是query.

### network thread

执行dns查询。然后建立tls连接。
根据content-Type/MIME判断响应内容的格式。若为html等可响应内容，则将数据传递给render process.否则将数据传递给下载管理器。

### 渲染进程

network thread确保浏览器可以导航到请求的网页。然后network thread通知ui thread处理数据。ui thread查找render process去渲染页面。
js代码只会在render Process中启作用。不会触及别的进程。

### 确认导航

BrowserProcess会给render Process发送ipc消息，去完成渲染工作。渲染完成后更新地址栏。
把渲染的结果放在硬盘里。

## 渲染工作

Render Process主要包括以下线程：
1. main thread
2. worker thread 工作线程
3. compositor thread 排版线程（或合成器线程）
4. raster thread 光栅线程

主线程解析文本字符串(html)为dom.即把html渲染为dom。
若在html中发现img/link等标签。preload scanner会请求Browser Process中的network thread同时下载相关资源。
当遇到script标签时，会阻塞渲染。若script标签中有`async / defer`等属性时，不会阻塞渲染。
基于css选择器解析css.作用于每一个元素。
创建布局树。根据dom元素的坐标、盒子大小创建。
绘制各元素是会遍历布局树。并创建绘制记录。
合成帧。主线程遍历布局树，生成层树。main thread 调用 compositor thread，生成磁贴。磁贴会存储在gpu中。再由gpu process合成帧。合成器线程不需要等待样式计算、js执行。这就是为什么合成器相关的动画最流畅。

## 浏览器对事件的处理

用户在浏览器上的手势会被browser Process捕获。然后browser process通知render process处理事件。
js代码由render process里的main thread处理。
在页面被渲染时合成器线程会标记页面中绑定了事件的区域（non-fast scrollable region）。若该区被触发，则合成器会把要发生在此区块内的事件发送给主线程。否则合成器合成新的帧。
当main thread被compositor thread触发后main thread在处理完事务后再触发compositor thread.此过程中因main thread的工作，所以compositor thread不能流畅地完成工作，所以会慢。

### 找到事件对象

main thread会在渲染过程中生成的绘制记录中查找事件发生的坐标下存在的元素。

### 事件的优化

## 浏览器的渲染过程

一般分为加载、解析、渲染，三个过程。  
这三个过程不是完全独立的。有时会有交叉。即一边加载、一边解析、一边渲染。  

DOM: Document Object Model  
CSSOM: CSS Object Model  
Render Tree： DOM/CSSOM合并后生成Render Tree.  
Layout: 计算出Render Tree每个节点的具体位置。  
Painting: 通过显卡，将Layout后的节点内容分别呈现到屏幕上。  

![render tree](./image/renderTree.jpg)  

## 加载  

加载html时自上向下加载。  
遇到css.并行加载。  
遇到js.挂起渲染的线程。等js下载完成后，再继续下载html.  

1. html加载完后按照深度优先遍历来生成dom树。  
2. css加载完后生成相应的cssom.  
3. 再结合dom+cssom=>Render Tree  

## 渲染  

![render tree 2](./image/renderTree2.jpg)  

1. 把dom加载进来。  
2. 计算css样式。把相应的样式给与相应的dom元素上。  
3. 创建rander tree.  
4. 计算布局。（包括大小、定位、换行等。）  
5. 呈现在屏幕上。  

### Reflow  

回流。  

只要有dom元素的发生变化影响到了布局。就会发生回流。从html标签开始依次向下递归。进行从新布局。  
display
visibility
改变窗口大小
改变位置
改变字号
添加、删除dom元素

### Repaint

重绘。  

一个元素发生变化，不影响布局时，发生重绘。只对这一个元素修改。  
改变字体颜色、


