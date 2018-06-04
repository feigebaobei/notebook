#json
##简介
##定义
var json = [{"key":"value"}, {"key": "value"}]

1. 数组用[]
2. 对象用{}
3. 键值对用"key": "value"

##使用
|||
|-|-|
|定义|var json = []或var json = {}|
|得到|json.[index]或json.key或json.["key"]|
|赋值，重新赋值，添加键值对|json.key = value|
|循环，遍历|for (index in json) {}|
|浅复制||
|深复制|JSON.parse(JSON.stringify(json))|
|json=>string|JSON.stringify(json)|
|string=>json|JSON.parse(str)|

##方法
JSON.stringify(json)
JSON.parse(str)
JSON.stringify(json)