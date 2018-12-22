#sass

##index

sass: syntactically awesome stylesheets  
这是一个成熟的，可靠的，强有力的，专业级的css处理工具。  

1. css兼容性好。  
2. 完善的社区交流平台。  
3. 永不停止完善。目标是做为行业第一。  
4. 有三个开发框架。  

susy: web layout toolkit  
bourbon: A lightweight sass tool set  
compass: 一个开源的css写作框架。  

scss: sassy css  

##install

    npm i -g sass
    npm i sass
    choco install sass
    brew install sass/sass/sass

##简单用法  

###compile  

    sass [opiton option=value] input:output
    sass file.sass otherfile.css
    sass file.scss otherfile.css
    sass dir:otherdir
    sass --watch dir:otherdir

###variable

以$开头。`$var`  
&代表父selector

###nesting
###Partial

- 就是部分scss/sass文件。不能编译为一个完整css文件。需要多个这个的文件。  
- 请以下划线开头`_file.sass`  
- 使用`@import`引入这个部分文件。  

###Import

    @import part // 引入的是_part.sass 或_part.scss 同时存在时需要指明后缀名。
    @import _part.sass
    @import _part.scss
    @import part.sass
    @import part.scss
    @import url(...)
    @import "https://...."

###Mixins

scss的写法  
@mixin: 定义一个混合元素。
@include: 使用这个混合元素。  

    // scss
    //define
    @mixin convert($property) {
        transform: $property;
    }
    // use
    .box { @include convert(rotate(30deg)) }

sass的写法比较简单。  

    // define
    =convert($prop){...}
    // use
    .box
        +convert(value)

### Extend/Inheritance

    // define
    %var 
        border: 1px solid #ddd
    // use
    .box 
        @extend %var
        border-color: green
    // 扩展类名
    .box {
        @extend .first.second
    }
    // result
    .box .first .second {...}

###Operators

操作`+-*/%`等。  
inline operator use `#{...}`  
interpolation  
    
    p.#{$var} {...}

||||
|-|-|-|
|@at-root|把ruleset添加到根级别上。即解除嵌套结构。||
|@at-root(without: ...)|||
|@at-root(with: ...)|||
|@debug|||
|@warn|||
|@error|||
|if()|condition为true时返回value0,否则返回value1|if(condition, value0, value1)|
|@if|这是用于sassscript的方法。|@if condition {css}|
|@for||@for $i from 1 throught 3 {...}|
|@each||@each $var in a, b, c, d {...}|
|@each||@each $key, $val in (k0: v0, k1: v1, k2: v2){...}|
|@while||@while condition {...}|  

##sass/scss/css转换

    sass-convert input.file output.file

##blog
##ducumentation
##cache

缓存在.sass-cache文件中。  

##Comments

    /**/
    //

---

2018/12/19 by stone