## 函数
```
func exerFn (a, b, c int) (d, e, f int) {
// or
// func exerFn (a, b, c int) (int, int, int) {
  d = a + 3
  e = b + 3
  f = c + 3
  return
  // or
  // return a + 3, b + 3, c + 3 // 可读性更好
}
// 使用空白符
d, _, f := exerFn(a, b, c)
```

### 可变长度的参数

```
func main () {
  ke("a", "a", "a", "a", "a", "a")
}
func ke (a string, strs ...string) {
  fmt.Println(a)
  fmt.Println(strs)
  for _, v := range strs {
    fmt.Println(v)
  }
}
```

### defer

最后执行

### 递归函数

### 内置函数

|name|description|||
|-|-|-|-|
|close|用于管道通信|||
|len|返回长度、数量|||
|cap|返回容量|||
|new|用于值类型和用户定义的类型，如自定义结构。new(T)分配类型T的零值并返回其地址，即指向类型T的指针。|||
|make|用于内置引用类型（切片、map、管道）|||
|copy|用于复制切片|||
|append|用于连接切片|||
|panic|用于错误处理机制|||
|recover|用于错误处理机制|||
|print|-|||
|println|-|||
|printf|-|||
|complex|用于创建和操作复数|||

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