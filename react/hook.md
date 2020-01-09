# 生命周期
## 生命周期图

![生命周期图]()

## function

### constructor(props, context)

### componentWillMont()

一般在服务端执行。
组件经过constructor()后（初始化完数据）还没渲染dom时执行。

### componentDidMount()

第一次渲染完成。
此时可以执行ajax.

### componentWillUnmount()

销毁组件。

### componentWillReceiveProps(nextProps)

当父组件的props改变时执行。
nextProps： 改变后的props.

### shouldComponentUpdate(nextProps, nextState)

是否重新渲染组件。
一般用于渲染组件时的性能优化。
react的生命周期函数中惟一一个控制重新渲染的钩子函数。
return true    重新渲染
return false 不重新渲染

### componentWillUpdate(nextProps, nextState)

组件被重新渲染前。
nextProps, nextState 最新的prop/state

### componentDidUpdate(prevProps, prevState, snapshot)

更新时（不是挂载时）执行该方法。
setState()后执行。
prevProps, prevState 更新前的props/state
snapshot：getSnapshotBeforeUpdate()的返回值

### render()

渲染
