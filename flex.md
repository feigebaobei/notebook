# flex
意思是“弹性布局”
## 使用
- 定义容器：

		.box {
			display: flex;
		}
- 定义行内元素  

		.box {
			display: flex;
		}
- webkit内核和浏览器（chrome,safari）不兼容这个样式。需要使用`-webkit-`前缀  
```
		.box {
			display: -webkit-flex;
		}
```

使用flex布局时需要明白2个地方。一个是  
使用flex布局时需要定义2个地方。一个是flex容器，叫做容器。另一个是flex项目，叫做项目。在dom中定义了flex容器的元素后，其子节点才能使用flex布局。  
布局的时候的有2个地方需要控制。  
1.容器的属性  
  flex-direction: row | row-reverse | column |column-reverse
  flex-wrap: nowrap | wrap | wrap-reverse
  justify-content: flex-start | flex-end | center | space-between | space-around(对齐内容)
  align-items: strech | flex-start | flex-end | center | baseline(排列项目)
  align-content: stretch | flex-start | felx-end | center | space-between | space-around (多轴线时才启作用)
  
2.项目的属性
	order: <integer>
	flex-grow: <number>(所占flex-direction方向的空间大小。number于总和的比值)
	flex-shrink: <number>(空间不足时缩小。负值无效。)
	flex-basis: <length> | auto （项目的本来大小）
	flex: none | [<flex-grow> <flex-shrink> <flex-basis>] \(它们的缩写)
	align-self: auto | flex-start | flex-end | center |baseline(单个项目的对齐方式)

