# install

```
npm i gulp -g
```

# usage

## create gulpfile.js

它是主文件。
在这个文件里定义任务。

```
var gulp = require('gulp')
gulp.task('default', function () {
	console.log('string')
})
```

## use

```
cd <dir of gulpfile.js>
gulp <taskName>
```

# api

## gulp.src(globs[, options])

从指定的路径中以流的形式读取文件。
globs是类似正则，但不是。

## gulp.dest(path[, options])

指定生成文件的目录。

## gulp.task(taskName[, deps], fn)

taskName 任务名                 
deps     数组    当前任务的依赖任务
fn       任务函数 

控制任务的执行顺序：
gulp.task('default', ['one', 'two', 'three'], () => {})

### 异步

1. 在异步操作完成后，使用cb触发后续任务。`gulp.task('one', function (cb) {cb()})`
2. 定义任务时返回一个流对象。
3. 返回一个promise对象。
```
var Q = require('q')
gulp.task('one', function (cb) {
	var deferred = Q.defer()
	setTimeout(function () {
		deferred.resovle()
		}, 5000)
	return deferred.promise
	})
gulp.task('two', ['one'], function () {...})
```

## gulp.watch(glob[, opts], tasks) / gulp.watch(glob[, opts, cb])

监视文件变化时执行。
glob  文件匹配模式
opts  配置对象                object
tasks 文件变化后需要执行的任务 array
cb    的参数是一个对象。该对象有以下属性{type: 变化的类型（'added','changed', 'deleted'），path:有变化的文件的路径。}
```
gulp.task('uglify', function () {...})
gulp.task('reload', function () {...})
gulp.watch('js/**/*.js', ['uglify', 'reload'])
```

# plugin

## gulp-load-plugins

自动加载gulp系列插件。

```
var gulp = require('gulp')
var plugins = require('gulp-load-plugins')
// use
// plugins.rename
// plugins.rubySass
// 原理
// gulp-load-plugins帮我们做了：gulp.rename = require('gulp-rename'); gulp.rubySass = require('gulp-ruby-sass')
// 用到时才加载。
```

## gulp-rename

改变文件流中的文件名。一般在gulp.dest()时使用。

```
var gulp = require('gulp')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
gulp.task('rename', funciton () {
	gulp.src('js/jquery.js')
		.pipe(uglify())
		.pipe(rename('jquery.min.js'))
		.pipe(gulp.dest('js'))
	})

```

## gulp-uglify // 压缩js
## gulp-minify-css // compress css
## gulp-minify-html // compress html
## gulp-jshint // check js
## gulp-concat

合并html/css.减少http(s)请求次数。

```
...
gulp.task('concat', function () {
	gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'))
	})
```

## gulp-less
## gulp-sass

```
...
gulp.task('compile-sass', function () {
	gulp.src('sass/*.sass')
		.pipe(sass()) // 若用less: pipe(less())
		.pipe(gulp.dest('dist/css'))
	})
```

## gulp-imagemin // compress jpg/png/gif
## gulp-livereload // 代码变化时自动刷新页面
