# babel

## 比较在class中使用function / => 再经过转码后的不同

```
// 编码前
class Foo {
  constructor () {
    this.k = 'v'
  }
  a = () => {
    console.log(this)
  }
  b () {
    console.log(this)
  }
}

// 编码后
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value, enumerable: true, configurable: true, writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Foo {
  constructor() {
    _defineProperty(this, "a", () => {
      console.log(this);
    });
    this.k = 'v';
  }
  b() {
    console.log(this);
  }
}
```
相同：方法内的this都是指向实例的。
不同：=> 会使用`_defineProperty()`把this/方法名/箭头方法重新定义。