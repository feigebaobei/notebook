# markdown-it-container

为`markdown-it`创建一个块级自定义内容。

## Installation

```
npm i markdown-it-container --save
```

## Usage

这个库的使用方法:
```
::: warning
*here be dragons*
:::
```
渲染结果：
```
<div class="warning">
<em>here be dragons</em>
</div>
```
若没有指定容器，则默认使用`div`

## API

```
var md = require('markdown-it')()
            .use(require('markdown-it-container'), name [, options]);
```
name:         容器的名字。
options: {
    validate: 验证开始标记的尾部。若返回true，则继续执行。 选填
    render:   渲染方法。                  选填
    marker:   设置定界符。                 选填
}

```
var md = require('markdown-it')();
 
md.use(require('markdown-it-container'), 'spoiler', {
 
  validate: function(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },
 
  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
 
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
 
    } else {
      // closing tag
      return '</details>\n';
    }
  }
});
 
console.log(md.render('::: spoiler click me\n*content*\n:::\n'));
// 此处的spoiler就与validate中的spoiler相对应。
 
// Output:
//
// <details><summary>click me</summary>
// <p><em>content</em></p>
// </details>
```

