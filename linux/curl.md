# curl

curl是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面。

## 参数

它有很多参数：

|参数|作用|默认值|demo|
|-|-|-|-|
|-A|设置`Userv-Agent`|`curl/[version]`||
|-b|设置向服务器发送的cookie|||
|-c|把从服务器上得到的cookie写入指定的文件||`$ curl -c cookies.txt https://www.google.com`|
|-d|使用post方式发送的数据体|||
|--data-urlencode|在-d的基础上自动将发送的数据进行url编码|||
|-e|设置referer|||
|-F|向服务器上传二进制文件，也可以指定MIME类型。||`$ curl -F 'file=@photo.png' https://google.com/profile`|
|-G|用来构造url的查询字符串。会发出一个get请求。|||
|-H|设置http请求的头部|||
|-i|打印出服务器回应的头部。|||
|-I|打印出服务器回应的头部。同`--head`|||
|-k|跳过检查服务器的ssl证书|||
|-L|跟随服务器重写向|||
|--limit-rate|模拟慢网速的环境。|||
|-o|保存服务器的返回内容为文件，同`wget`|||
|-O|保存服务器的返回内容为文件。|||
|-s|不输出错误和进度信息。|||
|-S|只输出错误信息。|||
|-u|设置服务器认证的用户名、密码。||`$ curl -u 'bob:1234' http://google/login`|
|-v|输出通信的整个过程，常用于调试。|||
|-x|指定http请求的代理。|||
|-X|指定http的请求方式。|||

