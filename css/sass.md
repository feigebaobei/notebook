# sass
对css的一种简便写法。  

## install
需要先安装`ruby`。mac已内置它。
`gem`是`ruby`的包管理工具。需要翻墙。

## usage
### cli
```
sass input.scss output.css
sass --watch input.scss output.css
sass --watch app/sass:publick/stylesheeets

// options
--style     使用指定排版
    nested expanded compact compressed
--sourcemap 是否启用sourcemap
```

### package
[npm](https://www.npmjs.com/package/sass)  
[git](https://github.com/sass/dart-sass)
使用`dart`语言写的。
```
var sass = require('sass')
sass.render({file: scss_filename}, function (error, result) {...})
// or
// var result = sass.renderSync({file: scss_filename})
```
// 写法与`less`很像。

## 可以分为6块内容
变量、嵌套、导入、注释、混合器、继承。

### 使用变量
![](./image/sass0.png)  

以`$`开头，如`$bar`.
```
// 变量为属性值
$cr: red;
.bar {
    color: $cr;
}
// 变量为属性值
$idKey = box !default // 默认值
.border-#{idKey} {...}

```
推荐使用中划线，可使用下划线。
多次声明时，前面的声明会被覆盖。
#### 默认值

```
$for: 10px !default;
.k {
    width: $for;
}
```
默认值会被确定值覆盖。一般用于部分文件。

### 使用嵌套
![](./image/sass1.png)  

|||||
|-|-|-|-|
|&|父选择器|||
|>|子元素选择器|||
|+|下一个元素选择器|||
|~|同级后元素选择器|||
|||||

### 使用导入
![](./image/sass2.png)  

@import "file" // 引入scss文件。可省略.sass/.scss
若需要引入css文件。则需要把扩展名改为scss，再引入。
导入就是代码拼接。多个scss文件拼接成一个scss文件。

#### 部分文件

以`_`开头的scss文件。如：`_f.scss`。
它不会生成独立的css文件。因此它是局部文件。
import时可以省略下划线。如：`@import "theme/f.scss"`

#### 嵌套导入

```
.blue {
    @import "theme/f"
}
```

### 使用注释
![](./image/sass3.png)  

|||||
|-|-|-|-|
|静默注释|//|不出现在生成的css文件中。||
|标准注释|/**/|出现在生成的css文件中。||

### 使用混合器
![](./image/sass4.png)  

@mixin与@include成对使用。
@mixin定义混合器。
@include使用混合器。

```
// defined
@mixin foo {
    border: 2px solid #24e;
}
// use
ul {
    @include foo;
}
// 可传参
@mixin link-colors($k0, $k1, $k2: default-value) {
    color: $k0;
    width: $k1;
    font-size: $k2;
}
ul {
    @include link-colors(red, 10px, 30px)
}
```

### 使用继承
![](./image/sass5.png)  

```
.error {
    ...
}
.s {
    @extends .error // .error及相关的组合选择器都会被继承。

}
```

### 指令

@at-root 指定该选择器在输出文档的根层级上。就是不参与嵌套。
        默念只跳出嵌套。若需要跳出更多，需要使用without
|without||||
|-|-|-|-|
|all||||
|rule||||
|media||||
|supoort||||

### 关键字
|关键字|意义|关键字|意义|
|-|-|-|-|
|@import|引入|||
|@mixin|定义混合|@include|使用混合|
|@extend|继承|||

## sass & scss
是同一事物在不同阶段的名称。
在二代以前叫`sass`
在三代以后叫`scss`

