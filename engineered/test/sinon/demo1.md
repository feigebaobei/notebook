# overview
本示例展示了：
- cjs规范下使用mocha/chai/sinon

# init project
同`./demo0.md`

## 创建文件
创建`<root>/test/hooks.js`
```
let sinon = require('sinon')
module.exports = {
    mochaHooks: {
        afterEach() {
            sinon.restore
        }
    }
}
```
创建被测试文件`<root>/src/index.js`
```
function once(fn) {
    var returnValue,
      called = false;
    return function () {
      if (!called) {
        called = true;
        returnValue = fn.apply(this, arguments);
      }
      return returnValue;
    };
}
module.exports = {
    once
}
```
创建测试文件`<root>/test/first.js`
```
let sinon = require('sinon')
let {once} = require('../src/index.js')
let {assert} = require('chai')
describe('str', () => {
    it('first', () => {
        var callback = sinon.fake();
        var proxy = once(callback);
        proxy();
        assert(callback.called);
    })
})
```

# usage
```
npx mocha
```
