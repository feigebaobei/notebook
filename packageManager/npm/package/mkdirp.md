# overview
为node开发的`mkdir -p`功能。

# install
`npm i mkdirp`
# usage
## cli用法
```
uasage mkdirp [dir1, dir2, ...] {options}
	创建每一个给定的目录，其中包括不存在的父级目录。
	若给定的目录存在，则不做事。
options
	-m, --mode 若需要创建文件，则设置八进制权限字符串。
```
## api用法
```
var mkdirp = require('mkdirp')
mkdirp(dir, options, cb)
	创建目录`dir`。
	需要指定八进制权限时请使用`options.mode`。若optiions不是对象，则要当做`options.mode`的值。默认值`0777 & (~process.umask())`
	cb(error, made)

mkdirp.sync(dir, options)
	同步创建目录
```