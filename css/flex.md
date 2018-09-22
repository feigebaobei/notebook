# flex
意思是“弹性布局”
## 使用
- 定义容器：

		.box {
			display: flex;
		}
- 定义行内元素  

		.box {
			display: inline-flex;
		}
- webkit内核和浏览器（chrome,safari）不兼容这个样式。需要使用`-webkit-`前缀  
```
		.box {
			display: -webkit-flex;
		}
```

使用flex布局时需要定义2个地方。一个是flex容器，叫做容器。另一个是flex项目，叫做项目。在dom中定义了flex容器的元素后，其子节点才能使用flex布局。  
布局的时候的有2个地方需要控制。  
##1.容器的属性  
|属性名称|说明|默认值|值|
|-|-|-|-|
|flex-direction|主轴的方向|row|row-reverse, column, column-reverse|
|flex-wrap|如何换行|nowrap|wrap: 可以折行, wrap-reverse: 可以折行并在主轴的交叉方法上倒序排列|
|flex-flow|flex-direction和flex-wrap属性的简写|row nowrap||
|justify-content|项目在主轴的对齐方式|flex-start|flex-end, center, space-between: 两端对齐, space-around: 相等间距|
|align-items|项目在主轴的交叉轴上的对齐方式|stretch: 占满容器|flex-start, flex-end, center, baseline|
|align-content|在多根轴线时的对齐方式。只有一根轴线时不起作用。|stretch: 轴线占满交叉轴|flex-start, flex-end, center, space-between|

  
##2.项目的属性
|属性名称|说明|默认值|值|
|-|-|-|-|
|order|项目的排列顺序,越小越靠前|0|num|
|flex-grow|项目的放大比例|0。|num|
|flex-shrink|项目的缩小比例|1。如果空间不足该项目公缩小。|num|
|flex-basis|项目本来的大小|auto|xpx|
|flex|flex-grow,flex-shrink,flex-basis的简写|0 1 auto||
|align-self|当前项目的对齐方式(我测试在单根轴线时有用。多轴时无用。)|auto|flex-start, flex-end, center, baseline, stretch|

---

2018/05/25 by stone