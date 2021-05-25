# overview
使用js写的很快的精确匹配器。
特点：
- 轻量级
- 接口好用
- 快
- 性能好
- 精确匹配
- 方便测试

# install
`npm i picomatch`

# usage
```
const pm = require('picomatch');
const isMatch = pm('*.js');
console.log(isMatch('abcd')); //=> false
console.log(isMatch('a.js')); //=> true
console.log(isMatch('a.md')); //=> false
console.log(isMatch('a/b.js')); //=> false
```
# api

|function|description|parameter|return|||
|-|-|-|-|-|-|
|picomatch||||||
|.test||||||
|.matchBase||||||
|.isMatch||||||
|.parse||||||
|.scan||||||
|.compileRe||||||
|.makeRe||||||
|.toRegex||||||

# principle