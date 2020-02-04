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

defer的函数的参数会立即求值，不会立即执行。
会在外层函数返回后执行。
推迟的函数会被压入栈中。当外层函数执行完后执行栈中函数。

### 递归函数

func fn () {
  fn()
}

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

## 变量

声明数据类型
```
x int, y int
// 缩写 abbreviation
x, y int
```
在函数内可以使用`:=` `k := 3`

### 基本类型

bool
string
int int8 int16 int32 int32 int64 uint uint8 uint16 uint32 uint 64 uintptr
byte // uint8的别名
rune // int 32的别名
      // 表示一个unicode码点
float32 float 64
complex64 complex128

### 零值

数值 0
布尔 false
字符串 ""

### 类型转换

`T(v)`
```
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
// 简写
i := 42
f := float64(i)
v := uint(f)
```

### 常量

使用`const`，不能使用`:=`

## 控制语句

### for

不使用小括号。

```
sum := 0
for i := 0; i < 5; i++ {
  sum += i
}

for sum < 1000 {
  sum += sum
}
```
### if

不使用小括号。
```
if x < 0 {
  ...
} else {
  ...
}
```

### switch

case里自带break

```
import ()
switch os := runtime.GOOS; os {
  case "darwin":
    fmt.Println("OS X.")
  case "linux":
    fmt.Println("Linux.")
  default:
    fmt.Println("%s.\n", os)
}

t := time.Now()
switch {
  case t.Hour() < 12:
    ...
  case t.Hour() < 17:
    ...
  default:
    ...
}
```

## 指针

没有指针运算。

```
var p *int
// *T 指向T类型值的指针
```
& 生成其操作数的指针
* 指向的底层值

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

### 方法

一类带特殊的接收者参数的函数
```
type Vertex struct {
  X, Y float64
}
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}
```
我看不懂教程，但是可以看懂demo
```
package main
import (
  "fmt"
  "math"
)
type Vertex struct {
  X, Y float64
}
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}
func main() {
  v := Vertex{3, 4}
  v.Scale(10)
  fmt.Println(v.Abs())
}
```

## array

长度不可改变
`[n]T` n个T类型的值组成的数组
```
var a [10]int
```

## 切片

是数组的抽象。可以改变长度。
切片是数组的引用。
零值为nil
```
[]T // 元素类型为T的切片
```
var key []type
  var slice0 []int

```
var s []int = a[1:4] // [1, 3]
r := []bool{true, false, true}
```
len(s) // 长度
cap(s) // 容量

b := make([]int, 0, 5) // len(b)=0, cap(b)=5

// 追加内容
s = append(s, 1, 2, 3)

## range

可遍历切片或映射
```
for i, v := range s {
  // i 下标
  // v 下标对应的值的副本
  ...
}
```

## map 映射

零值为nil
无序的kv集合。
// define
var map_variable map[key_data_type]value_data_type
map_variable := make(map[key_data_type]value_data_type)
  var countryCapitalMap map[string]string
  // or
  // countryCapitalMap = make(map[string]string)
  countryCapitalMap := map[string]string {"France": "Paris", "Italy": "Rome", "Japan": "Tokyo", "India": "New delhi"}
  // edit
  countryCapitalMap["France"] = "bl"
  countryCapitalMap["Japan"] = "jd"
  // get
  countryCapitalMap["Japan"]
  for country := range countryCapitalMap {
    fmt.Println(country, "capital:", countryCapitaylMap[country])
  }
// delete 删除map中对应的key
  delete(countryCapitalMap, "France")


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