1.Decorator 是一个函数 
2.通过Decorator(修饰器）能修改 类 的行为（扩展 类 的功能）
3.Decorator(修饰器）只在类的范围有用

```
let readonly = (target, name, descriptor) => {
	// target     目标(被装饰的对象，可以是类的方法也可以是类)
	// name       被装饰的属性名
	// descriptor 属性描述符对象，{configable,value,wirtable,enumberable}
}
```
装饰器不能用于函数。因为函数会被提升。

```

npm i @babel/plugin-proposal-decorators

// package.json
{
  "plugins": [
    ["@babel/plugin-proposal-decorators": {"legacy": true}],
    ["@babel/plugin-proposal-class-properties": {"loose": true}],
  ]
}

// 只能这样写。写一行。
export @decorator class Bar {...}

@dec class Foo {
  ...
  @bar first () {...}
  @ho(params) second () {...}
}
```

