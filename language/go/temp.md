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

## 接口 interface


## type

声明数据类型
```
x int, y int
// 缩写 abbreviation
x, y int
```
