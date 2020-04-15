## error
本质是一个接口
有三种写法
```
// 使用errors包
import (
  "errors"
  "fmt"
)
error := errors.New("hello,error")
if error != nil {
  fmt.Print(err)
}
errors包只是一个Error()填充的简易封装。
func New(str string) error
// 使用fmt.Errorf()
err := fmt.Errorf('hello error')
if err != nil {
  fmt.Print(err)
}
// 自定义
type MyError struct {
  err error
}
func (e MyError) Error() string {
  return e.err.Error()
}
func main () {
  err := MyError{
    errors.New("hello error")
  }
  fmt.Println(err.Error())
}
```



## glide
它是`Go Elide`的缩写。
它是go modules的依赖管理，但是现在几乎不维护了。


## 环境配置

执行`go env`出现如下内容：
```
GO111MODULE=""
GOARCH="amd64"
GOBIN=""
GOCACHE="/Users/feige/Library/Caches/go-build"
GOENV="/Users/feige/Library/Application Support/go/env"
GOEXE=""
GOFLAGS=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GONOPROXY=""
GONOSUMDB=""
GOOS="darwin"
GOPATH="/Users/feige/go"
GOPRIVATE=""
GOPROXY="https://proxy.golang.org,direct"
GOROOT="/usr/local/Cellar/go/1.13.7/libexec"
GOSUMDB="sum.golang.org"
GOTMPDIR=""
GOTOOLDIR="/usr/local/Cellar/go/1.13.7/libexec/pkg/tool/darwin_amd64"
GCCGO="gccgo"
AR="ar"
CC="clang"
CXX="clang++"
CGO_ENABLED="1" // 是否可以使用CGO工具 1 true 0 false
GOMOD=""
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -m64 -pthread -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=/var/folders/82/z5mb6gcs1ds92t8dkgf88q8w0000gn/T/go-build049602796=/tmp/go-build -gno-record-gcc-switches -fno-common"
```

## 一些镜向库

glide mirror set https://golang.org/x/crypto https://github.com/golang/crypto --vcs git
glide mirror set https://golang.org/x/net https://github.com/golang/net --vcs git
glide mirror set https://golang.org/x/sys https://github.com/golang/sys --vcs git
glide mirror set https://golang.org/x/text https://github.com/golang/text --vcs git
glide mirror set https://google.golang.org/grpc https://github.com/grpc/grpc-go --vcs git
glide mirror set https://google.golang.org/genproto https://github.com/google/go-genproto --vcs git


## 显然一个是静态链接库(.a)，一个是动态链接库(.so)

联系和区别

相同点：链接库本身不是最终的执行程序文件，而是为其他执行文件提供服务的程序。如果把最终的执行程序文件比作一个汽车生产厂家，那么链接库就可以理解为零部件提供商 。
不同点：静态链接库在链接阶段就直接打包到最终的执行程序文件中，而动态链接库则是在程序运行时去链接库里面找需要的东西。
优缺点：显然，静态链接的库文件会导致最终目标程序文件体积膨胀，优点是编译之后就不受原来静态库文件的影响，即使原来的静态库被删除了都没关系；
而动态链接库可以保证文件体积较小，但动态链接库的问题是如果库文件不存在（删除、移动或重命名等）了，则由于目标程序文件找不到而出现运行时错误。

## go new(type)

返回指定类型的指针值。`*type`
```
new(int) // *int
```
## Printf() & Println()

|Printf|Println||
|-|-|-|
|格式化的字符串|打印字符串、变量||
|输出字符串类型的变量|||
|不能输出整型变量、整型数据。|||

## 格式符

|||||
|-|-|-|-|
|%d|按整型数据的实际长度输出数据|||
|%c|输出一个字符|||
|%s|输出一个字符串|||
|%x|以16进制数形式输出整数|||
|%+v|输出结构体数据|||
|%d||||
|%d||||
|%d||||

以0x开始的数据表示16进制。


## struct

```
type Circle struct {
  x int
  y int
  Radius int
  // 首字母大写为公开变量。 public
  // 首字母小写为内部变量。 private
}
```

### create struct

```
// first
var c Circle = Circle {
  x: 100,
  y: 50,
  Radius: 20, // 不能不逗号。
}
var 变量名 变量类型 = 变量类型 {
  结构成员
  // 可以不写全结构成员。没有设值的默认为零值。
}
// second
var c Circle = C
// three
var c *Circle = &Circle {100, 20, 50}
var c *Circle = new(Circle) // 得到该类型的地址
```

### 对比三种零值

```
var c0 Circle = Circle{}
var c1 Circle
var c2 *Circle = new(Circle)
```

### 内存大小

golang的unsafe包里的Sizeof()
```
var c Circle = Circle {100, 20, 50}
unsafe.Sizeof(c)
```

### copy

结构体之间的相互赋值本质上是浅拷贝。
结构体指针之间的相互赋值本质上是浅拷贝。只拷贝指针地址。内容共享。

### 结构体的方法

```
package main
import (
  "fmt"
  "math"
)
type Circle struct {
  x int
  y int
  Radius int
}
// 面积
func (c Circle) Area() float64 {
  return math.Pi * float64(c.Radius) * float64(c.Radius)
}
// 周长
func (c Circle) Circumference() float64 {
  return 2 * math.Pi * float64(c.Radius)
}
// 扩大圆形
// 方法的参数是值传递。
// 修改结构需要使用结构的指针。
// 这样会比较慢。
func (c *Circle) expend() {
  c.Radius *= 2
}
func main() {
  var c = Circle {Radius: 50}
  fmt.Println(c.Area(), c.Circumference())
  var pc = &c
  fmt.Println(pc.Area(), pc.Circumference())
}
```

## interface

```
type 接口名称 interface {
  method0(参数列表) 返回值列表
  method1(参数列表) 返回值列表
  method2(参数列表) 返回值列表
  ...
  method3(参数列表) 返回值列表
}
接口通常以`er`作为名称后缀。
```
可以嵌套。
```
type stringer interface{
  string() string
}
type tester interface{
  stringer
  test()
}
```

## package.json

||||
|-|-|-|
|main|该包的入口文件。当引用该包时使用。||













// coursera

go有自动处理垃圾机制。
go是介于汇编语言、解释语言的一种语言。
go是面向对象的语言

- 可以封装代码。
把数据和数据相关的方法放在一起。
可以自定义类型。

## no.1 week

### objects

- 没有class。
使用struct代替连接方法。
class的简化版（1.没有继承。2.没有构造者。3.没有一般）

### concurrency

更快运行。
同时运行。

#### parallelism

平行程序是比较困难的。

- 什么时候开始、停止。
若一个任务需要其它任务输出的数据，该怎么办？
多个任务在内存中的冲突。

#### concurrent programming

- 并发可以同时管理多个任务。(保持多任务同时存活。每次只执行一个任务，不停地切换任务。让用户感觉是同时执行的。)
大型系统的关键需求。
并发程序可以做平行程序的功能。（1.管理多任务。2.多任务间交流。3.同时执行多个任务。）

### installing go

到官网的[https://golang.google.cn/dl/](下载页面)下载需要的版本。
使用向导工具时注意安装的目录。

### workspace & packages

- 目录的分层。
公共代码可以更好分享。

workspaces

- 三个目录
  - src 源文件
  - pkg 包（像是仓库）
  - bin 可以执行的内容
- 同一个工作空间可以有多个项目

推荐目录分层，但不强制。
使用GOPATH定义工作空间变量。
一般在安装时定义GOPATH。如：`C:\Users\yourname\go`
go工具假设代码在GOPATH里。

package

- 把相关代码打包在一起。
可以引用其它包。
方便重复使用。
第一行是包的名字。`package annpkg`
使用包时需要在顶部声明。
必须有一个库叫做main.（将从这里开始执行）
构建main包，生成一个可执行文件。
main包需要一个main()方法。
从main()开始执行。

### go tool

当下载go里就已经得到go tool了。

import

- import 用来引用其它包。
go标准库包括很多包。如：`fmt`
在构建时。go tool会在GOROOT / GOPATH里寻找指定的包。

go tool

- 一个管理go源码的工具。
- 有一些命令.
  - go build // 编译程序
    - 参数一个包的列表或.go的列表。
    - 会生成一个包名称相同的.go文件。
    - .exe文件表示可以在windows上运行的文件。
  - go doc 为一个包生成文档。
  - go fmt 格式化源码。
  - go get 下载并安装包。`go get packageName`
  - go list 列出所有安装的包。
  - go run 编译并运行.go文件
  - go test 运行测试`_test.go`
  - go version // go version go1.13.7 darwin/amd64

### variables

nameing

- 需要参考程序结构。
必须以字母开始。
包括数字、字母、下划线
大小写敏感。
不要使用要保留字、关键字。
保存在内存中。
必须使用name和type.
所有的变量必须被声明。
基本形式`var x int`
可以同时命名很多相同类型的变量`var x, y, z int`

变量类型

- 定义变量后可以被操作。
- integer
  - 只能是整型数据。
  - 可以执行整型数据的操作
- floating Point
- string

### variable initialization

在声明时初始化
```
var x int = 100
var x = 100
```
这2种写法都可以。第二种会根据右边数据的类型判断左边的变量的类型。
在声明后初始化
```
var x int
x = 100
```
没有被初始化的变量是零值。
```
var x int // x = 0
var x string // x = ""
```
简写
```
x := 100
变量的类型会根据右边的表达式做出判断。
只能在function内部使用简写。
```

## no.2 week

### pointers

- 是内存中数据的地址的指针。可以得到每一个本内存中的变量。指针是内存中的地址。
- `&`操作符，返回变量、方法的地址。
- `*`操作符，返回该地址的数据。

#### new

- 另外一种创建变量的方法。
- new()方法创建并返回指向这个变量的指针。
- 被初始化为零值。
> ```
ptr := new(int)
*ptr = 3
```

### variable scope

- 可以被访问的地方。

#### blocks

- 块是分层的。
- 块级作用域。
- 隐式块的层次结构。
- 全局块
- 包块
- 文件块
- if/for/switch

#### lexical scoping

- go是语法范围使用块。

### cdallocating memory

- 当变量不再需要时被回收。
- 否则会用完内存。
- 多次执行同一个函数里，会多次创建这个函数需要的内存。

#### stack vs heep (栈 vs 堆)

- 堆是稳固的。
|stack|heap||
|-|-|-|
|专注于方法|堆是稳定的。||
|保存本地变量|||
|在方法执行完后回收内存|||


#### 手动回收内存

- 当不使用堆中的变量时必须手动回收内存。
- 在大多数的编译语言里使用这种方法。`x = malloc(32);free(x);`
- 这是错误的倾向，但是很快。

### garbege collection

- 在解释型语言中。由解释器完成。（java virtual machine/python interpreter）
- 对于编程者更简单。
- slow
- go是编译语言，可以自动回收内存。
- implementation is fast
- compiler determine stack vs heap
- go在编译时判断需要放在heap/stack.
- 垃圾回收会花费一些时间。

### comments, printing, integers

comments
```
// line comments
/* block comments */
```

printing

```
import "fmt"
fmt.Printf() (fmt.Println)
```
格式化输出
|%s|转化为字符输出||

integer
```
var x int
int8 int16 int32 int64
uint8 uint16 uint32 uint64
```
int类型可能是32也可能是64位。受到硬件、编译器的影响。
|arithmetic|`+ - * / % << >>`|
|comparison|`== != > < >= <=`|
|boolean|`&& ||`|

类型转换`T()`

### float

||||
|-|-|-|
|float32|6位精度||
|float64|15位精度||
|使用小数、科学计数法表示|||
|complex number使用2个float表示。一个表示实部，一个表示虚部。`var z complex128 = complex(2,3)`|||

### string

ASCII & Unicode

- unicode是32位字节编码。
- utf-8是可变长度
  - 8位utf的别名是ASCII

- 有顺序的字节
- 只读
- 经常用来输出
- 使用双引号表示
- 每一位是一个字母

### stirng package

一种是 uint8 类型，或者叫 byte 型，代表了 ASCII 码的一个字符。
另一种是 rune 类型，代表一个 UTF-8 字符，当需要处理中文、日文或者其他复合字符时，则需要用到 rune 类型。rune 类型等价于 int32 类型。


unicode package

- 被分配到很多不同的目录里。
- 提供了方法集去测试字符的类目。`IsDigit(r rune)`
```
IsDigit(r rune)
IsSpace(r rune)
IsLetter(r rune)
IsLower(r rune)
IsPunct(r rune)
```
- 一些方法是转化类型的
```
ToUpper(r rune)
ToLower(r rune)
```
- 操作utf-8编码的方法。
- 搜索字符串。

strings package

```
Compara(a,b)
  0  a==b
  -1 a<b
  +1 a>b
Conatain(s, substr) 是否包含子字符串
HasPrefix(s, prefix) 是否使用prefix开头。
Index(s, substr) 返回substr第一次出现的index
```

string manipulation

- string are immutable, but modified strings are returned. // 返回一个新的string.
- Replace(s, old, new, n) 把第n个位置的old替换为new。
- ToLower(s)
- ToUpper(s)
- TrimSpace(s) // 删除后面空格。

strconv packages

- 从基本类型轮换为string、从string轮换为基本类型。
- Atoi(s) // string
- Itoa(i) //
- FormatFloat (f, fmt, prec, bitSize)
- ParseFloat(s, bitSize) // string => float point number

### constants

- 在编译时总是保存不变。
- 类型是其值的类型。
```
const x = 1.2
const (
  y = 4
  x = "hi"
  )
```

Iota

- 生成一个常量。
iota是golang语言的常量计数器,只能在常量的表达式中使用。
iota在const关键字出现时将被重置为0(const内部的第一行之前)，const中每新增一行常量声明将使iota计数一次(iota可理解为const语句块中的行索引)。
使用iota能简化定义，在定义枚举时很有用。
自增长常量经常包含一个自定义枚举类型，允许你依靠编译器完成自增设置。
```
//如果两个const的赋值语句的表达式是一样的，那么可以省略后一个赋值表达式。
type AudioOutput int
const (
    OutMute AudioOutput = iota // 0
    OutMono                    // 1
    OutStereo                  // 2
    _
    _
    OutSurround                // 5
)
```

### control flow

for
```
for i:=0; i<10; i++ {...}

i = 0
for i<10 {
  ...
  i++
}

for {...}
```

if
```
if a == 100 {
  ...
} else {...}

if b := 9; m < 0 {...}
```

switch
```
switch x {
case 1:
  fmt.Printf("string")
  // 自动break
case 2:
  fmt.Printf("string2")
  // 自动break
default:
  fmt.Printf("stringd")
  // 自动break
}

switch {
case x > 1:
  fmt.Printf("String")
case x < -1:
  fmt.Printf("String")
default:
  fmt.Printf("String")
}
```

break // 退出循环
continue // 执行下一次循环
```
i := 0
for i < 10 {
  i++
  if i == 5 {break}
  fmt.Printf("str")
}

i := 0
for i < 10 {
  i++
  if i == 5 {continue}
  fmt.Printf("str")
}
```

### scan

go有三种方法得到用户输入。
- fmt.Scan // 使用空白符(空格、换行符)分隔输入的数据
- fmt.Scanf // 使用指定格式输入数据
- fmt.Scanln // 使用空格分隔。使用换行结束。

## no.3 week

### array

- 一个固定长度的一系列指定类型的元素。
- 使用下标的方法得到。
- 下标从0开始
- 元素被初始化为零值。
- range返回2个值(index, value
- 可以使用range迭代数组。
- 多维数组 var varName [size][size]...[size] valueType


```
var x [5]int
x[0]=2
fmt.Printf(x[1])

var x [5]int = [5]{1, 2, 3, 4, 5}

x := ...

x := 3[int]{1,2,3}
for i, v := range x { // range: 需要迭代的数组的名称. i index v value
  fmt.Printf("ind %d, val %d", i, v)
}

// 5种初始化方式
var numArr01 [3]int = [3]int{1, 2, 3}
fmt.Println("numArr01=", numArr01)
var numArr02 = [3]int{4, 5, 6}
fmt.Println("numArr02=", numArr02)
var numArr03 = [...]int{7, 8, 9} // 根据{}里的元素数量设置数组大小
fmt.Println("numArr03=", numArr03)
var numArr04 = [...]int{1: 44, 0: 55, 2: 66} // 指定下标的数据
fmt.Println("numArr04=", numArr04)
strArr05 := [...]string{1: "tome", 0: "jack", 2: "steven"}
fmt.Println("strArr05=", strArr05)
```

### slices

- 基于数组
- 可以变大小，直到数组的最大。
- Pointer指明从哪开始。
- Length slice的大小。
- Capacity slice的容量。从slice中第一个元素在array的位置开始数，到array的最后一个元素有多少个元素。
- 改变slice里的元素会影响到array里的元素。

```
arr := [...]string{"a", "b", "c", "d", "e", "f", "g"}
s1 := arr[1:3] // 从1开始到3结束 [1,3)
s2 := arr[2:5]
```

```
a1 := [3]string("a", "b", "c")
sli1 := a1[0:1]
fmt.Printf(len(sli1), cap(sli1))
```
len() // length of slice
cap() // max element of slice

#### make

```
make()
sli = make([]int, 10) // 返回一个长度为10的slice
sli = make([]int, 10, 15) // 返回一个长度为10的slice,预留15个元素的存储空间
```

```
s = append(s, element)
// 这是扩容slice的方法。
// 每次扩容后slice的容量加增加一倍。
```

### hash table

### map

- hash表的实现。
- 使用`make()`创建。
```
var idMap map[string]int
//          key type   value type
idMap = make(map[string]int)

idMap := map[string]int{"joe": 123}
// get idMap["joe"]
// 若不存在则返回零值
// set idMap["jane"] = 456
// delete delete(idMap, "joe")

id, p := idMap["jane"]
// id value
// p  是否存在于该map里
len(map) // return numbers value

for k, v := range idMap {
  fmt.Println(k, v)
}
```

### struct

- 一种集合数据类型。
- 整合任意类型的对象。

```
type struct Person {
  name string
  addr string
  phone string
}
var p1 Person
p1.name = "joe" // set
x := p1.name // get

p2 := new(Person) // init
p3 := Person(name: "joe", addr: "a st.", phone: "123")
```

### protocol & formats

为了适应各种各样的系统。go有专用的包处理这个问题。

- requests for comments(rfc)
- 定义网络协议和形式。
- 协议的例子
  - html
  - uri
  - http

protocol packages

- 支持rfc的包
- encode/decode的协议格式的方法。
- net/http(http://www.baidu.com)
- net tcp/ip (net.Dial("tcp", "uci.edu:80"))

### json

json marshalling

- 从一个对象生成json

```
type Person struct {
  name string
  addr string
  phone string
}
p1 := Person{name: "joe", addr: "a st", phone: "123"}
barr, err := json.Marshal(p1) // struct => json
// barr []byte

var p2 Person
err := json.Unmarshal(barr, &p2) // []byte => json
// barr 必须是[]byte
// &p go结构的地址
json.Unmarshalling
```

### file

- 线性提取，不是随机提取。
  - 机器延迟。

basic operations

- open - get handle for access.
- read - read bytes into []byte
- write - write []byte into file
- close - release handle
- seek - move read/write head

ioutil file read

- io/ioutil package has basic functions
```
dat, e := ioutil.ReadFile("test.txt")
  // dat []byte file
  // byte 就是 uint8
```
- explicit open/close are not needed
- large file cause a problem

ioutil file write

```
dat = "hello world"
err := ioutil.WriteFile("outfile.txt", dat, 0777)
//                        文件名       string / []byte   权限
```
- 需要写入[]byte文件的内容
- 创建文件
- unix样式的权限码。

### os pakages file access

os pakage

- 有比ioutil更精确的方法操作文件。
- os.Open()
- os.Close()
- os.Read() // return []byte
  可以控制读取的总量。
- os.Write()

```
f, err := os.Open("dt.txt")
barr := make([]byte, 10)
nb, err := f.Read(barr)
f.Close()
```
```
// os file create/write
f, err := os.Create("outfile.txt")
barr := []byte{1,2,3}
nb, err := f.Write(barr) // []byte
nb, err := f.WriteString("hi") // string
```
### onitle


有很多go的包需要学习。
# function, methods and interfaces in go

## no.1 week

### why use functions?

- 为了复用。
- 很多人都可以使用。
- 抽象。默认是隐藏的。
- 提高可读性。
- multiple return value
- 参数是在源数据上复制一份来的。(优点：变量只会在方法时改变。缺点：复制数据需要时间。)
```
func foo2(x int) (int, int) {
  return x, x+1
}
a, b := foo2(1)

func foo(y *int) { // y 是int类型的指针
  *y = *y + 1
}
func main() {
  x := 2
  foo(&x) // &x 是x的指针。
  fmt.Printf(x)
}
```

### passing arrays and slices

- 当给方法传参为array时会把该数组复制后给fn.若数组太大则会出现问题。
-
```
func foo(x [3]int) int {
  return x[0]
}
// pointer
func foo(x *[3]int) {
  (*x)[0] = (*x)[0] + 1
}
a:=[3]int{1,2,3}
foo(&a)
//
a:=[]int{1,2,3} // a 是 slice
func foo(x []]int) {
  x[0] = x[0]+1
}
func main() {
  a := []int{1,2,3}
  foo(a)
}
```

### well-written function

- 可理解性
- 方法可读
- 数据可跟踪

除bug的原理

- 把代码碰撞放在fn里。
- 方法不正确 、 方法内的数据不正确。

## no.2 week

### first-class values

- 把变量定义为func类型
- 可以对待fn像别的数据类型一样。（1.使用定义变量为fn。2.可以被改变。3.可以传入参数，反思结果。4.保存数据结构。）
```
var funcVar func(int) int // funcVar变量是func类型，该变量指向的方法返回int类型的数据。
func incFn(x int) int {
  return x + 1
}
func main () {
  funcVar = incFn
  fmt.Println(funcVar(1))
}
```
- 方法可以接收方法作为参数。
```
func applyIt(afunct func (int) int, val int) {
  return afunct(val)
}
```
- anonymous functions
```
v := applyIt(func (x int) int {
  return x + 1
}, 2)
```

### returning functions

- 方法可以返回方法
- 可以控制参数
- 使用方法定义一个方法
```
func makeDistOrigin(ox, oy float64) func (float64, float64) float64 {
  return func (x, y float64) float64 {
    return math.Sqrt(math.Pow(x - ox, 2) + math.Pow(y - oy, 2))
  }
}
func fa() func (string) int {...}
```
- 特殊用途的方法(return fn)
- 方法的环境是被定义时的环境。

### variadic & deferred

- 可以改变参数数量的方法
```
func getMax(vals ...int) int {
  maxv := -1
  for _, v := range vals {
    if v > maxv {
      maxv = v
    }
  }
  return maxv
}
```
- 使用该方法
```
getMax(1,2,3,4,5)
vsli := []int{1,2,3,4,5}
getMax(svli...)
```
- 在执行完成方法后立即执行defer。常用来消除活动。
```
func main () {
  i := 1
  defer fmt.Println(i+1)
  i++
  fmt.Println("hi")
}
// hi 2
```

## no.3 week

### classes & encapsulation

class

- 集合了数据字段和方法。这样可以更好用于定义。
- 类是一个模板。
- 包括数据的字段，不包括数据。
- golang没有class
- 大多数oolang都有class。
- 把方法、data定义在class块里。
```
class Point:
  def __int__(self, xval, yval):
    self.x = xval
    self.y = yval
```
- 方法具有接受方的类型。
- 使用点符号执行方法。
```
type MyInt int
func (mi MyInt) Double () int { // 属于MyInt类型（或结构）的方法Double，该方法返回int型数据。这是为类型（或结构）定义方法的形式。
  return int(mi*2)

}
func main () {
  // v对象是一个有含蓄参数的方法。
  v := MyInt(3) // 得到MyInt类型
  fmt.Println(v.Double()) // 使用MyInt类型的Double()方法。
}
```

object

- instance of class
- contains real data

encapsulation

- 保存一些数据。（隐藏一些数据不被别的程序员发现。）
- 只能使用特定的方法才能得到数据。
- 不要相信程序不会改变数据。


### struct

- 编成结构里的数据字段。
```
type Point struct {
  x float64
  y float64
}
```
- 结构允许写入任意数据和方法。
```
func (p Point) DistToOrig () {
  t := math.Pow(p.x, 2) + math.Pow(p.y, 2)
  return math.Sqrt(t)
}
func main () {
  p1 := Point{3, 4}
  fmt.Println(p1.DistToOrig())
}
```
- golang只能在包中隐藏data/fn
- 只能输出大写开头的variable/function

方法的限制

- 可以接受隐藏参数。
- 不能修改内部数据。

### pointer receivers

- 接收者可以是指针类型
- 通过引用执行，指针是传入的方法。
```
func (p *Point) OffsetX(v float64)
{
  // go会自动去掉引用
  // 直接使用p.x
  p.x = p.x + v
}
func main () {
  p := Point(3,4)
  p.Offsetx(5) // 不需要写明引用。
}
```
- 所有的方法都使用指针为接收者。或者所有的方法都使用非指针为接收者。
- 混合使用指针、非指针接收者会混淆指针接收者。
- 指针接收者允许修改数据。

## no.4 week

### polymorphism

- 可以让一个对象有不同的形式。(我理解的对象就是结构的实例。)
```
// Area()
// rectangle area = base * height
// triangle  area = base * height / 2
```
- 在高级抽象时是相同的。
- 在低级抽象时是不相同的。

inheritance

- 子类从父类中继承父类的method/data
- go没有继承。
```
// Speader
```
- 子类会重写从父类继承来的方法。

### interface

- golang里没有继承。
- 使用interface，也可以完成相同的工作。
- 把方法集合在一起。
- 只定义了有某个方法，但是没有实现。（我理解的实现就是：把方法写完整。包括参数、返回值类型、方法体。）
- 可以保存任何实现这些方法的值。
- 设置方法的标记。（1.需要name/pararmeters return result. 2.实现不是定义。）
- 实现了接口中的全部的方法才是实现了该接口。
- 与表示类型的概念相似。
```
type Shape2D interface {
  Area() float64
  Perimeter() float64
}
type Triangle {...}
func (t Triangle) Area() float64 {...}
func (t Triangle) Perimeter() float64 {...}
```

### interface vs concrete type

- 2者都是基础的。

concrete types
指定额外的方法和数据的表现。
在内部实现方法。

interface types
- 指定一起方法签名。
- 实现是抽象的。
- 对待它就像一般的值一样。
- 有2个成员。1.动态的类型。2.动态的值。
```
type Speaker interface{Speak()}
type Dog struct{
  name string
}
func (d Dog) Speak() {
  fmt.Println(d.name)
}
func main() {
  var s1 string
  var d1 = Dog{"Brian"}
  s1 = d1 // s1被赋值了。此时s1的类型是Dog.
  // 凡事interface object都有2个成员。1.动态类型(Dog)。2.动态值(d1)。
  s1.Speak()
}
```
- interface 可以有nil动态值.
```
var s1 Speaker
var d1 *Dog // d1仍没有具体的值。
s1 = d1 // s1有具体的类型，没有具体的值。
// s1仍可以执行Speak()，但是执行时不知道具体的值。
```
- 执行开始时只需要类型（可以是动态类型），不需要值。所以在方法的方法内部需要验证动态的值。
```
func (d *Dog) Speak () {
  if d != nil {
    fmt.Println("str")
  } else {
    fmt.Println("<noise>")
  }
}
```
- 不没有动态类型且没有动态值时，不要执行interface.

### using interface

- 需要一个方法支持多种类型的参数时。

空interface

- 空接口没有明确的方法。
- 所有的类型都都满足空接口。
- 使用它使函数接受任何类型作为参数。
```
func PrintMe(val interface{}) {
  fmt.Println(val)
}
```

### error interface

- 很多golang程序返回一个error接口的对象做来表示有错误。
```
type error interface{
  Error() string
}
```
- 正确操作时：`error == nil`
- 不正确操作时：Error()打印出一个错误信息。

# coucurrency in Go
## no.1 week

parallel execution

多核系统
- `p = a*cfc^2` // a是阿尔法
- 不能再线性增加了。
- 不使用线性处理，仍可以使用多核。
- 平行执行需要开发多核系统。
- 编写在多核系统上执行的代码。
- 不同的程序执行在不同的核心上。

## no.2 week

### processes 进程

- 一个正在运行的程序的实例。
- 进程特有的东西。
  1. 内存（code/stack/heap/shared lib）(virtual address space)
  2. 寄存器 (program counter / data regs / stack ptr, ...)

操作系统
- 允许很多进程并发执行。
- 进程可以很快地切换。
  - 20ms
- 给用户的感觉是平行执行的。
- 操作系统让进程公平访问资源。

### scheduling

- 当执行时操作系统会的把进程做时序安排。
- 给用户的感觉是平行执行的。
- 操作系统会公平提供cpu/memory/...

### threads & processes

- 一个进程里可以有多个线程。
- 线程间共享环境。
- os schedules threads rather than processes
- 有人把线程称为轻量级的进程

### goroutines

- 像线程
- 很多goroutines在一个单独的os thread里运行。(像一个主线程里包括很多线程。)
- 本地进程映射到线程。
```
              main thread
                   |
            logical processor
                   |
                goruntime
                   |
    -----------------------------
    |              |            |
    |              |            |
goroutine 1   goroutine 1   goroutine 1
```

### interleaving

- 任务内的执行顺序是已知的。
- 并发任务的执行顺序是未知的。
- 任务间的指令交叉是未知的。

### possible interleavings

- 可能有很多种交叉情况。
- 无法知道执行顺序。
- 最好考虑全部的执行顺序可能。

### race condition (竞争条件)

- 依据不确定顺序的结果。
- 竞争是由交流产生的。

### 任务间的交流

- 线程在很大程度上是独立的，但不是完全独立的。
- 在web服务上，一个线程对接多个客户端。
```
  web page data <-> web server <-> client0
                               <-> client1
                               <-> client2
                               <-> client3
```
- image processing，1个线程对应一个像素。

## no.3 week
### goroutine

creating a goroutine

- 自动创建一个goroutine并执行main().
- 使用go关键字创建其它goroutine。
```
// do not use goroutine
a = 1
foo()
a = 2
// use goroutine
a = 1
go foo()
a = 2
// 在新的goroutine里执行中foo()
// 主goroutine不会受阻塞。
```
- 主goroutine块时执行foo()

### 退出goroutine

- 不完成某goroutine里的代码时会退出该goroutine.
- 当主goroutine执行完时，所有的goroutine被退出。
```
func main() {
   go fmt.Printf("New routine")
   time.Sleep(100 * time.Millisecond)
   fmt.Printf("Main routine")
}
```
- 在主goroutine中添加一个延迟，用来给新的goroutine一个完成的机会。
- 最好不要使用添加延迟的方法来完成子goroutines.这是一个不好的方法。下面是坏处。
  - 可能给定的延迟时长不够。
  - 可能os schedules在执行别的线程。
  - 可能go在执行别的goroutine。
- 时机不确定。
- 需要使用同步指令。

### 基本的同步性

- 所有线程同时查看其执行的全局事件。
```
x = 1
x = x + 1
GLOBAL EVENT
// 
if GLOBAL EVENT
  print x
```
- 全局事件会同时监视所有的任务。
- 只有在更新x后打印x.
- 同步用于不好的interleaving.

### wait groups

Sync WaitGroup

- sync包包括goroutine间的同步化的方法。
- `sync.WaitGroup`强到一个goroutine等待别的goroutines
- 包括一个内部计数器。
  - 增加每个等待goroutine的数量。
  - 当每个goroutine完成时减少数值。
  - 直到计数器为0.

使用WaitGroup
```
var wg sync.WaitGroup     |
wg.Add(1)                 |
go foo(&wg)               |----->
wg.Wait()                       |
                                |
                                |
                                |
                          |<----- wg.Done()
                          |
                     ...  |
                          |
                          |
```
- Add() 添加计数器的值。
- Done() 减少计数器的值。
- Wait() 直到计数器为0.
```
func foo(wg *sync.WaitGroup) {
  fmt.Printf("new routine")
  wg.Done()
}
func main () {
  var wg sync.WaitGroup
  wg.Add(1)
  go foo(&wg)
  wg.Wait()
  fmt.Printf("main routine")
}
```

### communication

- goroutine通常协同工作来完成一个大任务。
- 经常需要发送数据给别的goroutine.

channels

- 在2个goroutine间传送数据。
- channel是一种数据类型。
- 使用`make()`创造channel`c := make(chan int)`
- 发送、接收数据都使用`<-`操作符。
- 使用channel发送数据是`c <- 3`
- 从channel中接收数据是`x := <- c`
```
func main() {
  c := make(chan int)
  go prod(1, 2, c)
  go prod(1, 2, c)
  a := <- c
  b := <- c
  fmt.Println(a*b)
}
func prod(a, b int, c chan int) {
  c <- a*b
}
```

### blocking on channels

unbuffered channel（无缓存的通道）
- 无缓存通道不保存数据。（默认是无缓存通道）
- 发送数据后就阻塞，直到数据被接收。
- 接收块直到数据被发送。

|blocking|synchronization||
|-|-|-|
|-|-||
|blocking|waiting for communication||
|receiving / ignoring the resoult| Wait() ||

### buffered channels

channel capacity

- channel能够包含有限数据的要对象。（默认为0，unbuffered）
- Capacity是传输过程是可以容纳对象的数量。
- 使用`make()`的参数定义channel的capcity.`c:=make(chan int, 3)`
- 如果缓冲区已满，则只发送块.
- 如果缓冲区为空，则只接收块.

channel blocking

- 接收方一起等待blocks，直到发来blocks.
- 永远接收blocks.
- 第二个发送块，直到接收完成。在第一次发送完成之前，Receive可以被阻塞。

使用buffering

- 接收方、发送方不需要相同的操作速度。
- 平均速度必须相匹配。
- 速度不匹配也可以被接受。

## no.4 week

### iterating through a channel

- 通常可以从一个channel里逐条读取数据。
```
for i := range c {
  ...
}
```
- 可以从channel连续读取数据。
- 每次接收一个新值时执行一次迭代。
- i是读到的值。

从多个goroutine里接收数据。

- 多通道用于接收有多个来源。
- 数据可以需要从2个来源得到。
- 依次读取。
```
a := <- c1
b := <- c2
...
```

选择声明

- 可以选择使用哪些数据。(谁先来，就处理谁。)
- 使用select声明去等待通道的集合中的第一个数据。
```
select {
  case a = <- c1:
    fmt.Println(a)
  case b = <- c2:
    fmt.Println(b)
}
```
- 可以接收、发送操作
```
select {
  case a = <- inchan:
    //
  case outchan <- b:
    //
}
```
- 可以接收一个数据直到收到一个打断符号。
- 使用select和一个单独的打断通道。
```
for {
  select {
    case a <- c:
    //
    case <- abort:
      return
  }
}
```
- 默认选择
```
select {
  case a = <- c1:
  //
  case a = <- c1:
  //
  default:
  //
}
```

### mutual exclusion

goroutines sharing variables

- 共享变量时会引发一些问题。
- 2个goroutine同时写入共享变量，这就会影响彼此。

concurrency-safe(并发安全)

- 函数可以并发调用，而不会与其他goroutine发生冲突。
```
// 这是一个错误的示例。
// 2个inc是交错执行的。其交错顺序无法确定。
 var i int = 0
 var wg sync.WaitGroup
 func inc () {
  i++
  wg.Done()
 }
func main() {
  wg.Add(2)
  go inc()
  go inc()
  wg.Wait()
  fmt.Println(i)
}
```

并发的间隔

- 并发是机器代码级的。
- i=i+1可能有3个机器指令。
  - read i
  - increment
  - write i
- 交错机器指令会引发意外。

修正共享

- 不要让多个goroutine同时写入共享数据。
- 需要限制可能的交错。
- 不能交替访问共享变量。

共同排除

- 不同goroutine里的代码片段不能并发执行。
- 写入共享变量里应该排除其它routine.

Sync.Mutex

- 确保没有别的goroutine操作。
- 使用semaphore库。
- 升旗时表示变量正在被使用。
- 降旗时表示变量可以被使用。

Sync.Mutex methods

- Lock() 升旗。
- 若锁后，其它goroutine会在降旗后可以访问变量。
- Unlock() 降旗。
- 降旗后就其它变量就可以访问了。
```
var i int = 0
var mut sync.Mutex
func inc() {
  mut.Lock() // 上锁。升旗
  i = i+1
  mut.Unlock() // 解锁。降旗
}
```

### one Synchronization

- 必须发生一次。
- 必须在别的事性前发生。
- 如何在多个goroutine里执行init。
- 可以在goroutine开始前init.

sync.Once

- once.Do(f)
- f只执行一次。
- 所有调用once.Do()都会阻塞，直到第一个返回。
```
var wg sync.WaitGroup
func main () {
  wg.Add(2)
  go dostuff()
  go dostuff()
  wg.Wait()
  // ...
}
```
- 应该只执行一次`setup()`
```
var on sync.Once
func setup() {
  fmt.Println("str")
}
func dostuff() {
  on.Do(setup)
  fmt.Println("hello")
  wg.Done()
}
```

死锁

- 循环依赖会引发阻塞。
```
// example
func dostuff(c1, chan int, c2 chan int) {
  <- c1
  c2 <- 1
  wg.Done()
}
// example 2
func main() {
  ch1 := make(chan int)
  ch2 := make(chan int)
  wg.Add(2)
  go dostuff(ch1, ch2)
  go dostuff(ch2, ch1)
  wg.Wait()
}
```

检测死锁

- 当所有goroutine是死锁时，golang执行时会自动检测。
- 不能检测goroutine的子集何时陷入死锁。

dining philosophers (哲学家就餐)

### title
### title
### title
### title
### title


双引号是用来表示字符串string，其实质是一个byte类型的数组。
单引号表示rune类型。
反引号，用来创建原生的字符串字面量，它可以由多行组成，但不支持任何转义序列。因此，当把两个不同类型的变量进行拼接时，就会报错。
切片可包含任何类型，甚至包括其它切片。
```
func append(s []T, vs ...T) []T
```
方法就是函数。
方法只是个带接收者参数的函数。
```
func (v Vertex) Abs() float64 { // 接口
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
func Abs(v Vertex) float64 { // 方法
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```
使用指针接收者的原因
- 可以修改接收者的值。
- 可以避免每次调用方法时复制该值。







① 通道的收发操作在不同的两个 goroutine 间进行。

由于通道的数据在没有接收方处理时，数据发送方会持续阻塞，因此通道的接收必定在另外一个 goroutine 中进行。

② 接收将持续阻塞直到发送方发送数据。

如果接收方接收时，通道中没有发送方发送数据，接收方也会发生阻塞，直到发送方发送数据为止。

③ 每次接收一个元素。
通道一次只能接收一个数据元素。


```
data:=<-ch // 阻塞接收数据
执行该语句时将会阻塞，直到接收到数据并赋值给 data 变量。

data,ok:=<-ch // 非阻塞接收数据
data：表示接收到的数据。未接收到数据时，data 为通道类型的零值。
ok：表示是否接收到数据。

<-ch // 接收任意数据
执行该语句时将会发生阻塞，直到接收到数据，但接收到的数据会被忽略。
```

```
//select基本用法
select {
case <- chan1:
// 如果chan1成功读到数据，则进行该case处理语句
case chan2 <- 1:
// 如果成功向chan2写入数据，则进行该case处理语句
default:
// 如果上面都没有成功，则进入default处理流程
```
如果有一个或多个IO操作可以完成，则Go运行时系统会随机的选择一个执行，否则的话，如果有default分支，则执行default分支语句，如果连default都没有，则select语句会一直阻塞，直到至少有一个IO操作可以进行





定义摩尔定律，
1. 当价格不变时，集成电路上可容纳的元器件的数目，约每隔18-24个月便会增加一倍，性能也将提升一倍。
并解释为什么它现在不再正确。
1. 随着工程技术的改进，我们终将碰上物理学上的瓶颈.
阻碍摩尔定律继续正确的物理限制。
1. 功率墙（Power Wall）
2. 主要包括随着更多晶体管被装入芯片当中，相应会出现电子能量外泄
3. 更多晶体管需要产生更多热量，以致温度长高。
4. 更多晶体管需要更多电量。
5. 降低电压不会减少噪音，但不会没有噪音。
6. 降低电压不能解决能量外泄问题。
7. 调整电压可以降低电量消耗。

Define Moore's law,
1. When the price remains unchanged, the number of components that can be accommodated on the integrated circuit will double every 18-24 months and the performance will double.
And explain why it's no longer true.
With the improvement of engineering technology, we will eventually hit the bottleneck in physics.
Physical constraints that prevent Moore's law from continuing properly.
1. Power Wall
2. This mainly involves the leakage of electron energy as more transistors are put into the chip
3. More transistors need to generate more heat so that the temperature grows higher.
4. More transistors require more power.
5. Lowering the voltage will not reduce the noise, but not without it.
6. Lowering the voltage cannot solve the problem of energy leakage.
7. Adjust the voltage to reduce power consumption.

Moore's law and describe the physical limitations in
devices that have stopped it from continuing to be
true
Moore's law is not a physical law, just an observation:
Transistors density double every two years.
Transistors density means small transistors, small
transistors switch faster.
Exponential increase in density would lead to exponential
increase in speed.
The problems/Limitations: Power Wall
Transistors consume power when they switch.
Increase transistor density leads to increased power
consumption.
Smaller transistors use less power, but density scaling is
much faster.
High power leads to high temperature. Produce more
heat.
The fan is not able to dissipate the heat and chip will meld
 Air cooling(fans) can only remove so much heat.
P = Power
alpha = percentage of time switching. Alpha is close to
one(1)
C = Capacitance(Related to size)
F = Clock frequency
V = Voltage swing(from low to hight)
P = alpha*C*F*V^2
Voltage is very important.
0 to 5V uses much more power than 0 to 1.3V
That means that you can use lower voltages. But There
are limitations because a very low voltage can be
confused with noise
Dennard Scaling: Voltage should scale with transistor
size. To keep Power consumption and temperature low.
You can't do it forever. Voltage can't go too low. Must stay
above threshold voltage.
Then we have noise. If voltage is very low you can't know
if it's noise or a real value.
You can't increase frequency without melting things
The solution
Create chips with more cores, in some cases more
density(but not so much), but in the most of the cases with
low increase on clock frequency


js / parseInt 把一个字符串解析为整数。参数是（string, radix）

[]byte(str)
string(b))



# command

## build

golang有一套完整的工程目录规则，以GOPATH为工作目录。
`go build`用于编译代码。会编译与之相关联的包。
经编译后可以输出可执行文件。

### 无参数

```
// 目录结构
+ src
  |
  |-test23.go
  |-lib.go

// test23.go
package main
import (
    "fmt"
)
func main() {
    // 同包的函数
    pkgFunc()
    fmt.Println("hello world")
}

// lib.go
package main
import "fmt"
func pkgFunc() {
    fmt.Println("call pkgFunc")
}
```
在src目录下运行`go build`
会在src目录下输出`testBuild`文件。（没有后缀名）
输出文件可执行运行。如：`testBuild`
// call pkgFunc
// hello world

### 参数为文件列表

`go build test23.go test24.go test25.go ...`
这些文件中只能有一个`main`方法。
不能有重复的方法。
会输出以有main方法的文件的文件名为文件名的文件。

### 参数为包

```
cd <path/to>/src
// go build -o <outputName> <path/to/dir>/testBuild/
go build -o testHello ./testBuild/
```

### 附加参数

||||
|-|-|-|
|-o|输出的包名||
|-v|编译时显示包名||
|-p n|开启并发编译，默认为cpu逻辑核数||
|-a|强制重新构建||
|-n|打印编译时会用到的所有命令，但不真正执行||
|-x|打印编译时会用到的所有命令||
|-race|开启竞态检测||

## clean

删除当前源码包中的下列文件：
- 执行`go build`时生成的与包名、go源码文件同名的可执行文件。（删除的是可执行文件）
- 执行`go test -c`时在当前目录下生成的为了`*.test/.test.exe`的文件。
- 执行`go install`时产生的结果文件。
- 在编译go/c源码文件是遗留在相应目录中的文件或目录。

### 附加参数

||||
|-|-|-|
|-i|清除关联的安装的包和可运行文件。即`go install`安装的文件||
|-n|列出清除命令。||
|-r|循环的清除在import中引入的包||
|-x|执行-n显示的命令||
|-cache|删除`go build`命令的缓存||
|-testcache|删除当前包所有的测试结果||

## run

编译源码、执行源码中的main()。不会留下可执行文件。

## fmt

使用golang官方推荐的代码风格格式化代码。

`gofmt`是一个独立的cli程序。
`go fmt`是一个go语言的命令。

- 去除数组、切片、map初始化时的不必要的类型声明。
- 去除数组切片操作时不必要的索引指定。
- 去除循环时不必要的变量赋值。

|`gofmt`||
|-|-|
|-l||
|-w||
|-r||
|-s||
|-e||
|-comments||
|-tabwidth||
|-tabs||
|-cpuprofile||

- 不使用参数。格式化当前目录的所有`.go`文件。
- 使用`*.go`。格式化指定`*.go`。
- 使用`dir`.格式化指定目录下的所有`*.go`。

|go fmt|||
|-|-|-|
|-n|打印出内部要执行的命令||
|-x|执行-n打印出的命令||

### 参数为文件列表
### 参数为文件列表

## install

把编译的中间文件放在GOPATH的pkg目录下，以及固定地将结果放在GOPATH的bin目录下。

- `go install`是建立在GOPATH上的。无法在独立的目录中使用。
- `GOPAHT/bin`是放置`go install`生成的可执行文件。不能指定输出位置。


## get
## generate
## test
## pprof
