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

## 架构概览

### 架构概览

angular是一个用html/ts构建客户端应用的平台与框架。
其基本构造块是NgModule.它为组件提供了编译的上下文环境。
NgModule会把相关的代码集合在一起，使其完成一些功能。整个angular项目是由多个（或一个）NgModule定义出来的。应用中至少有一个用于引导应用的根模块，通常还会有好多特性模块。
- 组件定义视图。
- 组件使用服务。
组件和服务都是类，
- 组件类的元数据把组件类和用来定义视图的模板关联起来。
- 服务类

### 模块

angular定义的NgModule与js的模块是互补的，NgModule为其组件集设置了编译的上下文环境。使其组件关联起来，形成一个功能单元。
每个angular应用都有一个根模块，通常命名为AppModule。
可以引入别的模块，也可以导出该模块的方法。
使用NgModule可以实现惰性加载的优点。

### 组件

应用中至少有一个组件。使用@component()装饰器表明紧跟它的一个类是组件，并提供模板与该组件专属的元数据。

#### 模板、指令和数据绑定

指令：提供程序逻辑，
标记：数据与dom连接起来。
数据绑定：1.事件绑定 2.属性绑定
管道可以方便转换数据。（这样可以增强用户体验）。

### 服务与依赖注入

服务类：一般与特定视图无关可跨组件共享数据或逻辑的类。
通常是在@Injectable()装饰器后的类。该装饰器的元数据可以让服务作为依赖注入到客户组件中。

#### 路由

路由器会根据应用中的导航规则和数据状态拦截url。导航到一个新的视图，记录下路由动作。

## 模块简介
## 组件简介
## 服务与DI简介
## 后续步骤

# 组件与模板

## 显示数据

通过把html模板中的控件绑定到angular组件的属性来显示数据。
插值表达式interpolation `{{key}}`。先求值再转换为客串。
`*ngFor`
`*ngIf`
@Component({
  selector
  template
  templateUrl
  styleUrl
})

## 模板语法

模板中的html不能使用`<script>`













## 用户输入
## 生命周期钩子
## 组件交互
## 组件样式
## Angular自定义元素
## 动态组件
## 属性型指令
## 结构型指令
## 管道
# 表单

## 简介

1. 响应式表单
2. 模板驱动表单


















## 响应式表单
## 模板驱动表单
## 表单验证
## 动态表单
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