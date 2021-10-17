# javascript patterns
作者 stoyan stefanow
译者 陈新

# no.1 简介
js是一门动态性较强的语言，面向对象的语言。
模式是指一个通用问题的解决方案。
对象有2类：
- 原生的
- 宿主环境的
	+ console
jslint: 检测js代码质量的工具

# no.2 基本技巧
易维护的代码：
- 阅读性好
- 具有一致性
- 预见性好
- 如一人写成
- 有文档
少用全局变量
- 使用var创建的全局变量不能被删除
- 未使用var创建的全局变量能被删除
不要修改内置原型
避免使用隐式类型转换
避免使用eval
大写构造函数首字母
编写api文档
```
/*
* @tag value {type} description
* @namespace
* @class
* @method
* @param
* @return
*/
```
正式发布是精简代码

# no.3 字面量和构造函数
优先使用字面量方式定义。
`new`与构造函数结合使用时的返回值：
|返回this|返回非this的对象|other|
|-|-|-|
|返回this|返回该对象|返回this|
严格模式中，this指向undefined  
自调用构造函数：  
```
function Fn(arg) {
	if (!(this instanceof Fn)) {
		return new Fn(arg)
	}
	this.a = 'str'
}
```
改变了实例的`instanceof`属性，无法改变实例与构造函数的关系。

# no.4 函数
可以提供作用域。
惰性函数定义：
```
var fn = function () {
	// other code
	fa = function () {...}
}
```
- 被重新定义后原函数上的原型对象被丢失。
即时函数（立即执行函数/自调用函数/自执行函数）iife  
备忘模式：  
```
var a, b;
(function (a, b) {...})(a, b)
```
```
// defind
function fnCurry (caption) {
	let fn = function (...a) {
		let k = a.map(e => e.toString()).join(',')
		let ele = fn.cache.find(e => {
			return e.key === k
		})
		let result
		if (ele) {
			result = ele.value
			return result
		}
		}
		// 经过计算
		result = {...}
		if (fn.cache.length >= caption) {
			fn.cache.pop()
			fn.cache.push({
				key: k,
				value: result
			})
		}
		return result
	}
	fn.cache = [
		\\ {key, value}
	]
	return fn
}
// usage
let fn = fnCurry(5)
fn(p, q)
fn(p, q)
fn(p, q)
```
配置对象模式：
- 可使用参数变整洁。
- 不用记过多参数/顺序
- 可忽略可选参数
- 易于阅读/维护
- 易于添加/删除参数
- 需要记住参数名称
- 无法压缩属性名称
curry:
由“调用函数”改为“应用函数”。
```
fn(p) // 调用函数
fn.call(obj, p) // 应用函数
```
- 柯理化是一个转换过程。
- 有大多数参数相同时，可使用curry化。
回调模式

# no.5 对象创建模式
命名空间模式：
```
var myapp = myapp || {}
myapp.namespace = function (path) {
	let parts = path.split('.')
	if (parts[0] === 'myapp') {
		parts.pop()
	}
	let parent = myapp
	for (let i = 0; i <parts.length; i++) {
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {}
		}
		parent = parent[part[i]]
	}
}
```
声明依赖关系
- 明确依赖
- 解析局部变量比解析全局变量快
闭包：
```
function f () {
	let a = 'str' // 无法被外部直接访问
	let b = () => {...}
	return b
}
```
特权方法：可以访问私有属性的方法
私有性失效：当特权方法返回私有的对象时。返回的是该对象的引用。若在闭包外修改该对象，则闭包内也会受动影响。
```
// 接上段代码
f.prototype = (function () {
	// other code
	return {
		a: a,
		b: b,
	}
})()
// 闭包与原型对象结合使用，可使用所有实例拥有该功能。
```
揭示模式
```
(function () {
	function a () {...}
	function b () {...}
	return {
		a,
		b,
	}
}())
```
模块模式
提供了一种创建自包含非耦合代码片段的有利工具。命名空间+即时函数+私有特权成员+声明依赖
沙箱模式
- 同一个包可实现多个版本的实例
- 解决多个访问长度
```
// defind
function Sandbox(...modules, cb) {
	if (!(this instanceof Sandbox)) { // 当没有使用new操作符时使用new操作符
		return new Sandbox(...modules, cb)
	}
	// 为this添加属性
	this.a = 'a'
	this.b = 'b'
	for (let i = 0; i < modules.length; i++) {
		Sandbox.modules[modules[i]](this) // 使this具有指定module的功能
	}
	cb(this)
}
Sandbox.modules = {}
Sandbox.modules.a = function() {/*实现模块a的功能*/}
Sandbox.modules.b = function() {/*实现模块b的功能*/}
Sandbox.modules.c = function() {/*实现模块c的功能*/}
// usage
let box = {} // 
new Sandbox('a', 'b', function (box) {
	// ...
})
```
链模式
- 以创建简短/具有特定功能的函数。
```
// defind
var obj = {
	v: 0
	increment: function () {
		this.v++
		return this
	},
	add: function (p) {
		this.v += p
		return this
	},
	shout: function(p) {
		// empty
	}
}
// usage
obj.increment().add(2).shout
console.log(obj.v)
```


# no.6
# no.7
# no.8
# 后记
## 惰性函数会越执行越快么？
不会，会在第一次执行时做若干判断，返回一个新函数。其后执行该新函数。
