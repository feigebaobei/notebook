# 网络
# 网络
# 界面

## 交互

### wx.showModal(obj)

|propotype|type|default|是否必填|description|
|-|-|-|-|-|
|title|string||false|提示的标题|
|content|string||false|提示的内容|
|showCancel|boolean||false|是否显示取消按钮|
|cancelText|string|'取消'|false|取消按钮的文本，最多4个字符。|
|cancelColor|string|'#000000'|false|取消按钮的文字颜色，必须是16进制的颜色字符串。|
|confirmText|string|'确定'|false||
|confirmColor|string|'#576B95'|false||
|success|fn||false|调用成功的回调函数|
|fail|fn||false|调用失败的回调函数|
|complete|fn||false|调用结束的回调函数|

fn: function (res) {
	<!-- res: {
		confirm: boolean // 用户点击确定按钮
		cancel: boolean // 用户点击取消按钮
	} -->
}

## 交互
# 网络

## 发起请求
## 发起请求
## 发起请求
## 上传

### WebSocket

#### wx.connectSocket(obj)

|propotype|type|default|是否必填|description|
|-|-|-|-|-|
|url|url||true|开发者服务器wss接口地址|
|header|object||false|http header. 不能设置referer|
|protocole|array<string>||false|子协议数组|
|tcpNoDelay|boolean||false|建立tcp链接时的TCP_NODELAY设置|
|success|fn||false||
|fail|fn||false||
|complete|fn||false||

## 发起请求

# 网络
# 网络
