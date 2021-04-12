# highlight.js

- 写js代码时高亮。
- 它可以在浏览器正常工作就像在服务器上工作一样。
- 它可提高工作效率。
- 它不依赖其他框架。
- 可以自动检测语言。

## Installation

```
npm i markdown-it --save
```

## Usage

### getting started
使用该包的最小成本是引入js脚本，再引入一种样式文件，然后调用`highlightAll()`。
```
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```
其进行结果是使用`<pre><code>`包裹代码。该包会自动检测语言。若不想让它自动检测，可以设置`class="<lang>"`，如`class="html"`。也可以使用前缀`language-`或`lang-`。
#### 纯文本、不使用高亮
```
<pre><code classs="plaintext">...</code></pre>
<pre><code classs="nohighlight">...</code></pre>
```

### 自定义

使用`highlightBlock`/`configure`方法可以自定义配置项。
```
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
    })
})
```
作者强烈建议在`<pre><code>`中代码。若要非要不这么写，则需要处理换行符的问题。下例中使用div包裹代码。
```
// js
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('div.code').forEach(block => {
        hljs.highlightBlock(block)
    })
})
// css
div.code {
    white-space: pre;
}
```
### using with vue.js

```
// in main.js
Vue.use(hljs.vuePlugin) // for vue2
let app = createApp({...})
app.use(hljs.vuePlugin) // for vue3
// in component
<template>
    <highlightjs autodetect :code="codeData"/>
    <highlightjs autodetect code="var x = 5;"/>
</template>
```

### using with web workers

```
// main.js
addEventListener('load', () => {
    const code = document.querySelector('#code')
    const worker = new Worker('worker.js')
    worker.onmessage = (event) => {code.innerHTML = event.data}
    worker.postMessage(code.textContent)
})
// worker.js
onmessage = (event) => {
    importScripts('<path>/highlight.min.js')
    const result = self.hljs.highlightAuto(event.data);
    postMessage(result.value);
}
```
作者真够细心的。还这个都写。害得我也得跟着写一遍。

### using with node.js

```
const hljs = require('./highlight.js')
const highlightedCode = hljs.highlightAuto('<span>Hello world!</span>').value

const hljs = require('highlight.js/lib/core');  // require only the core library
// separately require languages
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
const highlightedCode = hljs.highlight('<span>Hello World!</span>', {language: 'xml'}).value
```

### using with es6

```
// 默认引入全部语言
import hljs from 'highlight.js';                                 

// 只引入需要的语言
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
// 也可以直接引入样式
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
```




### using with vue.js

## 获得库

```
//
r.js -o name=hljs paths.hljs=/path/to/highlight out=highlight.js

// cdnjs
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/languages/go.min.js"></script>

// jsdelivr
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/languages/go.min.js"></script>

// unpkg
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.7.2/styles/default.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@10.7.2/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://unpkg.com/@highlightjs/cdn-assets@10.7.2/languages/go.min.js"></script>
```

## API

[api](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options)
