# overview
|grid|flex|
|-|-|
|布局方式是二维布局|布局方式是一维布局|
|较适用于大规模布局|较适用于小规模布局|

用到的概念：网格容器，网格项，网格线，网轨道，网格单元格，网格区域，网格模板。  
![./image/grid0.png](./image/grid0.png)  

|grid|-|12|
|grid|-|12|
|grid|-|12|  

# 名词介绍
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
xxx

使用grid布局需要在2个地方设置样式：网格容器，网格项。  

# grid元素的属性
## `display`
可选`grid`/`inline-grid`

## `grid-template-columns`
定义列的网格线名称、风格转道的尺寸大小。
grid-template-columns: [ln0] 100px [ln1] 70px [third] 60px [four];
                        none | <lenght> | <percentage> | <flex> | <max-content> | <min-content> | <minmax(min, max)> | <auto> | <fit-content([<length> | <percentage>])> | repeat([<positive-integer> | auto-fill | auto-fit], <track-list>)

## `grid-template-rows`
定义行的网格线名称、风格转道的尺寸大小。
grid-template-rows: [ln0] 100px [ln1] 70px [third] 60px [four];
                        none | <lenght> | <percentage> | <flex> | <max-content> | <min-content> | <minmax(min, max)> | <auto> | <fit-content([<length> | <percentage>])> | repeat([<positive-integer> | auto-fill | auto-fit], <track-list>)

## `grid-template-areas`
网格区域 grid areas 在CSS中的特定命名。即：定义网格区域的名称。
grid-template-areas: none | <string>+
```
#page {
  display: grid; /* 1.设置display为grid */
  width: 100%;
  height: 250px;
  grid-template-areas: "head head"
                       "nav  main"
                       "nav  foot"; /* 2.区域划分 当前为 三行 两列 */
  grid-template-rows: 50px 1fr 30px; /* 3.各区域 宽高设置 */
  grid-template-columns: 150px 1fr;
}
#page > header {
  grid-area: head; /* 4. 指定当前元素所在的区域位置, 从grid-template-areas选取值 */
  background-color: #8ca0ff;
}
#page > nav {
  grid-area: nav;
  background-color: #ffa08c;
}
#page > main {
  grid-area: main;
  background-color: #ffff64;
}
#page > footer {
  grid-area: foot;
  background-color: #8cffa0;
}
```

## `grid-template`
CSS属性简写，用以定义网格中行、列与分区。
简写属性：grid-template-rows、grid-template-columns与grid-template-areas

## `grid-auto-columns`
指定了隐式创建的网格纵向轨道（track）的宽度。
grid-auto-columns: <length> | <precentage> | <flex> | max-content | min-content | minmax(min, max) | fit-content(argument) | auto
    max-content 一个关键字，表示以网格项的最大的内容来占据网格轨道。
    min-content 一个关键字，表示以网格项的最小的内容来占据网格轨道。

## `grid-auto-rows`
指定隐式创建的行轨道大小。
grid-auto-rows: <length> | <precentage> | <flex> | max-content | min-content | minmax(min, max) | fit-content(argument) | auto

## `grid-auto-flow`
属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。
grid-auto-flow: column;  /* or 'row', 'row dense', 'column dense' */

## `grid`
所有网格属性的缩写。
用来设置以下属性：
显式网格属性 grid-template-rows、grid-template-columns 和 grid-template-areas，
隐式网格属性 grid-auto-rows、grid-auto-columns 和  grid-auto-flow，
间距属性 grid-column-gap (en-US) 和 grid-row-gap (en-US)。

## `row-gap`
行间隔
normal | <length-percentage>
where 
<length-percentage> = <length> | <percentage>

## `column-gap`
列间隔
normal | <length-percentage>
where 
<length-percentage> = <length> | <percentage>

## `grid-column-gap`
xxx

## `grid-row-gap`
xxx

## `gap`
`grid-row-gap`和`grid-column-gap`的缩写
<'row-gap'> <'column-gap'>?

## `grid-gap`
与`gap`同功能。

## `justify-items`
xxx

## `align-items`
xxx

## `place-items`
xxx

## `justify-content`
xxx

## `align-content`
xxx

## `place-content`
xxx

# grid item元素的属性
## `grid-column-start`
指定当前网格项从哪列开始。
grid-column-start：auto | <custom-ident> | <integer> && <custom-ident>? | span && [ <integer> || <custom-ident> ]

## `grid-column-end`
指定当前网格项从哪列结束。
grid-column-end： auto | <custom-ident> | <integer> && <custom-ident>? | span && [ <integer> || <custom-ident> ]

## `grid-row-start`
指定当前网格项从哪行开始。
auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]

## `grid-row-end`
指定当前网格项从哪行结束。
auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]

## `grid-column`
是 grid-column-start (en-US) 和 grid-column-end (en-US) 的简写属性，
<grid-line> [ / <grid-line> ]?
<grid-line> = auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]

## `grid-row`
是一种 grid-row-start (en-US) 和 grid-row-end (en-US) 的缩写（shorthand）形式
<grid-line> [ / <grid-line> ]?
auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]

## `grid-area`
是一种对于 grid-row-start (en-US)、grid-column-start (en-US)、grid-row-end (en-US) 和 grid-column-end (en-US) 的简写
<grid-line> [ / <grid-line> ]{0,3}
<grid-line> = auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]

## `justify-self`
xxx

## `align-self`
xxx

## `place-self`
xxx

# special untis & functions
fr units
sizing keywords
sizing Functions
## repeat()
函数表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。

masonry 不会
subgrid 不会

```
repeat(columns, columnWidth)
```
剩余空间分配数
fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。
fraction
