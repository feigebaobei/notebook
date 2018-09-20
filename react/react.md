#react

1. 引入`react.development.js`, `react-dom.development.js`, `babel.min.js`  
2. `<script type="text/babel">...</script>`  

使用create-react-app构建react开发环境  

	$ cnpm install -g create-react-app
	$ create-react-app appname
	$ cd appname
	$ npm start

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
