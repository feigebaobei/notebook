// 函数声明
func function_name ([parameter list]) [return_types] {
  // body code
}

go 使用值传递

值传递 把实际参数复制一份传递给函数。 不会影响实际参数。
引用传递 把实际参数的地址传递给函数。 会影响到实际参数。

指针变量：指向一个值的内存地址。
空指针： nil ptr == nil

## 结构体

```
type struct_variable_type struct { // struct 是数据类型
  member definiation
  member definiation
  ...
  member definiation
}

// example
type Books struct {
  title string
  author string
  subject string
  book_id int
}
Books {
  "go",
  "www.baidu.com",
  "lang",
  649507
}
Books {
  title: "go",
  author: "www.baidu.com",
  subject: "lang",
  book_id: 649507
}

// visite
Books.title
```

```
// define
type Books struct {
  title string
  id int
}
// use
var book0 Books
book0.title = "go"
book0.id = 12345
// book0.title // "go"
// 指向结构体的指针
var key *strute_type
key := &book0
key.title // "go"
```

## array

长度不可改变

## 切片

是数组的抽象。可以改变长度。
var key [] type
  var slice0 [] int

## range

## map

无序的kv集合。
// define
var map_variable map[key_data_type]value_data_type
map_variable := make(map[key_data_type]value_data_type)
  var countryCapitalMap map[string]string
  // or 
  // countryCapitalMap = make(map[string]string)
  countryCapitalMap := map[string]string {"France": "Paris", "Italy": "Rome", "Japan": "Tokyo", "India": "New delhi"}
  countryCapitalMap["France"] = "bl"
  countryCapitalMap["Japan"] = "jd"
  for country := range countryCapitalMap {
    fmt.Println(country, "capital:", countryCapitaylMap[country])
  }
// delete 删除map中对应的key
  delete(countryCapitalMap, "France")

## 递归函数

func fn () {
  fn()
}

## 类型转换

type_name(expression)
var sum int = 17
var count int = 5
var mean float32
mean = float32(sum) / float32(count) // 3.400000

## 接口 interface

type interface_name interface {
  method_name0[return_type]
  method_name1[return_type]
  method_name2[return_type]
  ...
  method_namen[return_type]
}
func (struct_name)

## 并发

使用go开启一个新的运行期线程。
`go say("str")`

## 通道 channel

## 开发工具

GoLand
LiteIDE
Eclicpse