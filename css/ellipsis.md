#多行文本溢出时出现省略号
本文推荐2种方法。  

##1. css
**tip：**只兼容chrome内核的浏览器。ff不支持。  

    .box {
        overflow: hidden; /* 溢出时不显示溢出的内容 */
        text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
        display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
        -webkit-box-orient: vertical; /* 垂直排列元素 */
        -webkit-line-clamp: 2; /* 显示多少行 */
    }

###延展

word-wrap

|关键字|描述|默认值|值|
|-|-|-|-|
|word-wrap|规定单词换行的条件|normal, 在单词断字点处换行。|break-word，在单词内换行。|
|overflow-wrap,在css3时由word-wrap改为overflow-wrap||||

text-overflow

|关键字|描述|默认值|值|
|-|-|-|-|
|test-overflow|超出盒子的文本如何显示||clip, 修剪文本。 ellipsis, 显示省略号。 string, 显示指定的文本。|

white-space

|关键字|描述|默认值|值|
|-|-|-|-|
|white-space|对待空白的方法和是否换行|normal，空白会被浏览器忽略。|pre, 保留空白。nowrap, 文本不换行。pre-wrap, 保留空白，正常换行。pre-line，合并空白，保留换行。|

box-orient

这个属性还没有被浏览器支持。需要使用各自浏览器的私有属性。

|关键字|描述|默认值|值|
|-|-|-|-|
|box-orient|子元素如何排序|inline-axis，子元素沿着内联坐标轴（映射到横向）。|horizontal, 指定子元素在一个水平线上从左到右排列。vertical, 从顶部向底部垂直排列子元素。block-axis, 子元素沿着块坐标轴（映射到垂直）。inherit，继承父元素。|

line-clamp

只有chrome内核的浏览器支持自己的私有属性。  

显示多少行块级元素。  

##2. js
使用js控制溢出文本如何显示的方法有很多。这里推荐一个脚本文件：`ellipsis.js`  

###ellipsis.js
|名称|链接|
|-|-|
|ellipsis 链接|https://www.jsdelivr.com/package/npm/ellipsis.js|
|ellipsis|https://cdn.jsdelivr.net/npm/ellipsis.js@0.1.3/ellipsis.js|
|ellipsis git|https://github.com/glinford/ellipsis.js|

###使用方法。

1、 引入脚本文件  

    <script src="https://cdn.jsdelivr.net/npm/ellipsis.js@0.1.3/ellipsis.js"></script>

2、 使用  

    var ell = Ellipsis({
        lines: 3
    })
    var ele = document.getElementsByClassName('test')
    ell.add(ele)

###延展
它还有一些配置项。若不配置则使用默认值。  

    {
        ellipsis: '...', // 默认显示的替代文本
        debounce: 0, // 延迟多长时间后执行
        responsive: true, // 是否有窗口大小改变时执行
        className: '.clamp', // 默认操作具有这个类的元素。
        lines: 2, // 默认只出现2行元素。
        portrait: null, // 默认不改变，如果你想要在竖屏模式下有不同的行数，
        break_word: true // 默认截断单词。
    }

***

2018/06/12 by stone
