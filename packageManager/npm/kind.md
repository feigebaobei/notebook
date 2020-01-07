# 包的种类

按用途分类

- dependencies
devDependencies
peerDependencies
optionalDependencies
bundledDependencies / bundleDependencies

## dependencies

生产时需要的依赖

## devDependencies

只用于开发环境。

## peerDependencies

同等依赖或同伴依赖。
指明需要的打包工具及匹配的版本号。

## optionalDependencies

可选依赖。
设置一些依赖可选。在不安装或安装失败时项目都能正常运行。不过要在项目的代码里做好兼容错误的处理。
这里的包会覆盖dependencies中的包。

## bundledDependencies / bundleDependencies

打包依赖。
其值是包名组成的数组。
在执行打包命令时，把这里的包打包到最终发布的包里。

