#正则表达式
##简介
1. 字符序列形成的搜索模式
2. 可用于文本搜索和文本替换的操作

##定义
/pattern/modifier  
pattern包括普通字符（eg:a-z。包括可打印字符、不可打印字符。）和特殊字符（也称元字符）  

###非打印字符
|字符|描述|
|-|-|
|\cx||
|\f|换页符|
|\n|换行符|
|\r|回车符|
|\s|空白字符。包括空格、制表符、换页符等|
|\S|非空白字符|
|\t|制表符|
|\v|垂直制表符|

###匹配符
|字符|描述|
|-|-|
|\w|匹配字母或数字或下划线或汉字|
|\s|匹配任意的空白符|
|\d|数字|
|||

###特殊字符
简单说就是需要转义的字符。  

<table>
    <thead>
        <tr>
            <td>字符</td>
            <td>描述</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$</td>
            <td></td>
        </tr>
        <tr>
            <td>()</td>
            <td></td>
        </tr>
        <tr>
            <td>{</td>
            <td></td>
        </tr>
        <tr>
            <td>[</td>
            <td></td>
        </tr>
        <tr>
            <td>+</td>
            <td></td>
        </tr>
        <tr>
            <td>*</td>
            <td></td>
        </tr>
        <tr>
            <td>\</td>
            <td></td>
        </tr>
        <tr>
            <td>|</td>
            <td></td>
        </tr>
        <tr>
            <td>^</td>
            <td></td>
        </tr>
        <tr>
            <td>.</td>
            <td></td>
        </tr>
    </tbody>
</table>

###限定符
|字符|描述|
|-|-|
|*|>=0|
|+|>=1|
|?|0或1|
|{n}|n次。n>=0|
|{n,}|>=n。n>=0|
|{n,m}|n<=x<=m。n,m>=0|

###定位符
|字符|描述|
|-|-|
|^|开头位置|
|$|结尾位置|
|\b|匹配一个字边界，即字与空格间的位置|
|\B|非字边界|

##修饰符

|符号|描述|
|-|-|
|i|不区分大小写|
|g|执行全方搜索|
|m|执行多行搜索|

##方法
**test(str)** 检查是否存在。返回的boolean。  

    var reg0 = /e/
    var bool0 = reg0.test('the best') // true

**exec(str)** 返回被找到的值，或null。  
    
    var reg1 = /e/ig
    var arr0 = reg0.exec('the best bEE apple') // ['e']

