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

**不存在变量提升。**  











每一个function都会形成一个作用域。变量声明时在函数中，所以就处于这个函数的作用域中，外部是无法访问的。要想访问变量，就必须new一个实例出来。  
