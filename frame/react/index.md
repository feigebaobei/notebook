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

## create project

npm i -g create-react-app
create-react-app my-app
cd my-app
npm start

## dom render

let element = (
  <div>
    <h2>title</h2>
    <p>now: {new Date().toLocalTimeString()}</p>
  </div>
)
let dom = document.querySelector('#example')
React.render(element, dom)

## jsx

1. 执行更快。在编译为js时进行了优化。
2. 类型安全，在编译时能发现错误。
3. jsx可读性更高。

可成为独立文件。
js表达式使用{}包裹。
推荐使用内联样式。使用camelCase.
注释`{/*...*/}`
直接使用数组。

## 组件

function HelloMessage (props) {
  return <h2>hello</h2>
}
const element = <HelloMessage />
ReactDOM.render(element, dom)

### 受控组件

让有自身行为的dom元素（如：表单组件）添加react处理事件的能力。
```
class NameForm extends React.Component {
  constructor (props) {
    super(props)
  }
  fn () {}
  render () {
    return (
      <div>
        <form>
          <input text="input" value={this.state.value} onChange={this.fn} />
        </form>
      </div>
      )
  }
}
```
多个输入
```
为form元素添加name属性。
在处理方法体中检查target.name，再分别处理。
```

与非受控组件的区别在于是否有value prop。

### 复合组件

function Name (props) {
  return (
    <h2>name: {props.name}</h2>
  )
}
function Url (props) {
  return (
    <h2>url: {props.url}</h2>
  )
}
function App () {
  return (
    <div>
      <Name />
      <Url />
    </div>
  )
}
// or
// 有点像vue里的slot
function Parent (props) {
  return (
    <div>
      <div>
        {props.left}
      </div>
      <div>
        {props.right}
      </div>
    </div>
  )
}
funtion UserParent () {
  return (
    <Parent
      left = <first/>
      right = <second/>
    />
  )
}
ReactDOM.render(<App />, dom)

### api

setState(Object nextState[, cb])
把nextState与state合并。
cb在设置nextState成功且组件重绘后执行。
不能在组件内部通过this.state修改状态，因为该状态会在调用setState()后被替换。
为了提升性能React会批量执行state和DOM渲染。
setState()总是会触发一次组件重绘，
replaceState(Object nextState[, cb])
setProps(Object nextProps[, cb])
会触发组件重新渲染。
replaceProps(Object nextProps[, cb])
forceUpdate([cb])
findDOMNode()
当组件挂载到dom后，调用此方法，则返回组件的dom元素，当render为false/null时，则返回null.
isMounted()
Boolean，是否挂载到dom中。

## state

组件可看成一个状态机。
使用setState修改state，不使用state。
修改state是异步的。
state的更新会被合并。
this.setState({key: value})
componentWillMount()
componentDidMount()
componentWillUnmount()
componentDidUnmount()
数据自上向下流动
class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {date: new Date()}
  }
  componentDidMount () {}
  componentDidUnmount () {}
  tick () {}
  render () { // 必须
    return (
      <div>
        <h2>hello</h2>
      </div>
    )
  }
}
ReactDOM.render(<Clock />, dom)

## props

从父传递来的。不可改变。只为当前组件输入数据。
若要修改组件内部状态，请使用`state, this.setState(k, v)`

## event

使用camelCase.
class Toggle extends React.Component {
  fn (e) {...} // e是react事件对象
  render () {
    return (
      <div>
        <p onClick="fn"></p>
        <p onClick="this.fn.bind(param, e)"></p>
      </div>
    )
  }
}
参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，

```
class Hello extends React.Component {
  ...
  fn (e) { // e是react的事件对象
    this.setState({value: e.target.value})
  }
  render () {
    return (
      <div>
        <input onChange={this.fn} /> {/* 注意使用camelCase */}
      </div>
    )
  }
}
```

## 条件渲染

let element = function (props) {
  if (props.bool) {
    return <first />
  } else {
    return <second />
  }
}
ReactDOM.render(
  element,
  dom
)

### 阻止组件渲染

function comp (props) {
  if (!props.bool) {
    return null
  } else {
    return (<h2>string</h2>)
  }
  // or
  // !props.bool ? null : (<h2>string</h2>)
}

## lifecycle

主要有三个状态：
- Mounting
- Updating
- Unmounting

|fn|可调用环境|-|触发时机|返回值|
|-|-|-|-|-|
|componentWillMount|server/client||||
|componentDidMount|client|this.getDOMNode() // 可得到当然组件的dom|当组件挂载后执行。ajax请示一般用在这里。||
|componentWillReceiveProps|||更新prop时被调用，render时不调用。||
|shouldComponentUpdate|||当更新props/state时调用|返回Boolean|
|componentWillUpdate|||更新prop、state时被调用，render时不调用。||
|componentDidUpdate|||更新组件后被调用，初始化时不调用。||
|componentWillUnmount|||组件从dom中移除前调用||

## 列表 & keys

在 map() 方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的 key。兄弟元素间惟一，全局可以不惟一。

```
function ListItem (props) {
  return (<li>{props.value}</li>)
}
function NumberList (props) {
  numbers = props.numbers
  function listItems (numbers) {
    numbers.map(num => <ListItem key={number.toString()} vlaue={num}>)
  }
  return (
    <ul>
      {/* <ListItem key={number.toString()} value={number} /> */}
      {listItems}
    </ul>
  )
}
```

const numbers = [1, 2, 3]
ReactDOM.render(
  <NumberList numbers={numbers}/>,
  dom
)

## 组件间数据传递

在父组件上设置`updateStateProp={fn}`。
在子组件上为句柄设置`this.props.updateStateProp`。

```
class Content extends React.Component {
  render () {
    return <button onClick={this.props.updateStateProp}>bt</button>
  }
}
class Hello extends React.Component {
  fn (e) {...}
  render () {
    return <div>
      <Content updateStateProp={fn}/>
    </div>
  }
}
```

## 状态提升

当一个组件需要一个数据时，就把该数据设置到该组件的state里。若多个组件都需要使用同一份数据，则把该组件设置到这些组件的公共祖先组件里。这个过程称为状态提升。

## ref

得到render()返回的支撑实例（backing instance）

```
class Hello extends React.Component {
  fn () {
    this.refs.hi.focus()
  }
  render () {
    return <div ref="hi"></div>
  }
}
```

## react对象

```
React: {
  Children: {}
  Component(),
  Fragement
  Profiler,
  PureComponent()
  StrictMode,
  Suspense
  cloneElement()
  createContext()
  createFactory()
  craeteRef()
  forwardRef()
  isValidElement()
  lazy()
  memo()
  useCallback()
  useContext()
  useDebugValue()
  useEffect()
  useLayoutEffect()
  useMemo()
  useReducer()
  useRef()
  useState()
  version,
  __SECRET_INTERNALS_NO_NOT_USE_OR_YOU_WILL_BE_FIRED
}
```
## cdn

```
// umd版本
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

## 代码分割

React.lazy 目前只支持默认导出（default exports）。
```
import React, {Suspense} from 'react'
function MyComponent () {
  return (
    <div>
      <Suspense fallback={<div>hi</div>}
        <OtherComponent />
      </Suspense>
    </div>
  )
}
import React, {lazy} from 'react'
const MyComponent = lazy(() => import('./MyComponent.js'))
```

## context

处理组件间数据传递。
使用content前时可以考虑把组件嵌套压扁些。减少组件嵌套的深度。
context类似vue里的provide.

### api

```
// 实例化
const MyContext = React.createContext(defaultValue)
MyContext.Provider
<MyContext.Provider value={...}>
Class.contextType
MyClass.contextType = MyContext
MyContext.displayName
MyContext.Provider
MyContext.Provider
MyContext.Provider
MyContext.Provider
MyContext.Provider
< >
```

## 错误边界

### componentDidCatch(error, info)

### title
### title
### title
### title
### title
### title
### title

