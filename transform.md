#transform

`transform` 改变、变形。  
`translate` 调动、转化、翻译。  
`transition` 过渡

**transform**  

    matrix()
    matrixe3d()
    translate(x,y)
    translate3d(x,y,z)
    translateX(x)
    translateY(y)
    translateZ(z)
    scale(x,y)
    scale3d(x,y,z)
    scaleX(x)
    scaleY(y)
    scaleZ(z)
    rotate(angle)
    rotate3d(x,y,z,angle)
    rotateX(angle)
    rotateY(angle)
    rotateZ(angle)
    skew(x-angle, y-angle)
    skewX(angle)
    skewY(angle)
    perspective(n)

|名称|描述|默认|属性|
|-|-|-|-|
|transform-origin|变形时的原点位置|center center|x-axis y-axis z-axis; // top left right bottom x% xpx|
|transform-box|定义排版盒子|border-box|fill-box, view-box, inherit, initial, unset|
|transform-type|嵌套元素是怎样在三维空间中呈现的|flat 二维| preserve-3d 三维|

**zoom**

|zoom|scale|
|-|-|
|相对于左上角|默认中居中缩放|
|改变元素占据的空间|不改变占据空间大小。原始尺寸不变。页面布局不会受到影响。|
|性能较差|较好|
|||

    1. 缩放相对于左上角。

