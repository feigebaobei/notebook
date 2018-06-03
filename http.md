#http
##about the auther
1. 创建一个个人网站：http://odetocode.com  
1. 20多年商业软件开发经验  
1. 多项技能：C#,APS.NET MVC,HTML5,CSS3,JS......  

##introdution
http是一个万维网协议。  
学会这本书你可以得到如下技能：  
- 更好的开发web App | web services  
- debug for web App | web services  
- 包含基本、资源、信息、链接、安全  

##Chapter 1 Resources
在浏览器的地址栏中输入网址就能等到相应的信息。  

###Resource Locators
URL uniform resource locator  
eg: http://news.google.com  
![](./image/http0.png)  
![](./image/http1.png)  
###Ports, Query String, and Fragments
![](./image/http2.png)  
###URL Encoding
1. 尽可能使url可用且相互联系。  
1. 所有程序员都应该有编码错误可能出现的意识。  
1. 不使用不安全的字符。如：^, #, 空格。  
1. 若使用了不安全字符，则使用precent-encoded方法编码。即：使用%+16进制数字编码。（编码时使用US-ASCII）。
1. 几乎所有的web框架都会有一个简单的url编码api。当遇到不安全字符时，通过编码api动态创建一个url。  

###Resources and Media Type
资源类型有很多种。  
MIME: Multipurpose Internet Mail Extensions  
服务器标明访资源类型 -> 浏览器根据标明的资源类型正常处理  

###A Quick Note on File Extensions
![](./image/http3.png)  

###Content Type Negotiation
根据页面中每个资源的类型（后缀名）分别做解析。  

##Chapter 2 Messages
这章我们学习http的交换信息。学会了这些我们可以更好的开发应用。也可以在应用出错进除bug。  

###Requests and Responses
http request 和 http response 是2种不同的信息类型。  

###A Raw Request and Response
![](./image/http4.png)  

###HTTP Request Methods
|method|description|
|-|-|
|GET|retrieve a resource|
|PUT|store a resource|
|DELETE|remove a resource|
|POST|update a resource|
|HEAD|retrieve the headers for a resource|

###GET and Safety
GET是一种最常用的http方法。  
GET只能执行安全的操作。eg: 请求image并展示。  

###Common Scennario-GET
![](./image/http5.png)  

###Scenario-POST
![](./image/http6.png)  
![](./image/http7.png)  

###Forms and GET Requests
表单使用GET方法是安全的，并且还可以刷新任意次，它不会修改数据。  

###A Word on Methods and Resources
您越可以将虚拟资源视为真正的资源，您的应用程序体系结构和设计就会越好地遵循HTTP的优点。  

###HTTP Request Headers
一个完整的http请求由5部分组成  
[method] [url] [version]  
[headers]  
[body]

**常见的header选项**  
|header options|description|
|-|-|
|referer|提供url|
|user-agent|用户代理，就是浏览器的信息包括浏览器的内核、版本……|
|accept|表明浏览器更喜欢哪种语言。用于内容协商。|
|accept-language|可接受的语言|
|cookie|页面的cookie|
|if-modified-since|包括最后一次请求的时间。|

一个完整的http请求：  
![](./image/http8.png)  

###The Response
回应的结构和请求的结构类似。  
[version] [status] [reason]  
[headers]  
[body]

eg:   

    HTTP/1.1 200 OK
    Cache-Control: private
    Content-Type: text/html; charset=utf-8 Server: Microsoft-IIS/7.0 X-AspNet-Version: 2.0.50727 X-Powered-By: ASP.NET
    Date: Sat, 14 Jan 2012 04:00:08 GMT Connection: close
    Content-Length: 17151
    <html>
    <head>
    <title>.NET-related Articles, Code and Resources</title> </head>
    <body>
     ... content ...
    </body>
    </html>

###Response Status Codes
|range|category|
|-|-|
|100+|正在加载信息，请等待。|
|200+|成功|
|300+|重定向|
|400+|客户端出错|
|500+|服务端出错|

较常见的状态码  

|code|reason|description|
|-|-|-|
|200|||
|301|moved permanently||
|302|moved temporarily||
|304|not modified||
|400|bad request||
|403|forbidden|服务器禁止提取资源|
|404|not found||
|500|interval server error|服务端出错|
|503|serviece unavailable|不能得到服务器服务|

###HTTP Status Code versus Your Application
根据返回的状态码大概了解原因。  

###Response Headers
回应的头部信息包括如何处理回应信息等。  

###总结
![](./image/http9.png)  

##Chapter3 Connections
###A Whilewind Tour of Networking
客户端与服务器之间的运行。  
（我只知道大概，具体每层做什么我也不知道。）  
![](./image/http10.png)  

### Quick HTTP Request with Sockets and C#  
网络中的http请求非常简单。tcp会管理很多个连接。  

###Networking and Wireshark
(wireshark: 网络分包分析)  
http依赖tcp。tcp的性能出影响到http的性能。  

###HTTP, TCP, and the Evolution of web
真正有页面传输时在三次握手后开始。

###Parallel Connections
同时加载页面资源。  
很长时间内我们认识浏览器最多有2个平行连接。但是现在网站做了一个完善。增加了对于同一个客户端连接数量。为了避免过多的连接。服务器设置了最多连接数量。这是为了保护服务器。  

###Persistent Connections
http1.1建议客户端、服务器使用持久连接。也是默认使用的连接方法。
![](./image/http11.png)  
![](./image/http12.png)  
不允许持久连接的服务器就在回应头部中添加Connection字段。eg:  

    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Server: Microsoft-IIS/7.0
    X-AspNet-Version: 2.0.50727
    X-Powered-By: ASP.NET
    Connection: close
    Content-Length: 17149

*tip:* 这个头部信息告诉浏览器尽快关闭连接。浏览器不允许在同一连接上发送第二个请求。  

###Pipelined Connections
![](./image/http13.png)  

##Chapter 4 Web Architecture
![](./image/http14.png)  

###Resources Redux
用户不关心背景资源，只关心能与之互动的资源。更重要的是能说出的资源。  
所有资源都在应用周围，可以给一个资源一个url。  
![](./image/http15.png)  

###The Visible Protocol-HTTP
url就像一个指针。  
![](./image/http16.png)  

###Adding Value
web服务器可以使用http信息中的信息。  
http信息从一个内存空间到另一个内存空间会经过几种软件、硬件，它们很可能修改http信息。  
服务器可以记录操作，也可能是信息本身直接修改。  
http有自解释能力。所以这些消息允许其他基本架构处理、转换消息。当消息在网络中移动时也会发出这种类型的处理。  

###Proxies
![](./image/http17.png)  
![](./image/http18.png)  
![](./image/http19.png)  
http可把一些压缩工作放到proxy上。这样可减小服务器的工作压力。
![](./image/http20.png)  
在http1.1回应的状态码是200时对于GET请求默认缓存。  
应用可使用Cache-Control字段控制是否缓存。  
![](./image/http21.png)  
对于公共资源可指示每个设置都可缓存。  
对于特定的用户可以使用private cache。  
Expires 明确缓存的最终时间。  
Last-Modified 使用这个字段判断是否与缓存一致。  
If-Modified-Since 只加载指定时间后修改的文件。

##Chapter 5 State and Security
谈论http的安全方面。包括用户验证，http是如何进行验证工作的。为什么需要https。  

###The Stateless (Yet Stateful) Web
![](./image/http22.png)  
为了使http有状态。可以：
![](./image/http23.png)  

###Identification and Cookies
![](./image/http24.png)  

###Setting Cookies
![](./image/http25.png)  
**GUID(Globally Unique Identifier)全局唯一标识符**  
使用GUID可以避免猜出其它用户的Set-Cookie。  
大部分的网络应用框架都会篡改cookie和自动查阅session状态。  

###HttpOnly Cookie
XSS(cross-site scripting attack)跨站点攻击。  
在Set-Cookie中添加HttpOnly标志。表示不可用脚本读、写cookie。cookie只能在http里旅行。  

###Types of Cookies
在Set-Cookie中设置expires字段。表示cookie在这个时间段内有效。超出了时间客户端会抛弃cookie。  

###Cookie paths and Domains
不要使用第三方cookie。

###Authentication
可以使用username/password,email,PIN,...去验证。http可以支持各种验证协议。最常用的有5种：basic,digest,windows,forms,openid.  

###Basic Authentication
![](./image/http26.png)  
eg:  

    GET http://localhost/html5/ HTTP/1.1
    Authorization: Basic bm86aXdvdWxkbnRkb3RoYXQh

###Digest Authentication
基本与basic authentication一样，只是在服务器发给客户端时在头部信息中多了WWW-Authenticate。  
eg:  

    HTTP/1.0 401 Unauthorized
    WWW-Authenticate: Digest realm="localhost"
                             qop="auth, auth-int",
                             nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                             opaque="5ccc069c403ebaf9f0171e9517f40e41"

###Windows Authentication
windows authentication 不是标准的验证协议。但是流行到微软的产品中。他的验证过程和前2种非常像，只是在头信息中添加了WWW-Authenticate字段。  
eg:   

    HTTP/1.1 401 Unauthorized
    WWW-Authenticate: Negotiate

它可以让客户端选择一种（HTML, Kerboeros）  

###Forms-based Authentication
这是最常用的一种方法。
![](./image/http27.png)  
eg:   

    HTTP/1.1 302 Found
    Location: /login.aspx?ReturnUrl=/Admin.aspx

服务器会返回一个安全的资源。并且设置一个cookie。
eg:  
    
    HTTP/1.1 302 Found
    Location: /admin.aspx
    Set-Cookie: .ASPXAUTH=9694BAB... path=/; HttpOnly

form-based authentication发送的信息是纯文本的。（因此它也不是不安全的http请求。）因为服务端可以完全控制登录体验、证书验证，所以还在使用。  

###OpenID
应用也不能管理每一个用户账号，密码。用openid可以分散验证。现在由于工具不足够发达限制了openid的广泛使用。  

###Secure HTTP
![](./image/http28.png)  
SSL(secure sockets layser) TLS(transport layer security)  
![](./image/http29.png)  
![](./image/http30.png)  































