# 配置小程序

## 全局配置

作用于全部页面。

## 页面配置



## sitemap配置

# 逻辑层

## 注册小程序

```
App({
	onLaunch (options) {...}, // 小程序初始化
	onShow (options) {...}, // 小程序启动、切入前台
	onHide () {...}, // 切入后台
	onError (options) {...} // 监听错误
	onPageNotFound (options) {...} // 小程序要打开的页面不存在时触发。
	// options {
		// path: '',
		// query: {},
		// referrerInfo: {
			// scene: 1001,
			// shareTicket: ''
		// }
	// }
})
```
app的数据使用以下
设置app对象里的全局数据
`app.key = value`

### onLaunch / onShow 方法的参数

|key|type|description|
|-|-|-|
|path|string|打开小程序的页面路径|
|query|object|打开小程序的页面参数query|
|scene|number|打开小程序的场景值|
|shareTicket|string|-|
|referrInfo|object|当场景为由从另一个小程序或app打开时，返回此字段。|
|referrInfo.appId|string|来源小程序或app的appId|
|referrInfo.extraData|object|来源小程序传来的数据。当场景值为1037/1038时有效。|

## 数据缓存

wx.getStorage(object) // 从本地缓存中异步获取指定key的内容。
object: {
	key: string,
	success: (value) => {},
	fail: () => {},
	complete: () => {}
}

# 框架

页面栈最大为10层（受到宿主环境限制）。

|||||
|-|-|-|-|
|初始化||||

## Pgae

```
Page({
	data: {}, // 页面的初始数据
	onLoad: function (obj<query>) {...}, // 监听页面加载 obj:当前页面路径中的参数
	onShow: function () {...}, // 监听页面显示
	onReady: function () {...}, // 监听页面初次渲染
	onHide: function () {...}, // 监听页面隐藏
	onUnload: function () {...}, // 监听页面卸载
	onPullDownRefresh: function () {...}, // 监听用户下拉动作
	onReachButton: function () {...}, // 页面上拉触底事件的处理函数
	onShareAppMeassage: function () {...}, // 用户点击右上角转发
	onPageScroll: function () {...} // 监听页面滚动
	onResize: function () {...}, // 监听页面尺寸改变
	onTabItemTap: function () {...}, // 点击tab
	// 其他。在页面使用`this.*`访问。
})
```

设置page里的数据
`this.setData({key: value})`
`this.setData({'key.key2': value})`

## 事件

- 从视图层到逻辑层的通讯方式
- 将用户行为反馈到逻辑层。
- 可以绑定在组件上，供用户触发事件。
- 可以携带额外信息。

```
// demo
	// wxml
	<view id="tapTest" data-hi="WeChat" bindtap="fn">...</view>
	// js
	Page({
		fn: function (event) {
			...
			event: {
				type: 'tap', // 事件类型
				timeStamp: 895, // 事件生成时的时间戳。
				target: { // 触发事件的组件的一些属性的集合。
					id: 'tapTest',
					dataset: {
						'hi': 'WeChat' // key会由在wxml中-连接转化为驼峰命名。
					}
				},
				currentTarget: { // 当前组件的一些属性集合。
					id: 'tapTest',
					dataset: {
						hi: 'WeChat'
					}
				},
				mark: {}, // 事件标记数据。
				detail: { // 额外的信息。
					x: 53,
					y: 14
				},
				touches: [{
					identifier: 0,
					pageX: 53,
					pageY: 14,
					clientX: 53,
					clientY: 14
				}],
				changeTouches: [{
					identifier: 0,
					pageX: 53,
					pageY: 14,
					clientX: 53,
					clientY: 14
				}]
			}
		}
	})
```

1. 冒泡事件
2. 非冒泡事件

### 冒泡事件
|event|condition||
|-|-|-|
|touchstart|手指触摸动作开始||
|touchmove|手指触摸后移动||
|touchcancel|手指触摸动作被打断||
|touchend|手指触摸动作结束||
|tap|手指触摸后马上离开||
|longpress|手指触摸后，超过350ms再离开，如果了该事件指定了函数并触发了该函数则不再触发tap.||
|longtap|推荐使用longpress||
|transitionend|会在wxss transition / wx.createAnimation 动画结束后触发||
|animationstart|在一个wxss animation 动画开始时触发||
|animationend|在一个wxss animation 动画结束时触发||
|touchforcechange|在支持3D Touch的iPhone设置，重按时会触发。||

使用key:value的方式在组件上绑定事件。`bind:tap="fn"`或`bindtap="fn"`。
bind: 不阻止冒泡事件向上冒泡。
catch: 阻止冒泡事件向上冒泡。
capture-bind: 中断捕获阶段。
capture-catch: 取消冒泡阶段。

### 非冒泡事件

## 渲染

列表渲染

```
<view wx:for="{{array}}" wx:for-index="index" wx:for-item="item">...</view>
```

条件渲染

```
<view wx:if="{{condition}}">...</view>
<view wx:elif="{{condition2}}">...</view>
<view wx:else>...</view>
```










## 自定义组件

### 组件模板和样式

需要wxml/wxss/slot

子组件使用链接线的方式从父组件中得到数据。
父组件使用this.setData({key: value})修改数据。

组件默认只有一个slot.若需要使用多个slot，则需要在`*.js`文件里设置`options: {multipleSlots: true}`
使用多个slot里，需要为每个slot设置名称。`<view slot="first"></view>`

请使用class选择器。不能使用id、tag选择器。
……
样式隔离：`options: {styleIsolation: 'isolated'}`
app.wxss/page.wxss中使用tag选择器时会影响组件内的样式。

```
Component({
	options: {
		styleIsolation: 'shared', // 默认值
		// 样式隔离 'isolated'
		// page.wxss里的样式会作用于组件。反之不成立。 'apply-shared'
		// 页面中的样式与组件中的样式互相影响。 'shared'
		addGlobalClass: '' // 权重小于styleIsolation.
			// true 等价于 styleIsolation:'apply-shared'.
			// false
		externalClasses: ['className'] // 可以在组件中使用的类的名称。
	}
	})
```

### Component构造器

用来为组件指定属性、数据、方法等。

```
Component({
	behaviors: [require('path/to/behaviors')], 
		// behaviors里的方法会被混入组件中。
		// 2者同时有生命周期函数时，会先执行behavior里的再执行组件里的。
		// 组件中的同名属性、方法会覆盖behavior里的。
		// 多个组件都引用同一个behavior时，生命周期函数会只触发一次。
		// 据以上特性。我们可以使用behaviors整理出公共方法。
	opitons: {},
	properties: {

	},
	data: {},
	relations: {}, // 关联组件
	lifetimes: {
		attached: function () {},
	},
	// 这里写生命周期函数会被lifetimes覆盖。
	pageLifetimes: {},
	methods: {
		fn: funciton () {...}
	}
	})
```

### 组件间的通信与事件

- 使用json通信。
- 事件用于子组件向父组件传递（任意）数据。
- 父组件可以使用`this.selectComponent(#id)`得到子组件的实例。这样就可以得到其的数据、方法等。

父子组件间的通信方式：子组件触发父组件中定义的事件。父组件通过监听指定事件再执行相应方法。
`this.triggerEvent('eventName', eventDetail, eventOptions)`
eventName: 事件名称
eventDetail: 事件的detail对象。
eventOptions: 事件的选项
	// bubbles: boolean 是否冒泡
	// composed boolean 是否可以穿越组件的边界
	// capturePhase boolean 是否拥有捕获阶段

### 组件生命周期

```
			|
			|   开始创建
			|   components 刚把this.data定义完成。
			|   不能使用this.setData()
			|   created
			|
			|   组件实例进入页面节点时
	error   |   attached
			|
			|   组件在视图层布局完成
			|   ready
			|
			|   组件被移动另一个位置
			|   moved
			|
			|   组件被从页面节点树上移除时
			|   detached
			|
```

组件所在页面的生命周期函数

```
show 页面被展示时
hide 页面被隐藏时
resize 页面尺寸变化时 参数时（object size）
```

### 组件间关系




### 
### 
### 
### 

