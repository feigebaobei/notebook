#stylus

受到sass的启发做的stylus.它是一个css的预编译工具。需要依赖node.js.  
`npm i stylus stylus-loader --save-dev`  

dry 没有括号，没有分号  

    div 
        width: 20px

nest 嵌套  

    div 
        a
            height: 23px

& 父选择器。  

    div
        a
            p &
                padding: 23px

    div a p div a {
        padding: 23px
    }

funciton  

    fn () 
        width: 20px
    div {
        fn
    }

    div {
        width: 20px;
    }

自动生成跨浏览器支持的私有属性。  

定义变量。

    #id
        width: w = 200px
        margin: -(w / 2)

    #id {
        width: 200px;
        margin: -100px;
    }

使用当前块内的属性值。使用@  

    #id
        width: 200px
        margin: -(@width / 2)

    #id {
        width: 200px;
        margin: -100px;
    }

迭代  

    table
        for row in 1 2 3
            tr:nth-child({row})
                height: 20px # row

    table tr:nth-child(1) {
        height: 20px
    }
    table tr:nth-child(2) {
        height: 40px
    }
    table tr:nth-child(3) {
        height: 60px
    }

篡插  

    vendors = webkit moz o ms official
    fn()
        for vendor in vendors
            if vendor == official
                border-radius: arguments
            else
                -{vender}-border-radius: arguments

操作符  

    div
        prop: operator

替换符

    div
        prop: '%s %s' % (5px 10px)

    div {
        prop: 5px 10px;
    }

---
以上是一个简单的介绍。再深入的需要去官网学习。总体来说stylus不是难的。它就是一个css预处理工具。使用进来就当是css的语法糖。  

2018/11/07 by stone