##渲染dom元素  

  ReactDOM.render(
    element,
    document.getElementById('id')
  )

##react jsx  

|做为独立文件|javascript表达式|
|-|-|
|引入这个文件|使用`{}`|  

jsx 简介  
是一种javascript的语法扩展。它完全在js内部实现。  
jsx中使用表达式要包含在大括号中。  

##react 组件  

1. 使用`function`  

  function HelloMessage (props) {
    return <h2>hello world!</h2>
  }
  const element = <HelloMessage />
  ReactDOM,render(
    element, 
    document.getElementById('id')
  )

2. 使用`es6 的 class`  

  class Welcome extends React.Component {
    render () {
      <!-- return <h1>hello world</h1> -->
      return <h1>hello, {this.props.name}</h1>
    }
  }

3. 使用组件  

  <!-- 只有dom标签 -->
  const element = <div />
  <!-- 使用自定义组件 -->
  function Welcome(props) {
    return <h1>hello, {props.name}</h1>
  }
  const element = <Welcome name="tom" />
  ReactDOM.render(
    element, 
    document.getElementById('root')
  )

4. 注意。  

  组件的返回值（return）只能有一个根元素。

只可以嵌套。  

##react state  

  class Clock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {date: new Date()}
    }
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        500
      )
    }
    componentWillUnmount() {
      clearInterval(this.timerID)
    }
    tick() {
      this.setState({
        date: new Date()
      })
    }
    render() {
      return (
        <div>
          <h1>hello world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      )
    }
  }
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );

改变state的正确方式  

  this.setState({key: value})
  this.setState((prevState, props) => { // prevState: 该函数先前的状态。
    return {
      counter: prevState.counter + props.increment
    }
  })

this.state和this.props可能是异步更新的。所以不应该根据state/props的值判断下一个状态。  
state 改变时重新渲染页面。  
数据自顶向下流动（单向）。  
各组件独门更新。  

|state|props|
|-|-|
|可变|不可变|
|用来修改数据|prop用来传递给子组件|  

从组件自身的角度命名props。不是根据使用组件的上下文命名。  

props 可以验证。  

##react 处理事件  

1. 使用驼峰式写法。 第一个字母小写。  
2. 需要传入一个函数作为事件处理函数。 
3. 传参时，事件对象要在最后面。使用`bind`方法   

  class Taggle extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isToggleOn: true
      }
      <!-- this.handleClick = this.handleClick.bind(this) // 把this.handleClick绑定到this. -->
    }
    handleClick (a, b, c) {
      console.log(a)
      console.log(b)
      console.log(c)
      this.setState((prevState) => ({
        isToggleOn: !prevState.isToggleOn
      }))
    }
    render () {
      return (
        <button onClick={this.handleClick.bind(this, 'a', 'b', 'c')}>
        {this.state.isToggleOn ? 'on' : 'off'}
        </button>
      )
    }
  }
  ReactDOM.render(
    <Taggle />,
    document.getElementById('root')
  )

##条件渲染  

###元素变量

  if (isLoggedIn) {
    button = <button onClick={this.handleLogoutClick}>test</button>
  } else {
    button = <button onClick={this.handleLoginClick}>test</button>
  }

###&&(与运算符)  

  {unreadMessage.length > 0 && <h2>title</h2>} // true && expression 返回 expression, false && expression 返回 false

###三目运算

  <p>this {isLoggedIn ? 'currently' : 'not'}</p>
  <p>this {isLoggedIn ? (<LogoutButton onClick={this.handleLogoutClick}/>) : (<LoginButton onClick={this.handleLoginClick}/>)}</p>

###阻止组件渲染

  render () {
    return null
  }

  function WarningBanner (props) {
    if (!props.warn) {
      return null
    }
  }

  <WarningBanner warn={this.state.showWarning} />

###循环渲染  

应该把key放在循环输出的元素上。  

React 组件 api  

setState  
replaceState  
setProps  
replaceProps  
forceUpdate  
findDOMNode  
isMounted  

生命周期  

状态：Mounting, Updating, Unmounting.  
生命周期方法：  
componentWillMount // 组件被装载前执行
componentDidMount // 组件被装载后执行
componentWillReceiveProps // 
shouldComponentUpdate  
componentWillUpdate  
componentDidUpdate  
componentWillUnmount  

react ajax  

  class UserGist extends React.Component {
    construnctor () {...}
    componentDidMount () {
      this.serverRequest = $.get(this.props.source, function () {
        var lastGist = result[0]
        this.setState({
          userName: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        })
      }.bind(this))
    }
    componentWillUnmount () {...}
    render () {
      return (...)
    }
  }

react form/event  

使用`ReactDOM.render()` 渲染。  
使用驼峰命名的事件处理事件。  

react refs  

使用这个（refs）属性得到相应的dom元素。  

|||
|||








react使用一个jsx的语法，是把html嵌入到js里。目的是为了使模板更整体。
webpack把jsx编译为js。使用jsx前需要安装loader。`npm i babel-loader --save-dev`
jsx是可选的。
react是单向数据绑定的。
```
React.createElement(tag, obj, inner)
// tag thml标签
// obj thml标签的属性、属性值对象
// tag thml标签的内部元素
```
react内置了常用的工厂方法
```
React.DOM.ul({className: 'myList'}, React.DOM.li(null, 'inner text'))
```



## jsx

小写标签是html标签。
大写标签是react组件。
```
import React from 'react'
import {render} from 'react-dom'
import MyComponent from './mycomponent'
var myElement = <MyComponent someProperty={true} />
render(myElement, document.body)
// render(component, dom)
// component 组件
// dom dom元素
```

### 注释
`{}`

### 属性

为组件设置属性。当有多个属性里，可以使用spread attributes。有点像解构赋值。
```
var component = <Component {...obj}>
```
属性可以被覆盖。

## 组件

组件有2个核心概念
组件一般由`React.componen`扩展出来，有reader方法、可选的生命周期函数、组件相关事件的方法。
```
import React, {Component} from 'react'
import {render} from 'react-dom'
class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {liked: false}
  }
  handleClick(e) {
    this.setState({liked: !this.state.liked})
  }
  render () { // 返回这个组件的html结构
    const text = this.state.liked ? 'like' : 'haven\'t linked'
    return (
      <p onClick={this.handleClick.bind(this)}>
        you {text} this. Click to toggle.
      </p>
      )
  }
}
render(LikeButton, docuement.querySelector('#id'))
```

### 1. props

内外部传入。不要更改它（可能与单向数据绑定有关）。

### 2. state

表示当前的状态，它是一个状态机。根据state的不同呈现不同的ui.
由`this.setState`触发重新渲染ui。

### 无状态组件

### 生命周期

### 事件处理

#### 1. 合成事件

以事件委托的方式绑定到最上层。在组件被卸载时销毁事件。

#### 2. 原生事件

如：addEventListener.
建议使用jsx的合成事件。

#### 参数传递

```
handleClick: (param, event) => {
  ...
}
render: () => {
  return <p onClick={this.handleClick.bind(this, 'extra param')}>...</p>
}
// bind(this, arg0, arg1, arg2)

```

### dom操作

有2种方法可以得到组件的dom元素

1. 在组件类内部使用`findDOMNode(this)`
2. 在dom元素上设置`ref`属性，现使用`this.refs.name`得到。

### 组合组件

```
import MyComponent from './MyComponent'
let myElement = <MyComponent someProp="string" />
render(myElement, dom)

const ProfilePic = (props) => {
  return (<img src={'string/path' +  key + 'string'} />)
}
let myElement = (props) => {
  return (<div><ProfilePic prop="string" /></div>)
}
render(myElement, dom)

// 循环插入子元素时，使用key会增加diff运行速度。

```

### 组件间通信

使用`this.props`可以访问父组件的数据、方法。

### mixins

我不会

## data flow

应用框架处理数据的方式。有2种实现方法。

### flux

flux的核心是单向数据流。
action -> dispatcher -> store -> view



### redux



# create react app (getting start)

## getting start

create react app 是一个正式的支持创建react的单页面应用的方法。它提供了一种不免配置的创建应用的方法。

### quick start

```
npx create-react-app my-app
cd my-app
npm start
```
`npm run build`

创建应用有3个方法
```
1. npxp
```
1. `npx create-react-app my-app`
2. `npm init react-app my-app`
3. `yarn create react-app my-app`

`npx create-react-app my-app --template [template-name]` // 使用指定模板创建react应用。
react模板有固定的命名格式：`cra-template-[template-name]`
可以自定义react模板。
`npm create-react-app my-app --template typescript` // 使用ts语言。

选择包管理工具。
若你已经安装yarn，但是更喜欢使用npm,需要添加在创建命令中添加--use-npm。
`npm create-react-app my-app --use-npm`

使用上述任一种方法都可以得到下面的目录结构。
```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```
创建完应用后，就可以使用内置的命令。
```
npm start // 在浏览器中打开 http://localhost:3000
  yarn start
npm test
  yarn test
npm run build
  yarn build
```

### folder structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html          // 模板文件
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js             // 入口文件
    logo.svg
```

### available script

npm start
npm test
npm run build
npm run eject // 若要修改webpack/babel等相关配置，需要执行eject命令，从脚手架中弹出配置文件才能修改。

### supported browsers and fealture

基本上支持所有的现代浏览器。支持ie9+.使用react-app-polyfill支持旧浏览器。

### updating to new release

- cracte-react-app是一个全局的命令行工具，用来生成新的react项目。
- cract-scripts 是一个生成项目中开发依赖。

## devleopment

### editor setup
### develoption components in isolation

有2个ui库可以在离线环境使用。

- storybook
- react styleguidist

```
npx -p @storybook/cli sb init

npm install --save react-styleguidist
npm run styleguidist
```

### analyzing bundle size

使用源码地图探索react app项目。
```
// install
npm i source-map-explorer
// definition script
"script": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
  ...
}
// analyze
npm run build
npm run analyze
```

### https in development

linux/macos
`HTTPS=true npm start`
服务将使用自签名证书，
可以定义一个执行脚本，方便不用每次执行命令行。
```
{
  "start": "HTTPS=true react-scripts start"
}
```

## styles and assets

### adding a stylesheet

这个项目使用webpack控制所有的资源。经常在js文件里使用`import`引入css。
```
import React, {Component} from 'react'
import './button.css'
class Button extends Component {
  render () {
    return <div className="Button"></div>
  }
}
```
这不是必须做的事件，但是很多人认为这样很好。

### adding a css modules stylesheet

react-script@2.+
经常使用有命名方法`[name].modules.css`
css module 允许会自动生成惟一的类名。格式如下：
`[filename]\_[classname]\_\_[hash]`

### adding a sass stylesheet

react-script@2.+
一般不推荐在不同组件中使用相同的类名。
推荐使用在一个组件中包含多个状态的类名。
```
npm i node-sass
```
在`*.js`文件里会把`*.scss/*.sass`编译为css文件。
node-sass支持SASS_PATH变量。在项目的根目录中的`.env`文件中定义`SASS_PATH=node_modules:src`。当需要指定多目录时可以使用:分隔。`path1:path2:path3`

### adding css reset

这个项目中使用postcss normalize处理css reset.
在css文件中的任意地方引入`@import-normalize`。
可以在browserslist中控制normalize.css的部分。
```
browserlist: {}
```







### editor
### editor
### editor
### editor
### editor
### editor
### editor
### editor


## building your app
## testing
## back-end integration
## deployment
## advanced usage
## support

