
#php
##php基本语法

|风格名称|代码示例| |
|-|-|-|
|xml风格|`<?php    ?>`|推荐使用|
|短风格|`<?    ?>`|不推荐使用|
|script风格|`<script language="php">   </script>`|不推荐使用|
|asp风格|`<%   %>`|不推荐使用|

###编码规范
<?php   ?>  
以;结尾  
`?>`隐含一个;，所以最后一行php代码可以不写;。  
空白符。用来提高代码可读性。  
注释：  

|||
|-|-|
|c++多行|`/*   */`|
|c++单行|`/*   */`|
|shell多行|`/*   */`|

php可以和html语言混合使用。  

###常量
define("KEY", value);

|||
|-|-|
|`_FILE_`|data|
|`_LINE_`|data|
|`PHP_VERSION`|PHP程序的版本号|
|`PHP_OS`|操作系统|
|`TRUE`|true|
|`FALSE`|false|
|`E_ERROR`|指到最近的错误处|
|`E_WARNING`|指到最近的告警处|
|`E_PARSE`|指定潜在问题的地方|
|`E_NOTICE`|指定发生不寻常的地方|
|`_DIR_`|文件所在的目录|
|`_FUNCTION_`|函数的名称|
|`_CLASS_`|类的名称|

###变量
$前缀，a~z的大小写开头，_开头。  
= 赋值 `$a = 'string'`  
引用赋值 `$$b = $$a`  

####超全局变量
|||
|-|-|
|`$GLOBALS`|data|
|`_GET`|data|
|`$_POST`|data|
|`$_FILES`|data|
|`$_COOKIE`|data|
|`$_SERVER`|data|
|`$_ENV`|data|
|`$_REQUEST`|data|
|`$_SESSION`|data|

####全局变量
在函数外声明的全局变量，在函数内不能直接访问。需要使用：

1. 在函数内使用：`global $variable`声明。  
2. `$GLOBLAS['variable']`  

####静态变量
在执行后，其值一直保留。（与是否在函数中无关）  
`static $variable = 1;`


####变量销毁
全局变量不可被销毁。静态变量可以被销毁。  
`void unset avriable`

####整型
####浮点型
####字符串型
“”显示变量的值、转义后的字符。  
’‘直接输出内容
####布尔型
####数组型
list();array();创建  

`$arr = array(1,1,2,3);`  

    $arr = array(
        0=>15,
        2=>1E+05,
        1=>'string',
    );

####对象型
###类型转换

1. 自动数据类型转换`(int) $str`  
2. 强制数据类型转换`settype(variable, 'int') // 转换为整型`  

###标量类型的声明
`declare(strict_types=1);`  
1: 表示严格类型校验模式，作用于函数调用 和返回语句。  
0: 表示强制类型校验模式。  

###运算符
####算术运算符
|||
|-|-|
|+|加法|
|-|减法|
|*|乘法|
|/|除法|
|%|取余|
|++|累加|
|--|累减|

####字符串运算符
|||
|-|-|
|.|字符串连接|

####赋值运算符
|||
|-|-|
|=||
|+=||
|-=||
|*=||
|/=||
|.=||
|%=||

####比较运算符
|||
|-|-|
|==||
|!=||
|>||
|<||
|>=||
|<=||
|===||
|!==||

####逻辑运算符
|||
|-|-|
|&&|和|
|AND|和|
|`||`|或|
|OR|或|
|!|否|
|NOT|否|
|XOR|异或|

####按位运算符
|||
|-|-|
|&||
|`|`||
|^|异或|
|~|取反|
|<<|向左移动|
|>>|向右移动|

####否定控制运算符
|||
|-|-|
|||
|||

####错误控制运算符
|||
|-|-|
|@|`$err = @(20 / 0);`|
|||

####三元运算符
`(expr1) ? (expr2) : (expr3);`

###命名空间

    <?php
        namespace 2ndbuilding\number24; // 命名空间
        class room{}
        $room = new _NAMESPANCE_.room;
    ?>

##php的语言结构
###内置函数
###自定义函数

    function fn(param0, param1) {
        // code
    }

###向函数传递参数引用
在函数执行后，使用参数引用的变量是被改变。  

    <?php
        $fee = 300;
        $serviceprice = 50;
        function totalfee(&$fee, $serviceprice) {
            $fee = $fee + $serviceprice; // 改变了参数的值。
        }
        totalfee($fee, $serviceprice); // 执行开始时，$fee = 300;
        totalfee($fee, $serviceprice); // 执行开始时，$fee = 350;
    ?>

###函数的引用
|||
|-|-|
|内置函数|直接使用|
|库文件|`include()`或`require()`|
|自定义函数|`include()`或`require()`|

    function &example($aa = 1) {
        return $aa;
    }
    $bb = &example("string");

1. 定义函数和使用函数都需要使用&。

###函数的取消引用
`unset($variable)`  
只是断开引用，没有销毁变量内容。  

###包含文件
|||
|-|-|
|require()|在脚本执行前。读入文件。一般在文件的开头和结尾。|
|include()|代码执行到这里时读入。|
|require_once()|防止多次读入|
|include_once()|防止多次读入|

###流程控制
|||
|-|-|
|顺序控制语句|从上到下，依次执行。|
|条件控制语句|`if`, `if else`, `if elseif else`, `switch`|
|循环控制语句|`while`, `do while`, `for`, `foreach`|
|流程控制的另一种写法|`endif`, `endwhile`, `endswitch`, `endfor`|

##字符串和正则表达式
####转义字符
|||
|-|-|
|\n|新一行|
|\t||
|`\\`||
|\0|ascII 0|
|`\$`||
|\r|换行|
|`\{octal#}`|八进制|
|`\x{hexadecimal}`|16进制|

####字符串连接
`.`
####字符串操作函数
|||
|-|-|
|strlen($str)||
|str_word_count($str)||
|trim($str), ltrim($str), rtrim($str)||
|explode('string', $string)||
|implode('string', $string)||
|substr($string, start, length)||
|substr_replace($string, $string2, start, length)||
|strstr($string, $substr), stristr($string, $substr)||
|strtok($string, $reg)|只返回匹配的第一个|

####正则
|||
|-|-|
|`[]`||
|`-`||
|`.`||
|`+?*{n,m}`|至少一个，0|1，>=1，，n~m|
|^&||
|`[^]`||
|`()`||
|`|`||
|`\\``\`||
|ereg($reg, $string, $arr)||
|eregi($reg, $string, $arr)||
|ereg_replace($reg, $string, $arr)||

###php数组
数字索引数组  
关联索引数组  
####常量数组
`array('s', 't', 'r', 'i', 'n', 'g');`  
####数组遍历

    foreach ($arr as $item) {}
    foreach ($arr as $key => $value) {}

####多维数组
####多维排序

|升序|降序|
|-|-|
|sort($arr)|rsort($arr)|
|asort($arr)|arsort($arr)|
|ksort($arr)|krsort($arr)|
|usort|自定义排序|

|||
|-|-|
|push(), pop(), shift(), unshift()||
|array_unshift($arr, $item0, $item1)||
|array_push($arr, $item0, $item1)||
|array_shift($arr)||
|arrary_pop($arr)||

||||
|-|-|-|
|in_array($item, $arr)||返回bool值|
|array_key_exists($key, $arr), array_search($value, $arr)||返回bool值|

||||
|-|-|-|
|count($arr, $depth)||
|array_unique($arr)|去重值|
|array_flip($arr)||
|serialize($arr)||
|unserialize($arr)||

##时间和日期
###设置时区
php.ini  
`date.timezone=Asia/Hong_Kong // 东八`  
`date_default_timezone_set("Asia/Hong_Kong")`  
系统存储时间的方式是一个连贯的整数。以秒为单位。  
GMT 格林尼治时间  

|||
|-|-|
|time()||  

####date()
|||
|-|-|
|'a'||
|'d'||
|e||
|g||
|h||
|i||
|j||
|l||
|m||
|n||
|s||
|t||
|w||
|z||
|A||
|D||
|F||
|G||
|H||
|I||
|L||
|M||
|O||
|S||
|T||
|U||
|W||
|Y||
|Z||  

`string date(string format [时间戳])`  
`arrary getdate([时间戳])`  
`bool checkout(月份，日期，年份) // 检验时间的有效性`

####格式化时间戳的日期和时间
`string strftime(格式，时间戳)`  

|||
|-|-|
|||
|||
|||
|||
|||
|||
|||
|||
|||
|||

####显示本地化的日期和时间
`setlocale(目录，本地化值)`

####生成时间戳
`mktime(小时，分钟，秒，月份，日期，年份)`
|||

##面向对象

1. 封装性  
2. 继承性  
3. 多态性  

声明类  

    class Student { // 声明类
        Pulblic $name;
        function GetIp() {
            // code
        }
        function __construct($p0, $p1) {
            // code
        }
        function __destruct() {
            // code
        }
    }

    $variable = new Student(); // 实例化类

###类的继承

    class A extends B {
        // code
    }

###静态属性
静态属性不能被实例访问。  
静态方法可以被实例访问。  

###final类不能被继承

###抽象类

    abstract class Name {
        abstract function fn0($p0, $p1);
        abstract function fn1($p0, $p1);
    }

###接口类

    interface Name {
        function fn0();
        function fn1();
    }

##错误处理和异常处理
##php与web交互
|前端|后端|
|-|-|
|在`form`元素中的元素中添加`name`属性。|使用`$_POST`或`$_GET`方法返回的关联数组得到表单内的数据。|

##文件与目录操作
|||
|-|-|
|1. 打开文件|`fopen(string path, string method)`|
|2. 写入内容|`fwrite($fp, string $string, string method)`|
|3. 关闭文件|`fclose($fp)`|

###`fopen()的method函数`
|r||
|r+||
|w||
|w+||
|a||
|a+||
|x||
|x+||
|b||
|t||

##图形图像处理
##cookie和会话管理
cookie的作用  

1. 在当前页面保存cookie，在别的页面使用。  
2. 记录客户曾经输入的信息或访问网页的次数。  
3. 把查看过的页面保存在Cookie临时文件夹中。提高以后的浏览速度。  

创建cookie  

    setcookie(name, value, date, path, host, secure);

读取cookie  

    $_COOKIE['name'];

删除cookie  

    setcookie(name, "", time()-10);

|||
|-|-|
|||
|||
|||
|||



|||
































































#blade模板
##1. introduce
.blade.php文件  
resources/views目录下  
##2. 模板继承  
定义布局  
定义一集主页面布局，在大多数页面中使用这个布局。再定义使用这个布局的子页面。

    <!-- 存放在 resources/views/layouts/master.blade.php -->
    <!DOCTYPE html>
    <html>
    <head>
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            this is the master sidebar
        @show

        <div class='container'>
            @yield('content')
        </div>
    </body>
    </html>

`@section`定义一个见容的片段  
`@yield`显示给定片段的内容  
扩展布局  
`@extends`指定子页面所继承的布局  
`@section`指令注入内容到布局的片段中。  

    <!-- 存放在 resources/views/childe.blade.php -->
    @extends('layouts.master')

    @section('title', 'Page Title')

    @section('sidebar')
        @parent
        <p>This is appended to the master sidebar</p>
    @endsection

    @section('content')
        <p>This is my body content.</p>
    @endsection
`@parent`指令用来追回内容。在视图渲染时会被布局中的内容替换。  
##3. 数据显示
使用`{{}}`包裹内容来显示传递到视图的数据。  

    hello, {{name}}
    hello, {{functionName()}}

    {{isset($name) ? $name : 'Default'}}

    {{$name or 'Default'}}

    hello, {!! $name !!}

    hello, @{{ name }} // 避免与某些js框架冲突。直接显示{{ name }}

    @verbatim // 大量使用js变量时。这样写就不用在表达式前加@
        <div class="container">
            hello, {{ name }}
        </div>
    @endverbatim
##4. 流程控制
if  

    @if (count($records) === 1)
        I have one record!
    @elseif (count($records) > 1)
        I have multiple record!
    @else
        I don't hava any record!
    @endif

    @unless (Auth::check())
        You are not signed in.
    @endunless

循环  

    @for ($i = 0; $i < 10; $i++)
        The current value is {{ $i }}
    @endfor

    @foreach ($users as $user)
        <p>This is user {{ $user->id }}</p>
    @endforeach

    @forelse ($users as $user)
        <li>{{ $user->name }}</li>
    @empty
        <p>No users</p>
    @endforelse

    @while (true)
        <p>I'm looping forever.</p>
    @endwhile

    @foreach ($users as $user)
        @if ($suer->type == -1)
            @continue
        @endif
        <li>{{ $user->name }}</li>
        @if ($user->number == 5)
            @break
        @endif
    @endforeach

    @foreach ($users as $user)
        @continue($user->type == 1)
            <li>{{ $user->name }}</li>
        @break($user->number == 5)
    @endforeach

    @foreach ($users as $user) // 可以在循环中使用`$loop`变量，它可以用到循环是不是第一个否最后一个迭代。
        @if ($loop->first)
            This is the first iteration
        @endif
        @if ($loop->last)
            This is the last iteration
        @endif
        <p>This is user {{ $user->id }}</p>
    @endforeach

    @foreach ($users as $user) // `$loop`变量的`parent`属性访问父级元素。
        @foreach ($user->posts as $post)
            @if ($loop->parent->first)
                This is first iteration of the parent loop.
            @endif
        @endforeach
    @endforeach

`$loop`变量的其他属性  

|||
|-|-|
|`$loop->index`||
|||
|||
|||
|||
|||
|||
|||
|||
|||
|||
|||
|||
##5. 包含子视图
`@include`  
不会。没看懂。  
`@each`  
不会。没看懂。  
##6. 堆栈
不会。没看懂。  
##7. 服务注入
`@inject`  
不会。没看懂。    
##8. 扩展Blade
不会。没看懂。    

































