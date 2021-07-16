# overview
本示例展示了：
- 如何使用`@babel/cli + @babel/preset-env`把`es6`编译为`es5`

# init project
```
crtp initProj projName
cd projName
npm i @babel/cli @babel/preset-env -D
```

## 创建文件
创建`<root>/src/person.js`
```
class Person {
    constructor() {
        this.name = 'big'
    }
    sayName() {
        console.log(`my name is ${this.name}`)
    }
}
var p = new Person()
p.sayName()
```
创建`<root>/.babelrc`
```
{
    "presets": ["@babel/env"]
}
```
编辑`<root>/package.json`
```
... // other code
"script": {
    "build": "babel src -d dist"
... // other code
```

# usage
`npm run build`

# 后记
打包结果在`<root>/dist/`里。