# csrf cross-site request forgery 跨站请求伪造
就是以第三方网站（一般为黑客网站）以用户的身份向目标网站发送请求。目标网站认为是用户发起的请求。然后做出回应。这样目标网站就被攻击了。

## 防御
### 在请求头里定入token。
用户在发起请求后，服务端根据请求头里的token验证用户。

在地址栏里写入token、验证http referer都不安全。
        |                   |
        V                   V
黑客可以得到。         需要依赖浏览器保存http referer不可修改
                    依靠三方（浏览器）的事儿都不准确。