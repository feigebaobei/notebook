css 字体
`@font-face`自定义字体。
顺序图
```
1. 使用字体名。
2. 若本地有该字体，则使用本地字体。否则使用`url`指定的链接去下载后再使用。
```
```
@font-face: {
    font-family: 'Open Sans'                 // 字体名
    src: local(font),                        // 字体数据的地址。可使用本地（local），也可使用远端（url）。它可以有多个值，各值间使用逗号分隔。值的优先级递减。
        url(path/to/font.svg) format("svg"),
        url(path/to/font.woff),
        url(http://path/font.ttf);
    font-variant:                            // 不会，好象是标明衬线的。
    font-stretch                            // 不会
    font-weight                            // 字重
    font-style                              // 斜体
    unicode-range                            // unicode的范围。
}
``` 
顺序图
```
1. 使用@font-face自定义字体。
2. 在css选择器中使用该字体。
3. 使用css选择器。
```