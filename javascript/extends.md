# 原型链继承

```
function SuperType () {...}
SuperType.prototype = {...}
function SubType () {...}
SubType.prototype = new SuperType()
```

# 构造函数继承

构造函数内是对this进行操作，所以可以改变使用构造函数的this.

```
function SubType() {
	SuperType.call(this)
}
```

# 组合式继承
```
// 分别从构造函数中继承属性与从原型对象中继承方法。
function SubType(name, age) {
	SuperType.call(this, name)
	this.age = age
}
SubType.prototype = new SuperType()
SbuType.prototype.constructor = SubType // 记得修改原型对象中的构造器
```

# 原型式继承

```
function object(o) {
	let f = New Function()
	f.prototype = o
	return f
}
```

在es5是已经出现了更完善的原型式继承方法。

`Object.create(origin, selfObject)`

origin是用来定义原型对象的对象

selfObject是用来定义当前对象自身的属性的对象。格式为`{value: '', get: fn, set: fn(v){}, configable....}`

# 寄生式继承

```
function createAnother(original) {
	let clone = object(original)
	clone.sayHi = function () {alert('hi')}
	return clone
}
```

# 寄生组合式继承

```
function inheritPrototype(SubType, SuperType) {
	let prototype = SuperType.prototype
	prototype.constructor = SubType
	SubType.prototype = prototype
}
```

