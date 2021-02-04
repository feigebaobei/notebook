
# 常用的属性

## x
## y
## width
## height
## viewport

svg标签所占的区域大小
```
```
svg中子标签不能带单位，单位在svg标签中初始化。

## viewbox

svg在viewport中的实际占位。

```
viewbox="x y width height"
```

## preserveAspectRatio

viewport/viewbox的对齐方式。
```
preserveAspectRatio="align meetOrSlice"
```
align包括x/y轴的对齐方式 "x-axis y-axis"
x-axis 对齐方式
xMin xMid xMax
y-axis 对齐方式
YMin YMid YMax

meetOrSlice
meet（内嵌）默认值 以scale_x scale_y中最小值为缩放标准。
slicer（裁剪） 以scale_x scale_y中最大值为缩放标准。
none（） 缩放时扭曲比例。

# 常用标签
## rect

```
<svg width="200" height="150" viewBox="0 0 200 100">
  <rect x="50" y="0" rx="10" ry="20" width="100" height="80" style="fill: red; stroke-width: 1; stroke:rgb(0, 0, 0)" fill-opacity=".5" opacity=".8" stroke-opacity=".4"></rect>
</svg>
```

## circle

```
<svg width="200" height="100" viewBox="0 0 200 100">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"><circle>
</svg>
```

## ellipse

```
...
<ellipse cx="100" cy="50" rx="50" ry="30" style="fill: yellow; stroke: purple; stroke-width: 2" />
...
```

## line
```
<line x1="0" y1="0" x2="200" y2="100" style="..."></line>
```
## polygon

最后一个点会自动与起始点相连
```
<polygon points="100, 10 40, 180 190, 60 10, 60 160, 180" style="..."></polygon>
```


## polyline

最后一个点不会自动与起始点相连
```
<polyline points="...."></polyline>
```

## path

用于路径数据的命令。
（这些命令指明当前点使用何种方式处理）
（大写表示绝对定位，小写表示相对定位）
m moveto 定义起点
l lineto 重新定义起点
h horizontal lineto 画一条指定长度的水平直线
v vertical lineto 画一条指定长度的竖直直线
z closepath 与开始的点连起后结束，后面没有数据。
c curveto 三次贝塞尔曲线，需要三个点。
s smooth curveto 一般与c组合使用，组成反射贝塞尔曲线
  c/s组合
q quadratic belzier curve 二次贝塞尔曲线，需要二个点。
t smooth quadratic belzier curveto 贝塞尔曲线的延长线。需要一个点。
  q/t组合
a elliptical arc 弧线
  rx ry x-axis-rotation large-arc-flag sweep-flag x y
  长轴 短轴 x轴的旋转角度 [0]:大弧[1]:小弧 [0]:顺时针的弧[1]:逆时针的弧 弧长的结束点（开始点是上一个命令的终点）

## clipPath

超出指定区域的部分不显示。

```
<clipPath id="id">
  <circle .../>
</clipPath>
<rect clip-path="url(#id)" ...></rect>
```

## g

group的简写
组内的元素可使用g上定义的样式。
use可以使用被定义后的g。

```
<g fill="blue" id="id">
  <circle cx="30" cy="20" r="15" />
</g>
```

## use

深度克隆节点。

```
<g id="id">...</g>
<use x="20" y="30" xlink:href="#id"/>
```

## defs

在svg中预定义一组元素。需要与g组合使用。
```
<defs>
  <g id="id">
    ...
  </g>
</defs>
<use xlink:href="#id" x="50" y="50"/>
```

## symbol 模板

定义一个图像模板。等价于defs+g。
在uses标记实例化symbol模板。可以在svg文档是反复使用。
```
<svg viewBox="0 0 150 150" height='300'>
  <symbol id="sym01" viewBox="0 0 150 110">
    <circle cx="50" cy="50" r="40" stroke-width="8" stroke="red" fill="red"/>
    <circle cx="90" cy="60" r="40" stroke-width="8" stroke="green" fill="white"/>
  </symbol>

  <use xlink:href="#sym01"
    x="0" y="0" width="100" height="50"/>
  <use xlink:href="#sym01"
    x="0" y="50" width="75" height="38"/>
  <use xlink:href="#sym01"
    x="0" y="100" width="50" height="25"/>
</svg>
```

## text

文本或文本组。

## tspan

文本组内文本。
```
<text x="10" y="50" fill="red">
  hello
  <tspan x="10" y="70">string</tspan>
  <tspan x="10" y="90">string1</tspan>
</test
```

# style的属性


## fill

16进制
rgb
rgba
trasparent
word(red/green/...)

## stroke
## stroke-width
## fill-opacity
## opacity
## stroke-opacity
## fill-rule

inherit 默认
nonzero 非0
evenodd 在一个区域内任意画一条射线，与该射线相交的边数，若为奇数则为内置区域，反之为处置区域。
