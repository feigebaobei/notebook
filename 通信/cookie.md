#cookie
1. cookie："小饼干，小甜品"
2. 参与http通信。因为在http中可以看到cookie，所以易受到攻击。
3. 面向路径。只作用于当前路径（页面）。

**运行机制**  
![](./image/cookie0.png)  

**使用**  
![](./image/cookie1.png)  

##总结
**设置cookie的值**  

    function setCookie(key, value, duration) {
        // duration 单位为ms
        var d = new Date();
        document.cookie = key + "=" + value + "; " + d.getTime() + duration
    } 

**获取cookie的值**  

    function getCookie(key) {
        var cookieArr = document.cookie.split(';');
        for (var i = 0; i < cookieArr.length; i++) {
            var cookie = cookieArr[i].trim();
            if (cookie.indexOf(key)===0) {
                return cookie.substring(key.length, key.cookie.length);
            }
        }
    } 

## options

|option|type|description|default|demo|
|-|-|-|-|-|
|name|string|cookie的名称|||
|value|string|cookie的值。|||
|domain|string|域。cookie的有效作用范围。在其域及子域下可使用。|不设置|'.abc.com'|
|path|string|作用路径。|||
|expires|GMT时间格式|||2020-08-22T12:44:22.443Z|
|max-age|number|最长有效时间（s）|不设置||
|httpOnly|boolean|是否只有服务器可以操作该cookie|不设置||
|secure|boolean|只有使用ssl链接时才发送到服务器|不设置||
|sameSite|boolean / string|是否使用相同站点执行。有效控制跨站点请求伪造。|true:必须使用相同站点才发送cookie，只有当前url与请求目标一致才会发送该cookie。 false:不设置。 'lax':发送cookie(a,link,get),不发送cookie(post,iframe,ajax,image)||
|priority|string|优先级。Low/Medium/High|当cookie数量超出时，低优先级的cookie会被优先消除。||

---
2020/10/30 by stone