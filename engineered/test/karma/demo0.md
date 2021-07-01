# overview
本示例展示了：
- 如何使用karma+mocha执行测试代码。

# init project
```
mkdir projDir
cd projDir
npm init -y
npm i karma -D
npm i -D karma-jasmine karma-chrome-launcher jasmine-core
```

# generate config
```
npx karma init
// 本示例中可以全部使用默认值。即按下回车。
// 运行结果是生成 ./karma.conf.js
```
再修改`./karma.conf.js`
```
{
    ...
    file: [
        'test/*.js'
    ],
    ...
}
```

# defined
创建`./test/hello.js`
```
describe('A spec suite', function() {
    it('contains a passing spec', function() {
        console.log("Hello Karma");
    });
});
describe('ES6 spec', function() {
    it('es6 arrows feature ', function() {
         var add = (x, y) => x + y
         console.log(add(3,1))
    });
});
```
这是使用测试框架写的测试代码。若输出指定的文本，则说明被测试的代码运行正确。

# usage
```
npx karma start
// 在浏览器中打开`localhost:9876`
// or
// 在另一个终端窗口中运行 `npx karma run`
// npx karma run  -- --grep <describe string> // 运行指定的测试集合、测试项。
```
