# 创建对象

## 工厂模式

```
function Person (name, age, job) {
	var o = {}
	o.name = name
	o.age = age
	o.job = job
	o.sayName = function () {alert(this.name)}
	return o
}
```

## 构造函数模式

```
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function(){ 
 alert(this.name); 
 }; 
}
```

## 原型模式

```
function Person () {}
Person.prototype.name = ''
Person.prototype.age = ''
Person.prototype.job = ''
Person.prototype.sayName = function () {}
```



## 组合模式（构造函数模式+原型模式）

```
funciton Person (name, age, job) {
	this.name = name
	this.age = age
	this.job = job
	this.friends = ['Shelby', 'Court']
}
Person.prototype = {
	constructor: Person,
	sayName: function () {
		alert(this.name)
	}
}
```

构造函数设置实例属性，原型设置公用方法、属性。

## 动态原型模式

```
function Person (name, age, job) {
	this.name = name
	this.age = age,
	this.job = job,
	if (typeOf this.sayname !== 'function') {
		Person.prototype.sayname = function () {
			alert(this.name)
		}
	}
}
```

## 寄生构造函数模式

```
function Person (name, age, job) {
	var o = {}
	o.name = name
	o.age = age
	o.job = job
	o.sayname = function () {alert(this.name)}
	return o
}
```

## 稳妥构造函数模式

1. 不使用this.
2. 不使用new操作符。

```
function Person (name, age, job) {
	var o = {}
	o.name = name
	o.age = age
	o.job = job
	o.sayname = function () {alert(name)}
	return o
}
```

