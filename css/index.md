perspective 查看一个元素的距离 number|none 单位是px

# 1px问题

## 问题

在不同dpi设备上显示1px时，视觉上不同的问题。

## 原因

dpi不同，处理1px时使用的像素点数量不同。

## 解决方案

```
.retina-border {
  border: 1px solid #333;
  width: 100%;
  height: 100%;
}
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
  .retina-border {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
  }
}
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
  .retina-border {
    width: 300%;
    height: 300%;
    transform: scale(0.33);
  }
}
```

# css伪类

```
// 语法
selector:pseudo-class {
  ...
}
```

:checked
:disabled
:empty
:enabled
:first-of-type   不会
:in-range        选择元素指定范围内的值
:invalid         选择无效的元素
:last-child
:last-of-type
:not(selector)
:nth-child(n)
:nth-last-child(n)
:nth-last-of-type(n)
:nth-of-type(n)
:only-of-type
:only-child
:optional
:out-of-range
:read-only
:read-write
:root
:target
:valid
:link
:visited
:active
:hover
:focus
:first-letter
:first-line
:before
:after
:lang(language)

# 盒模型

box-sizing: content-box | border-box
            标准盒模型     ie盒模型

margin
  border
    padding
      content
    padding
  border
margin


## 标准盒模型

width: content的宽度
height: content的高度

## ie盒模型

width: content + padding + border
height: content + padding + border


