# overview
本示例展示了：
- 如何与测试工具（如：mocha）结合使用
- esm规范下使用mocha/chai/sinon

# init project
```
mkdir projDir
cd projDir
npm init -y
npm i -D mocha sinon chai
```

## 创建文件
编辑`<root>/package.json`
```
// ... other code
"type": "module"
}
```
创建`<root>/test/hooks.js`
```
import sinon from "sinon"
export let mochaHooks = {
    // mochaHooks: {
        afterEach() {
            sinon.restore
        }
    // }
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
export {once}
```
创建测试文件`<root>/test/first.js`
```
import sinon from 'sinon'
import {once} from '../src/index.js'
import {assert} from 'chai'
describe('str', () => {
    it('first', () => {
        var callback = sinon.fake();
        var proxy = once(callback);
        proxy();
        // log (sf)
        // sinon.
        assert(callback.called);
    })
})
```

# usage
```
npx mocha --require test/hooks.js
```
