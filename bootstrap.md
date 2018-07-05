#bootstrap
bootstrap是一个前端样式包。适用于前端初学者、后端工作人员。我个人反对使用它。

##概览

1. 指明html5文档。 `<!DOCTYPE html>`  
2. 移动设备优先。 `<meta name="viewport" content="width=device-width, initial-scale=1">` `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
3. 排版与链接。
4. normalize.css。
5. 布局容器。`<div class="container"></div>` `<div class="container-fluid"></div>`

##栅格系统

1. `.row`必须在`.container`或`.container-fluid`中
2. `.row`的有且只有子元素`.col-xs-*`
3. 列可嵌套行，行再指定列。

||超小屏幕|小屏幕|中等屏幕|大屏幕|
|-|-|-|-|-|
|数值|<768px|>=768px|>=992px|>=1220px|
|类|`.col-xs-*`|`.col-sm-*`|`.col-md-*`|`.col-lg-*`|
|间隔|间隔30px|间隔30px|间隔30px|间隔30px|
|偏移。（margin-left）|`.col-xs-offset-*`|`.col-sm-offset-*`|`.col-md-offset-*`|`.col-lg-offset-*`|
|列排序（position:relative;left:*%;）|向左移：`.col-xs-pull-*` 向右移：`.col-xs-push-*`|`.col-sm-pull-*` `.col-sm-push-*`|`.col-md-pull-*` `.col-md-push-*`|`.col-lg-pull-*` `.col-lg-push-*`|

##排版

###内联文本元素

|html|eg|
|-|-|
|`<del></del>`|<del>del</del>|
|`<mark>mark</mark>`|<mark>mark</mark>|
|`<s>s</s>`|<s>s</s>|
|`<ins>ins</ins>`|<ins>ins</ins>|
|`<u>u</u>`|<u>u</u>|
|`<small>small</small>`|<small>small</small>|
|`<strong>strong</strong>`|<strong>strong</strong>|
|`<i>i</i>`|<i>i</i>|

###对齐

|描述|类|
|-|-|
||`.text-left`|
||`.text-center`|
||`.text-rigth`|
||`.text-center`|
||`.text-justify`|
||`.text-nowrap`|

###改变大小写

|||
|-|-|
||`.text-lowercase`|
||`.text-uppercase`|
||`.text-capitalize`|

###引用

|||
|-|-|
|`<blockquote>blockquote</blockquote>`|<blockquote>blockquote</blockquote>|
|`<cite>cite</cite>`|<cite>cite</cite>|
|`.blockquote-reverse`|引用右对齐|
|`<blockquote>blockquote</blockquote>`|<blockquote>blockquote</blockquote>|
|`<blockquote>blockquote</blockquote>`|<blockquote>blockquote</blockquote>|

###列表

||||
||-|-|
|无样式|`<ul class="list-unstyled"></ul>`||
|内联列表|`.list-inline`||
||||

##表格

|||||
|基本类|`.table`|||
||`.table-stripe`|||
||`.table-bordered`|||
||`.table-hover`|||
||`.table-condensed`|||
|响应式表格|用`.table-responseive`包裹`.table`|响应式表格（出现水平滚动条）||
||状态类|||
||`.active`|||
||`.success`|||
||`.info`|||
||`.warning`|||
||`.active`|||
||`.danger`|||

##表单
一定要有label标签  
用`div.form-group`包裹`label`和`input`  

||||
|-|-|-|
|基本实例|`.`||
|内联表单|`.form-inline`||
|内联表单|`.form-horizontal`||


||多选单选框||
||||
||`.radio`||
||`.radio-inline`||
||`.checkbox`||
||`.checkbox-inline`||
||`.disabled`||


##button

||||
|-|-|-|
||`.btn`||
||`.btn-default`||
||`.btn-primary`||
||`.btn-success`||
||`.btn-info`||
||`.btn-warning`||
||`.btn-danger`||
||`.btn-link`||
||`.btn-lg`||
||默认大小不用写||
||`.btn-sm`||
||`.btn-xs`||
||`.btn-block`||
||`.active`|激活状态|
||`.disabled`|激活状态|
||`.close`||


##图片

|||
|-|-|
||`.img-responsive`|
||`.img-rounded`|
||`.img-circle`|
||`.img-thumbnail`|

##辅助类

|||
|-|-|
||`.text-muted`|
||`.text-primary`|
||`.text-success`|
||`.text-info`|
||`.text-warning`|
||`.text-danger`|
||背景色|
||`.bg-primary`|
||`.bg-success`|
||`.bg-info`|
||`.bg-warning`|
||`.bg-danger`|
||float|
||`.pull-left`|
||`.pull-right`|
|内容块居中|`.center-block`|
|清除浮动|`.clearfix`|
||`.show`|
||`.hidden` `.sr-only`|
||可见的类|
||`.visible-xs-*`|
||`.visible-sm-*`|
||`.visible-md-*`|
||`.visible-lg-*`|
||`.hidden-xs-*`|
||`.hidden-sm-*`|
||`.hidden-md-*`|
||`.hidden-lg-*`|

gwt toking
