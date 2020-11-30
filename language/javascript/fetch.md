# fetch

|fetch|xhr||
|-|-|-|
|函数就是原生js.|(XMLHttpRequest)是window的属性。||
|使用promise对象。|-||
||||
|都可发起http请求。|都可发起http请求。||

## xhr

```
var xhr = new XMLHttpRequest()
xhr.open('get', 'path/to/url', true)
xhr.responseType = 'json'
xhr.send()
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.stauts <= 299) {
      // success
      console.log(xhr.response)
    } else {
      // fail
    }
  }
}
```

## fetch

fetch('url', {method: 'get'}).then().catch()

url    必填
option 可选
  {
    method,
    headers,
    credentials: 'omit' / 'same-origin' / 'include',
    ... // 日后补全
  }

从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。
使用 Response.ok 是不是为 true 判断是否成功。
