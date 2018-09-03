#react

1. 引入`react.development.js`, `react-dom.development.js`, `babel.min.js`  
2. `<script type="text/babel">...</script>`  

使用create-react-app构建react开发环境  

	$ cnpm install -g create-react-app
	$ create-react-app appname
	$ cd appname
	$ npm start

渲染dom元素  

	ReactDOM.render(
		element,
		document.getElementById('id')
	)

react jsx  

|做为独立文件|javascript表达式|
|-|-|
|引入这个文件|使用`{}`|  

react 组件  

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
			return <h1>hello world</h1>
		}
	}

只可以嵌套。  

react state  

state 改变时重新渲染页面。  
数据自顶向下流动。  
各组件独门更新。  

|state|props|
|-|-|
|可变|不可变|
|用来修改数据|prop用来传递给子组件|

props 可以验证。  

react 处理事件  

1. 使用驼峰式写法。 第一个字母小写。  
2. 需要传入一个函数作为事件处理函数。 
3. 传参时，事件对象要在最后面。使用`bind`方法   

	<button onClick={activateLasers}></button>

	class Popper extends React.Component {
		constructor () {...}
		fn (prop1, prop2, event) {
			event.preventDefault()
			....
		}
		render () {
			return (...)
		}
	}
	<a href="#" onClick={this.fn.bind(prop1, prop2, event)}></a>

条件渲染  

根据state渲染相应出的dom。  
会用到三目，if,与（&&）  
阻止渲染  

	function WarningBanner (props) {
		if (!props.warn) {
			return null
		}
	}

	<WarningBanner warn={this.state.showWarning} />

循环渲染  

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
componentWillMount  
componentDidMount  
componentWillReceiveProps  
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
