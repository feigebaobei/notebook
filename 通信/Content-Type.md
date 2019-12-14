# Content-Type
在http协议的请求头中使用Content-Type表示请求中的媒体类型信息。
`type/subtype[;parameter:type;]`
常见的媒体类型

- text/html
- text/plain
- text/xml
- image/gif
- image/jpeg
- image/png
- application/xhtml-xml
- application/xml
- application/atom+xml
- application/json
- application/pdf
- application/mwword // word文档
- application/octet-stream // 二进制流数据
- application/x-www-form-urlencoded // <from enctype="***">中默认的enctype.form表单会把数据编码为key=value的格式发送到服务器（表单默认的提交数据的格式）。
- multipart/form-data // 上传文件时，需要使用该格式

## 触发form-data的三种情况
1. method="post"
2. Content-Type: 'application/x-www-form-urlencoded'
3. Content-Type: 'application/form-data'


## example

一次在做项目时，前端传给后端数据后，后端总是给前端400.代码如下。
```
// 前端
    // html
    // 使用的iview的组件
    <Form class="form" :model="userInfo" :label-width="80" :rules="ruleValidate" ref="form">
      <form-item label="账号" prop="username">
        <Input v-model="userInfo.username" type="text" placeholder="请输入账号"/>
      </form-item>
      <form-item label="密码" prop="password">
        <Input v-model="userInfo.password" type="password" placeholder="请输入密码"/>
      </form-item>
      <form-item>
        <Button type="primary" @click="submit">提交</Button>
        <Button type="default" @click="resetForm">重置</Button>
      </form-item>
    </Form>
    // js
    api.login({
      username: this.userInfo.username,
      password: this.userInfo.password
    })
    // api.login(`username=${this.userInfo.username}&password=${this.userInfo.password}`)
    .then(res => {
        // ...
    }).catch(err => {
      console.log(err)
    })
// 后端
    // ...
    var bodyParser = require('body-parser')
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: false }))
    router.route('/login')
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200)
    })
    .post(cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
      console.log(req.body)
      let token = authenticate.getToken({_id: req.user._id})
      res.setHeader('Content-Type', 'application/json')
      res.cookie('token', token, {httpOnly: true})
      res.status(200).json({result: true, token: token, message: 'You are successful logged in!'})
    })
```
这些代码在开发时是可以跑的。过了几天后就报400.
问题肯定不是出现时间上。代码不会随着时间改变而出现bug.肯定是哪里不正确。

1. 先查看`body-parser`的官方文档。
得到`body-parser`不能处理`Content-Type:"multipart/form-data"`的数据。查看我传的数据样式，发现正是`form-data`。下图是截屏。
![](img)
经过学习2者的知识，得知`Content-Type`负责指明数据的媒体类型。`Content-Type:"multipart/form-data"`表示表单中有多种数据类型。一般用于在一次上传中上传图片和文本。
图片中的`Form Data`是此次表单上传的数据。
这2者没有关系。
2. 尝试能够解决问题的方法。
在`body-parser`的官网上说到：有种解析请求数据的中间件，且都会把解析结果放入`req.body`。4种方法分别是`bodyParser.json()``bodyParser.raw()``bodyParser.text()``bodyParser.urlencoded()`.
我选择我感觉有把握的`bodyParser.json()`。
```
// 前端
    // api.js
    headers: {
        'Content-Type': 'application/json'
    }
// 后端
    router.use(bodyParser.json()) // 按json的方法解析请求数据
    router.route('/login')
    .post(..., (req, res, next) => {
        ...
    })
```
重新运行代码，发现代码可以正常运行。
3. 对比2次结果
2次运行结果分别是正常运行、非正常运行。对比2次运行的发现。
前端使用`Content-Type:'application/json'`传数据给后端。后端使用对等待json的方式解析。可以正确解析。
前端使用`Content-Type:'applicaiton/x-www-form-urlencoded'`（默认是此方式）传数据给后端。后端使用对等待json的方式解析。不可以正确解析。
得到结果是解析方式出错，应当使用`bodyParser.urlencoded()`方式解析。
修改代码如下：
```
// 后端
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded())
```
再次重新启动项目，发现还是有问题。经过打印输出，`bodeParser.urlencoded()`解析请求结果为
```
{ '{"username":"first","password":"password"}': '' }
```
而期望的解析结果为
```
{ username: 'first', password: 'password' }
```
在前端浏览器中发现前端给后端的数据与`bodyParser.urlencoded()`解析后的结果一样。原来问题在于前端传给后端的数据格式不正确造成后端无法解析。
4. 前端给后端正确格式的数据。
对比正确运行与不正确运行的传数据方式。
使用json格式传数据时，使用的的传数据方式是`Request Payload`。请求体是json。
使用form格式传数据时，使用的的传数据方式是`Form Data`。请求体是`{"username":"first", "password": "password"}: `。
我去查询了form表单传的方式。得到`key=value&key2=value2&key3=value3...`.
所以修改代码如下：
```
// 前端
    // api.login({
      // username: this.userInfo.username,
      // password: this.userInfo.password
    // })
    api.login(`username=${this.userInfo.username}&password=${this.userInfo.password}`)
    .then(res => {
        // ...
    }).catch(err => {
      console.log(err)
    })
```
重新启动项目后，可以正常运行。
5. 寻找原因
iview的form组件内的button组件没有submit属性。即：不会触发html原始的submit事件。需要手动处理为form表单提交数据时的数据结构。

