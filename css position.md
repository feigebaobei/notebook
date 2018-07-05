# css position

定义dom元素的位置。
eg: 

	box {
		position: absolute;
	}
position: absolute | fixed | relative | static | inherit

absolute: 这是一种绝对定位。相对于第一个非static外的祖先元素进行定位。位置使用'left','top','right','bottom'进行规定位置。
fixed: 这是一种绝对定位。相对于浏览器窗口进行定位。使用'left','top','right','bottom'进行规定位置。
relative: 这是一种相对定位。相对于正常位置。使用'left','top','right','bottom'。
static: 默认值。没有定位。处于正常的dom流中。（忽略top,bottom,left,right,z-index声明）。
inherit: 继承父元素的position属性。


