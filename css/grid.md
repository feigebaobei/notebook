# 网格布局
|grid|flex|
|-|-|
|布局方式是二维布局|布局方式是一维布局|
|较适用于大规模布局|较适用于小规模布局|

用到的概念：网格容器，网格项，网格线，网轨道，网格单元格，网格区域，网格模板。  
![./image/grid0.png](./image/grid0.png)  

|grid|-|12|
|grid|-|12|
|grid|-|12|  

使用grid布局需要在2个地方设置样式：网格容器，网格项。  
**网格容器**  
标记为display: grid|inline-grid;的元素是网格容器。
![](./image/grid1.jpg)  
![](./image/grid2.jpg)  
grid-template-rows: [gap-name] <track-size\> [gap-name2] <track-size\> [gap-name3];  
grid-template-columns: [gap-name] <track-size\> [gap-name2] <track-size\> [gap-name3];  
grid-template-areas: '<grid-area-name\> | . | ...' '. . . .';  

| | |
|-|-|
|.|表示一个空单元格|
|<grid-area-name\>|使用grid-area属性定义网格区域的名称|
|none|无网格区域被定义|

grid-column-gap/grid-row-gap  

    grid-column-gap: 100px 50px 30px;

grid-gap: <grid-column-gap\> <grid-row-gap\>  

justify-items: start|center|end|stretch;//每个单元格内的对齐方式
align-items: start|center|end|strech;
justify-content: start|center|end|stretch|space-around|space-between|space-evenly;//整个网格容器内的内容的对齐方式  
align-content: start|center|end|stretch|space-around|space-between|space-evenly;  
grid-auto-column/grid-auto-rows//定义自动生成的网格轨道。具体的我也不会。  
grid-auto-flex//不会。   
grid//简写。  

    .container{
        grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
        grid-template-rows: [row1-start] 25% [row1-end] 100% [third-line] auto [last-line];
    }

**网格项**  
网格容器，网格项，网格线，网轨道，网格单元格，网格区域，网格模板。  
网格容器了子元素是网格项。
grid-column-start/grid-column-end/grid-row-start/grid-row-end//使用它们确定网格区域。  

    .item-a{
        grid-column-start: 2;
        grid-column-end: five;
        grid-row-start: row1-start
        grid-row-end: 3
    }

grid-column: <start-line\> <end-line\>  
grid-row: <start-line\> <end-line\>  
grid-area: <name\> | <row-start\> / <column-start\> / <row-end\> / <column-end\>;  

    .class {
        grid-area: name;
    }
    .class2 {
        grid-area: 1 / col-name1 / row-name2 / 6;
    }

单元格内的对齐方式  

justify-self: start|center|end|stretch;  
algin-self: start|center|end|stretch;  
**网格行**
被分开后的单元格。成行的或成列的都是网格行。

**网格单元格**
被网格线分开的区域。

**网格轨道**
grid trakers
每个网格行都是网格轨道。

**网格线**
grid lines
划分网格轨道的线。可在`grid-template-columns` / `grid-template-rows`中定义。

**网格区域**
若干网格单元组成的矩形区就是网格区域。
必须是矩形。

**网格模板**

# grid properties
## display
```
display: grid | inline-grid;
```

## grid-template-columns & grid-template-rows
```
grid-template-columns: [{<[lineName]> <value>}...] <lineName>;
grid-template-rows: [{<lineName...> <value>}...] <lineName>;
// 命名了网格线
```
二者定义内的是显示网格。之外的是隐式网格。

## grid-template-areas
用于引用grid区域。
```
grid-template-area: "areaName+" // 为每个网格区域命名。
```
同名的会被合并为一个网格区块。
// defined
.c {
    display: grid;
    ...
    grid-template-area: "head head"
                        "nav main"
                        "nav foot";
}
// usage
.c > .sc0 {
    grid-area: head;
    ...
}
.c > .sc1 {
    grid-area: nav;
    ...
}
.c > .sc2 {
    grid-area: main;
    ...
}

## align-itmes
```
align-items: start | end | center | stretch;
```
## title
```
justify-items: start | end | center | stretch;
```
## title
```
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
```
## title
```
align-content: start | end | center | stretch | space-around | space-between | space-evenly;
```

# 网格间距
```
grid-column-gap: value;
grid-row-gap: vlaue;
grid-gap: <rowGap> <columnGap>;
```

# 轴
grid axis
横轴（行轴）、纵轴（列轴）

# title
# title
# title



```
repeat(columns, columnWidth)
```
剩余空间分配数
fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。
fraction

grid-template-columns: 200px 1fr 3fr;
第一列200px，第二列1fr，第三列3fr。网格容器中的可用空间减去200px后，剩余空间被分成4份，1份给第二列，3份给第三列。



grid-template-columns 定义列的网格线名称、风格转道的尺寸大小。
grid-template-columns: [ln0] 100px [ln1] 70px [third] 60px [four];
                        none | <lenght> | <percentage> | <flex> | <max-content> | <min-content> | <minmax(min, max)> | <auto> | <fit-content([<length> | <percentage>])> | repeat([<positive-integer> | auto-fill | auto-fit], <track-list>)
grid-template-rows 定义行的网格线名称、风格转道的尺寸大小。
grid-template-rows: [ln0] 100px [ln1] 70px [third] 60px [four];
                        none | <lenght> | <percentage> | <flex> | <max-content> | <min-content> | <minmax(min, max)> | <auto> | <fit-content([<length> | <percentage>])> | repeat([<positive-integer> | auto-fill | auto-fit], <track-list>)
grid-template-areas 定义网格区域的名称。
grid-template-areas: "a a a"
                    "b c c"
                    "b c c"
grid-template-areas: none | <string>+
grid-template 所有网格模板属性的缩写。
grid-auto-columns 设置隐式创建网格纵向轨道的宽度。
grid-auto-columns: <length> | <precentage> | <flex> | max-content | min-content | minmax(min, max) | fit-content(argument) | auto
    max-content 一个关键字，表示以网格项的最大的内容来占据网格轨道。
    min-content 一个关键字，表示以网格项的最小的内容来占据网格轨道。
grid-auto-rows 用于指定隐式创建的行轨道大小。
grid-auto-rows: <length> | <precentage> | <flex> | max-content | min-content | minmax(min, max) | fit-content(argument) | auto
grid-auto-flow 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。
grid-auto-flow: column;  /* or 'row', 'row dense', 'column dense' */
grid 所有网格属性的缩写。
grid-row-start 网格开始的行号
grid-row-start: auto | <custom-ident> | <integer> && <custom-ident>? | span && [<integer> || <custom-ident>]
grid-row-end 网格结束的行号
grid-row-end: auto | <custom-ident> | <integer> && <custom-ident>? | span && [<integer> || <custom-ident>]
grid-row 是对于`grid-row-start` / `grid-row-end`的缩写。
grid-column-start
grid-column-end
grid-column 是对于`grid-column-start` / `grid-column-end`的缩写。
grid-area 是对于`grid-row-start`/`grid-column-start`/`grid-row-end`/`grid-column-end`的缩写。
grid-column-gap
grid-row-gap
grid-gap

# grid元素的属性
display
grid-template-columns
grid-template-rows
grid-template
column-gap
row-gap
grid-column-gap
grid-row-gap
gap
grid-gap
justify-items
align-items
place-items
justify-content
align-content
place-content
grid-auto-columns
grid-auto-rows
grid-auto-flow
grid


# grid item元素的属性
grid-column-start
grid-column-end
grid-row-start
grid-row-end
grid-column
grid-row
grid-area
grid-template-areas
justify-self
align-self
place-self

# special untis & functions
fr units
sizing keywords
sizing Functions
repeat()
masonry 不会
subgrid 不会