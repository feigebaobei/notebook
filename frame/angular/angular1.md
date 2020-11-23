## 指令
都是以ng开头。
ng-app
  指定angularjs应用程序的所有的dom元素。
  定义angularjs应用的根元素。
  网页加载完毕后自动引导应用程序。
ng-model
  把html元素绑定到程序数据。
  数据双向绑定。
  应用状态
    ...
ng-bind
  绑定变量为dom元素的innerHTML
ng-init
  初始化变量
ng-repeat
ng-show
ng-disabled
ng-hide
ng-click
ng-view
  开创一个视图区，只占位符，没有值。

## angular方法

module
config
run 初始化全局数据，省略了控制器的环节，直接把数据挂载到全局作用域下。
  ```
  app.run(['$rootScope', '$timeout', function ($routScope, $timeout) {...}])
  ```
directive
  ```
  app.directive('directiveName', function () {
    return {
      restrict: string,
      replace: boolean 是否使用html模板替换原来的元素
      priority 规定指令的优先级
      template string
      templateUrl string
      scope boolean | object
        ture 继承父作用域，并新建独立作用域
        false 共享父作用域
        object 不继承父作用域，创建新的独立作用域
          {
            key0: '@' 子可以感受到父的变化，反之不行。
            key0: '&' 双向绑定
            key0: '=' 以函数的形式从父作用域中读取属性。
          }
      require
    }
    })
  ```
component 1.5.+
  ```
  app.component('componentName', {
    template: string | funtion,
    templateUrl: string,
    transclude: boolean,
    binding: object,
    controllerAs: string,
    require: string,
    controller: string |function
  })
  ```

### 自定义指令

```
<body ng-app="myApp">
  <r-d></r-d>
</body>

var app = angular.module('myApp', [])
app.directive('rD', function () {
  return {
    restrict: 'A',
    // A 作为属性使用
    // E 作为元素名使用
    // C 作为类名使用
    // M 作为注释使用
    // 默认为EA
    template: '<h3>title 3</h3>'
  }
})

// 使用自定义指令
1. <r-d></r-d>
2. <div r-d></div>
3. <div class="r-d"></div>
4. <!-- directive: r-d -->
```

## 表达式

`{{expression}}`与`ng-bind`作用相同。

## 应用

ng-app 指明应用
ng-controller 指明控制器

angularjs模块定义应用
```
<div ng-app="myApp" ng-controller="myCtrl">...</div>

var app = angular.module('myApp', []) // 模块
app.controller('myCtrl', function ($scope) { // 控制器
  $scope.firstName = 'string'
  $scope.lastName = 'string2'
  })
```

## scope 作用域

视图与控制器之间的纽带。

```
app.controller('myCtrl', function ($scope) {
  $scope.name = 'string'
})
```
mcv
根作用域 rootScope($rootScope)

## 控制器

```
app.controller('myCtrl', function ($scope) {...})

// 外部文件的控制器
<script src="../path/to/subCtrl.js"></script>
// subCtrl.js
angular.module('myApp', []).controller('myCtrl', function () {...})
```
## 管道（也叫过虑器）

1. currency
2. filter
2.1 filter:模型名称
2.2 自定义过滤器
  `angular.module('myApp', []).filter('filteName', function () {可以注入依赖...})`
3. lowercase
4. orderBy
5. uppercase

<p>{{key | pipe}}</p>

## 服务

内置了很多服务
1. location 类似window.location。
2. http 向服务器发送请求
3. timeout 类似window.setTimeout
4. interval 类似window.setInterval
5. ...
31. 自定义服务
  app // angular.module('myApp', [])
  app.service('hexafy', function () {
    ...
  })

### http ($http)

```
app.controller('c', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'string'
    }).then(function successCallback(response) {...}, function errorCallback(response) {...})
  })

$http.get('url').success(function (res) {...})
```

### q ($q)

angularjs自己封闭的一种promise对象。它有三种常用的方法。
1. defer()
2. all()
3. when()

#### defer

该方法返回一个deferred对象。这个对象可以有3个常用的方法：
resolve, reject, notify.
在$q中使用resolve()变成完成状态。使用reject()变成拒绝状态。
defer()用于创建一个deferred对象。defer.promise返回一个promise对象。

#### all

all()把多个promise对象组合成在一起。当所有promise执行成功后执行下面的代码。
```
$q.all([p0, p1, p2]).then(...).catch(...)
```

#### when

when()方法使用的参数不确定。是否是promise都可以。

## select

```
<select ng-init="selectedName=names[0]" ng-model="selectedName" ng-options="x for x in names">
</select>

<select>
  <option ng-repeat="x in names">{{x}}</option>
</select>
```

## 表格

```
<table>
  <tr ng-repeat="x in names">
    <td>{{x.name}}</td>
    <td>{{x.age}}</td>
  </tr>
</table>
  // use filter
  <tr ng-repeat="x in names | orderBy : 'age'"></tr>
  <td>{{$index}}</td>
  <td ng-if="$odd">{{$index}}</td>
  <td ng-if="$even">{{$index}}</td>
```

## sql

## 事件

```
<button ng-click="toggle()">click</button>
app.controller('c', function ($scope) {
  $scope.toggle = function () {...}
  })
```

## 表单

```
<form  ng-app="myApp"  ng-controller="validateCtrl"
name="myForm" novalidate>
  <p>用户名:<br>
    <input type="text" name="user" ng-model="user" required>
    <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
    <span ng-show="myForm.user.$error.required">用户名是必须的。</span>
    </span>
  </p>
</form>
```

## 包含

```
<div ng-include="'url'"></div>
// 跨域
app.config(function ($sceDelegateProvide) {
  $sceDelegateProvide.resourceUrlWhitelist([
    'https://h5uid.net/**'
  ])
})
```

## 指令

```
<script type="text/javascript" src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular-animate.min.js"></script>

<body ng-app="ngAnimate">
  <div ng-hide="myCheck"></div>
</body>
ng-show
ng-hide
ng-view
ng-include
ng-repeat
ng-if
ng-switch
ng-animate
ng-hide-anmiat
ng-hide-remore
ng-hide-add-active
ng-hide-remove-active
```

## 依赖注入

### factory

创建一个对象，再添加方法、数据，然后返回。
```
app.factory('factoryName', function () {
  var o = {}
  o.key = 'string'
  return o
})
app.controller(c, function ($scope, factoryName) {
  ...
})
```

### provider

```
app.provider('pName', function () {
  var f = function (param) {
    ...
  }
  this.$get = function () { // 一定要有
    return f
  }
})
```

### service

```
app.service('sName', function () {
  this.key1 = 'string',
  this.key2 = function () {}
  })
```

## 路由

```
<script src="https://cdn.bootcss.com/angular.js/1.7.0/angular-route.min.js"></script>

angular.module('myApp', ['ngRoute'])
.controller()
.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    template: string,
    templateUrl: string,
    controller: string | function,
    controllerAs: string,
    redirectTo: string | function,
    resolve: object<key, function>
  }).when('/about', {...}).otherwise({
    redirectTo: 'string'
  })
})

<div ng-view></div>
```
