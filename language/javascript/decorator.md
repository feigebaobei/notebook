1.Decorator 是一个函数 
2.通过Decorator(修饰器）能修改 类 的行为（扩展 类 的功能）
3.Decorator(修饰器）只在类的范围有用

```
let readonly = (target, name, descriptor) => {
	// target     目标(被装饰的对象，可以是类的方法也可以是类)
	// name       类的属性
	// descriptor 属性描述符对象，{configable,value,wirtable,enumberable}
}
```