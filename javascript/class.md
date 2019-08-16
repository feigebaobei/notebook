#class  

1. 就是es5时的语法糖。本质上还是构造函数模式、原型模式。  
1. 实例的属性除非显式定义在其本身上。否则都是定义在原型上。  

## class表达式  

    const MyClass = class Me {
        contructor () {
        }
        getClassName () {
            return Me.name // "Me"
        }
    }

`Me`只能在class内部使用。  
使用class表达式，可以写出立即执行的class  

    person.sayName() // 'tom'    

**class声明不会变量提升。**  

即:需要先定义再使用.

## define

    // 类声明
    clase Rectangle {
        // Rectangle 只能有类内使用。
        constructor(height, width) {
            this.height = height
            this.width = width
        }
    }

    // 类表达式
    let Rectangle = class { // 匿名类
    // let Rectangle = class Rectangle { // 有名的类
        constructor (height, width) {
            this.height = height
            this.width = width
        }
    }
    // 立即执行的表达式
    let r = new class Rectangle {
        constructor (name) {...}
        ...
    }(str)

类体内使用严格模式.
constructor()是class被初始化时自动执行的方法.一个类只能有一个constructor().
使用super调用父构造函数.

## constructor 

实例化时默认执行。
每一个类必须有一个constructor。若没有设置，则默认添加。
该方法默认返回实例对象，即：this.
constructor里定义的属性都是实例自身的属性。不在constructor里定义的（方法）都是实例的原型对象的属性。
写实例的属性时也有一种简单的写法：在类体的头部定义。// class X {_count = 0}

## getter、setter

分别是取值、存值。

    class P {
        constructor () {}
        set prop (value) {
            this.age = value
        }
        get prop () {
            return this.age
        }
    }

## generator方法

在方法前加*，就是generator方法。

## 静态方法

    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
        }
        static distance(a, b) {
            const dx = a.x - b.x
            const dy = a.y - b.y
            return Math.hypot(dx, dy)
        }
    }
    const p1 = new Point(5, 5)
    const p2 = new Point(10, 10)
    console.log(Point.distance(p1, p2))

静态方法不能在实例上调用.
        只能在类上调用.
        因此一般静态方法用作工具函数.
        可以被子类继承。

各方法间不使用逗号分隔。

## this

class内部的方法中的this若没有指定则指向undefined。

    class Animal {
        constructor (name) {
            this.name = name
        }
        speak () {
            console.log(`${this.name} makes a noise`)
        }
    }
    class Dog extends Animal {
        speak () {
            console.log(`${this.name} barks`)
        }
    }
    var d = new Dog('Mitzie')
    d.speak() // 'Mitzie barks'

## 私有方法、属性

es6不提供静态方法、静态属性。
有一种方法可以实现。私有方法移出类。
    
    class Widget {
        foo (baz) {
            bar.call(this, baz)
        }
    }
    function bar (baz) {
        return this.x = baz
    }

每一个function都会形成一个作用域。变量声明时在函数中，所以就处于这个函数的作用域中，外部是无法访问的。要想访问变量，就必须new一个实例出来。  
