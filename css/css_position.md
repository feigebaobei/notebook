# css position

定义dom元素的位置。
eg: 

	box {
		position: absolute;
	}
position: absolute | fixed | relative | static | inherit | sticky | unset

static: 默认值。没有定位。处于正常的dom流中。（忽略top,bottom,left,right,z-index声明）。
relative: 这是一种相对定位。相对于正常位置。使用'left','top','right','bottom'。
absolute: 这是一种绝对定位。相对于第一个非static外的祖先元素进行定位。位置使用'left','top','right','bottom'进行规定位置。
fixed: 这是一种绝对定位。相对于浏览器窗口进行定位。使用'left','top','right','bottom'进行规定位置。
inherit: 继承父元素的position属性。
sticky: 相当于relative+fixed.小于指定值时使用相对定位。大于指定值时使用固定定位。
    当代浏览器已经支持此属性。2021.08.12.
    相对于relative/absolute/fixed.
    祖先元素中有overflow:hidden时无效。
unset 若该属性可继承。则不使用当前属性值，使用祖先元素中的属性值。否则使用默认属性值

## clip 剪裁绝对定位元素
使用指定形状剪裁。

clip: auto 不剪裁
	  shape 形状 rect(top, right, bottom, left)
	  inherit 从父元素继承

