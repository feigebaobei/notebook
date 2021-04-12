# markdown-it-anchor

为 markdown-it 设计的标题锚点

## Installation
s
```
npm i markdown-it-chain --save
```

## Usage

```
const md = require('markdown-it')()
  .use(require('markdown-it-anchor'), opts)
```
### options

|名称|描述|默认值|
|-|-|-|
|level|               若传入数字，代表最少包含的渲染层级；若传入一个数组，则会渲染数组中选定的层级|1|
|slugify|             生成有效url的自定义函数|                                            function.详见 index.js|
|uniqueSlugStartIndex|使重复锚点变得唯一的新增起始索引|                                     1|
|permalink|           是否在标题旁加入永久链接|                                           false|
|renderPermalink|     自定义永久链接渲染函数|                                             详见 index.js|
|permalinkClass|      生成永久链接的|                                                    class 名称.header-anchor|
|permalinkSpace|      标题和锚点之间放置空格|                                             true|
|permalinkSymbol|     永久链接的符号|                                                    .¶|
|permalinkBefore|     将永久链接放在标题的前面|                                           .false|
|permalinkHref|       自定义渲染|                                                       href 函数.详见 index.js|
|permalinkAttrs|      自定义标题渲染函数|                                                .详见 index.js|
|callback|            渲染后的|                                                        callback 函数.|

## API

[](https://github.com/neutrinojs/webpack-chain)
