# overview
本示例展示了：
- 如何在项目中使用jest

# init project
```
mkdir projDir
cd projDir
npm init -y
npm i -D jest
```

创建`<root>/sum.js`。作用为被测试文件。
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

创建`<root>/sum.test.js`。作用为测试文件。
```
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

# usage
```
npx jest
```

# priciple
原理
