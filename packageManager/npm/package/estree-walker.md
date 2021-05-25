# overview
兼容estree的ast程序。

# install
`npm i estree-walker`

# usage
```
var walk = require('estree-walker').walk;
var acorn = require('acorn');
ast = acorn.parse(sourceCode, options); // https://github.com/acornjs/acorn
walk(ast, {
  enter(node, parent, prop, index) {
    // some code happens
  },
  leave(node, parent, prop, index) {
    // some code happens
  }
});
```

# principle
```
<root>
|-- index.js
|-- walker.js
|-- async.js
|-- sync.js
```
在index.js中暴露了2个方法：`async`/`sync`，分别来自`async.js`/`sync.js`。二者都使用了`walker.js`。
walker.js输出了一个类。
```
{
    replace()
    remove()
}
```
