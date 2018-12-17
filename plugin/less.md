#less

less(leaner style sheets)向后兼容的css扩展语言。  
运行于node.js、服务器端。  
把把less文件转换为css文件。  

##install

    npm i less
    npm i less -g

##usage

###variables
###mixins
###nesting 

&代表父选择器。  

###operation

各算术操作符都可用于的less.带单位也行。  

###function

    // define
    .class() {
        font-size: 23px;
        .first {
            ...
        }
        .second {
            ...
        }
    }
    // use
    .other {
        color: @orage;
        font-size: .class[first];// 使用classs类进而的font-size的数据值
        .class.first(); // 使用class类里的first类里的样式
    }

###scope

在作用域链是依次寻找。  

###comments

    /* ... */
    // ...

###importing

    @import 'name'
    @import 'name.css'

###
###