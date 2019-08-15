## lab.js

一种js loader  
尽可能地并行下载待加载的js.  
小巧同时强大。  

### usage

    // demo
    <script src="../lab.js"></script> // 引入lab.js后才能使用lab.js
    // 展示一个加载链。
    // 可以有多个加载链。
    $LAB.script('s1.js').script('s2.js')
    .wait() // 加载完成s1.js及s2.js后再执行以下代码。
    .script('s3.js')
    .wait(function() { // 加载完成s3.js后再执行以下代码。
        a()
        b()
    })

### api

setGlobalDefaults() // 全局配置。
setOptions() // 当前加载链配置。  
script() // 加载的js文件。  
wait() // 是否依赖前者。加载完成后执行callback(可省略)  

### configuration

UseLocalXHR // boolean default:true 是否使用xhr在本地主域名上预加载脚本。  
AlwaysPreserveOrder // false 是否严格使用加载链。  
AllowDuplicates // true 是否允许重复加载相同url文件。  
CacheBust // false 是否使用清除缓存参数。（会添加在末尾）。  

### 实现原理

有三个加载方法。  

1. XHR Injectoin  
2. script dom element  
3. cache tirck  