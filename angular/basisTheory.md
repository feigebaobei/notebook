# 英雄指南

## 应用的外壳

```
ng new angular-pr-name
cd angular-pr-name
ng serve --open // ng serve -o
```

app.component.ts // 组件的类文件
app.component.html // 组件的模板
app.component.css // 组件的私有的css样式

src/style.css // 全局样式
若使用css预处理工具，则是该工具相应的后缀名。

## 英雄编辑器

1. 创建组件`ng generate component name`
2. 创建类 (右击-创建文件)
3. 在组件中使用类，在父组件中使用子组件。
4. 管道符|。它在绑定表达式{{}}内部。其左边是数据，其右边是管道。angular有一些内置的管道。程序员也可管道。
5. 数据双向绑定。
5.1 在app.module.ts里引入FormsModule
5.2 在imports里使用。
5.3 在相应的模板文件（`*.html`）里使用。

## 显示英雄列表

1. 创建模拟数据。
2. 在组件的类文件中使用该数据。
3. 在组件的模板文件中使用`*ngFor`渲染数据。
4. 为列表项绑定事件。
5. 在类文件中创建事件方法。
6. 添加选中的样式。

## 主从组件

1. 创建组件。使用@Input接收数据。
2. 在父组件中使用子组件。传入数据。

## 服务

1. 组件应该显示数据。不应该保存、获取数据。
2. 让服务去做访问数据的工作。
3. 创建服务`ng generate service name`
4. 在服务中引入mock数据。 注入数据、得到数据。
5. 在组件的类中引入服务、注入服务、使用方法得到服务中的数据。
6. 在ngOnInit中得到服务中的数据。
7. 使用可观察的方式异步得到、渲染数据。

## 路由

1. 添加路由模块。
2. 设置路由路径。
3. 设置路由入口、出口。
4. 从路由中很到数据。
4.1 activatedRoute // 可得到路由里的数据。
4.2 location // 与浏览器的location对象有关。

## http

HttpClient是angular通过http与远程服务器通讯的机制。
1. 引入内存服务。
2. 调用 web api.
3. 模板中添加操作按钮触发类中的方法。
4. 在服务中添加与web api对接的方法。
5. 在类中添加与服务对接的方法。

# 架构










# 组件与模板
# 表单
# observable与rxjs
# 引导启动
# NgModule
# 依赖注入
# HttpClient
# 路由与导航
# 动画









ng generate component xyz
ng add @angular/material
ng add ____
ng test
ng build --prod