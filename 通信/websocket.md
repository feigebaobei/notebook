#websocket

##简介

html5提供的一个在单个tcp连接双向通信的协议。

##环境配置

1. 安装python环境（自己找教程）
1. 安装pywebsocket  
> 到git上下载[pywebsocket](https://github.com/google/pywebsocket)  
> 进入解压后的pywebsocket目录。  
> 执行命令：  
>> `$ python setup.py build`  
 `$ sudo python setup.py install`   

1. 启动服务  
> 进入mod_pywebsocket目录。`cd mod_pywebsocket`  
> `$ sudo python standalone.py -p 9997 -w ../example/`

##使用  

**html**  

`<a href="javascript:WebSocketTest()">运行 WebSocket</a>`  

**js**  

    function WebSocketTest(){
        if ("WebSocket" in window)
        {
           console.log("您的浏览器支持 WebSocket!");
           
           // 打开一个 web socket
           var ws = new WebSocket("ws://localhost:9997/echo");
            
           ws.onopen = function()
           {
              // Web Socket 已连接上，使用 send() 方法发送数据
              ws.send("发送数据");
              console.log('数据发送中...')
           };
            
           ws.onmessage = function (evt) 
           { 
              var received_msg = evt.data;
              console.log('数据已接收...')
           };
            
           ws.onclose = function()
           { 
              // 关闭 websocket
              console.log('连接已关闭...')
           };
        }
        
        else
        {
           // 浏览器不支持 WebSocket
           alert("您的浏览器不支持 WebSocket!");
        }
    }
##属性

||||||
|-|-|-|-|-|
|创建|`var socket = new WebSocket(url, [protocol])`||||
|方法|socket.send()|socket.close()|||
|事件|open `socket.onopen`|message `socket.onmessage`|error `socket.onerror`|close `socket.onclose`|

##总结

使用websocket的工作大部分在后端，前端只用设置好请求的接口。后端需要安装python环境，启动pywebsocket服务。websocket自连通后就一直双向通信，所以在用完后记得关闭。

<!-- ##[demo](#) -->

---
2018/04/10 by stone
























