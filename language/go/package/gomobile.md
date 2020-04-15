# command gomobile

gomobile是一个使用go构建并运行移动端应用的工具。

```
// install 
go get golang.org/x/mobile/cmd/gomobile
gomobile init
// or
git clone https://github.com/golang/mobile
修改目录名为'mobile'并放置在$GOPATH/src/golang.org/x/
go build golang.org/x/mobile/cmd/gomobile // 会在$GOPATH/bin下生成gomobile
执行gomobile init// 会在$GOPATH/bin下生成gobind。
// 验证是否安装成功
gomobile version
// gomobile version +3c8601c Sat Feb 22 14:29:34 2020 +0000 (android,ios); androidSDK=/Users/feige/Library/Android/sdk/platforms/android-29
```
需要go 1.10+ 
[查看详细指令](https://golang.org/wiki/Mobile.)

```
// usage
gomobile command [arguments]
gomobile help [command] // 查看更多该命令的说明
```

|command|describe||
|-|-|-|
|bind|为ad/ios编译出库||
|build|编译ad/ios app||
|clean|清除对象文件和缓存的gomobile文件||
|init|为ad构建OpenAL||
|install|编译ad apk并安装在设备上||
|version|打印版本||

编译后默认放在`$GOPATH/src`

## 构建成ad/ios的包

```
gomobile bind [-target android|ios]    // 设置目标系统。只能是android/ios
              [-bootclasspath <path>]  //  -bootclasspath标志用于控制用于Java类的Go包装器的bootstrap类路径
              [-classpath <path>]      //  -classpath标志用于控制用于Java类的Go包装器的类路径
              [-o output]              // 输出文件的名称
              [build flags]            // 与build命令相同的标志
              [package]                // 指定需要编译的包
```
编译生成一个引入路径的名称命名的包。并为指定系统编译一个库。

当`-target=android`时，生成一个AAR (android ARchive)文件，该文件将预编译的Java API存根类、编译后的共享库和包目录下/assets子目录中的所有资产文件存档。输出文件名默认是`<package_name>.aar`。这个AAR文件通常用于Android库项目的二进制分发，而且大多数Android ide都支持AAR导入。必须将环境变量ANDROID_HOME设置为Android SDK的路径使用-javapkg标志为生成的类指定Java包前缀。默认情况下支持所有的指令集(arm, arm64, 386, amd64)构建共享库。如：`-target=android/arm,android/386`
当`-target=ios`时，必须运行在安装了xcode的osx机器上。可以使用`-prefix`标志生成objective-c类型。

## 编译成ad apk和ios app

```
gomobile build [-target android|ios]  //
               [-o output]            //
               [-bundleid bundleID]   //
               [build flags]          //
               [package]              //
```
编译并编码成app.使用引入的路径命名app.
被命名的包必须定义`main`方法。
`-target`大部分与bind一样。若在包的目录下有AndroidManifest.xml，则它会要添加到输出的apk里。否则生成默认的manifest。若包目录中包括资源（assets）子目录，则会被复制到output.
`-iosversion`设置最低版本的ios sdk。默认为7.0.
`-androidapi`设计编译时android api的版本。默认最小值是15.
`-bundleid`当使用`-target`时，该标志是必选的。用来设置app的bundle ID.
`-o`设置输出的文件名。若没有指定，则使用构建时的包作为文件名。
`-v`The -v flag provides verbose output, including the list of packages built.
`-a, -i, -n, -x, -gcflags, -ldflags, -tags, -trimpath, -work`与build命令一样。

## 清除对象文件和缓存的gomobile文件。
`gomobile clean`

## 清除对象文件和缓存的ndk下载的文件
`gomobile init [-openal dir]`
若使用-openal指定了OpenAL目录，则`init`会构建一个OpenAL版本的Android，用于`gomobile build`&`gomobile install`。

## 编译ad apk并安装在设置中

`gomobile install [-target android] [build flags] [package]`
在附加的设备上编译并安装指定引入路径的app.
`-target`只支持`android`。`adb`必须在环境变量里。
下载flag与`build`命令相同。

|flag|||
|-|-|-|
|-a|||
|-i|||
|-n|||
|-gcflags|||
|-ldflags|||
|-tags|||
|-trimpath|||
|-work|||

## 打印版本
`gomobile version`
