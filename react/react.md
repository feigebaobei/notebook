#react

1. 引入`react.development.js`, `react-dom.development.js`, `babel.min.js`  
2. `<script type="text/babel">...</script>`  

类似 XML 的写法被称为 JSX
使用jsx与使用类扩展的效果一样。感觉jsx是类扩展的语法糖。
```
// jsx
return (
  <button onClick={() => this.setState({liked: true})}>Like</button>
)
// extend
return e('button', {onClick: () => this.setState({liked: true})}, 'Like')
```
若要在`script`标签中使用jsx.则需要在为`script`标签设置`type="text/babel"`
使用jsx,需要安装node.js.

使用create-react-app构建react开发环境  

	$ cnpm install -g create-react-app
	$ create-react-app appname
	$ cd appname
	$ npm start

## 创建react应用

根据用途不同，可以有三种不同创建方式。
1. create-react-app(单页面应用)
2. Next.js(静态化与服务端渲染应用)
3. Gatsby(静态网站)

## cdn链接

### 适用于开发环境（记得指定相应版本）

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

### 适用于生产环境（记得指定相应版本）

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

script标签的crossorigin属性是为了更好的错误处理体验。

