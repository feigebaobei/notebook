## Blob

原始数据就是基本数据（number, string, boolean, null, undefined, symbol）
Blob是包含原始数据的类文件对象。这些原始数据只读。
基于Blob开发了File对象  
Blob有三种得到方法：  

1. 使用构造函数。`new Blob(data, option)` data 类数组对象、另一个blob、domstring optoin: {tyep: 'MIME', endings: 'transparent(写入行结束符\n) / native(使用适合宿主的换行符) '}
2. 从另一个Blob对象上切出来。 `otherBlob.slice(start, end)` 非现代浏览器有兼容问题。  
3. 从canvas（dom）对象上得到。`canvas.toBlob()` // 需要确定这个方法是否正确

Blob有一个方法（slice）
Blob有两个属性（size / type）

### 构造函数

new Blob(data, option)

data 是一个类数组、数组。Blob会把（类）数组时的每一个元素使用串联方式生成blob对象。

### 什么地方会用到blob

大文件分割。  
图片跨域请求。  https://createjs.com/docs/preloadjs/files/preloadjs_loaders_ImageLoader.js.html#l37
隐藏视频源路径。  

    var video = document.getElementById('video')
    var obj_url = URL.createObjectURL(blob)
    video.src = obj_url
    video.play()
    URL.revokeObjectURL(obj_url)
