# 1像素问题
## 原因
ui图中以物理像素为准。css中以逻辑像素为准。二者之间有一个比例。
得到比例的方法： 
- 通过js的`window.devicePixelRatio`。
- 通过媒体查询`-webkit-min-device-pixel-ratio`.
该比例与设备有关。

## 解决方案
### 媒体查询
```
.border {
    border: 1px solid #234;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border {
        border: 0.5px solid #234；
    }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border {
        border: 0.3333px solid #234；
    }
}
```
### viewport + rem
```
// html
<meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

// js
var viewport = document.querySelector("meta[name=viewport]")
if (window.devicePixelRatio == 1) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
} 
if (window.devicePixelRatio == 2) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no')
} 
if (window.devicePixelRatio == 3) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.333333333, maximum-scale=0.333333333, minimum-scale=0.333333333, user-scalable=no')
} 
var docEl = document.documentElement;
var fontsize = 10 * (docEl.clientWidth / 320) + 'px';
docEl.style.fontSize = fontsize;
```

### border-image
```
.border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url("border.png") 2 0 stretch;
    border-image: url("border.png") 2 0 stretch;
}
```

### box-shadow
```
.border {
    -webkit-box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
}
```

### transform
```
.border {
    height: 1px;
    background: #234;
    overflow: hidden;
    box-sizing: border-box;
    transform: scaleY(0.5);
}
// or
.border::after {
    content: '';
    width: 100%;
    border-bottom: 1px solid #000;
    transform: scaleY(0.5);
}
// .border::before 同理
```

### 媒体查询 + transform
```
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border {
        transform: scaleY(0.5)
    }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border {
        transform: scaleY(0.3333)
    }
}
```