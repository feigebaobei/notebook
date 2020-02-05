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

