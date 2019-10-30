在小程序中使用gulp就足够了，用不着webpack.

# 使用gulp处理微信小程序

## 编译less/js
## 支持路径别名
## 图片自动压缩
## 上传七牛
## 打包加入Eslint检查


```
const { src, dest, parallel, watch, series } = require('gulp')
const Path = require('path')
const Less = require('gulp-less')
const Csso = require('gulp-csso')
const GulpIf = require('gulp-if')
const Rename = require('gulp-rename')
const Alias = require('gulp-wechat-weapp-src-alisa')
const ImageMin = require('gulp-min') // 压缩图片
const Qiniu = require('gulp-qiniu-utils') // 上传到七牛的工具包
const UrlPrefixer = require('gulp-url-prefixer')
const ESLint = require('gulp-eslint') // 检查js代码里的问题。
const Clean = require('gulp-clean')
// 生成路径
function _join (dirname) {
	return Path.join(process.cwd(), 'src', dirname)
}
// 匹配路径
const path = {
	lessPathl: ['src/**/*.less'],
    jsPath: ['src/**/*.js'],
    copy: ['src/**/*.wxml', 'src/**/*.json', 'src/**/*.wxs']
}
// 使用别名匹配路径
const aliasConfig = { // 使用_join()生成的k路径
	'@Libs': _join('libs'),
    '@Utils': _join('utils'),
    '@Components': _join('components'),
    '@Style': _join('style'),
    '@Images': _join('images')
}
// 七牛相关配置
const qiniuOptions = {
    ak: 'ac key',
    sk: 'sk key',
    zone: 'Zone_z0', // 空间对应存储区域（华东：z0，华北：z1，华南：z2，北美：na0）
    bucket: 'hynal-com', // 七牛对应空间
    upload: {
        dir: './dist/images', // 上传本地目录
        // prefix: 'test/', // 上传时添加的前缀，可省略
        except: /\.(html|js)$/, // 上传时不上传文件的正则匹配
    },
    remote: {
        url: 'https://*****.com', // 七牛空间域名
        prefix: {
            default: 'test/', // 七牛空间默认前缀，如果下面三个相同可省略
            remove: 'test/', // 七牛空间删除前缀
            prefetch: 'test/', // 七牛空间预取前缀
            refresh: 'test/', // 七牛空间刷新前缀
        },
    },
}
//
const urlPrefix = {
	prefix: 'https://cdn.liayal.com/dist',
	tags: ['image']
}
// less => wxss
function wxss () {
	return src(path.lessPath, {base: 'src/'}) // 把指定目录下的指定格式的文件编译
		.pipe(Alias(aliasConfig)) // 使用别名效果如js使用别名的效果
		.pipe(Less()) // 使用gulp-less编译
		.pipe(UrlPrefix.css(urlPrefix)) // 把css中使用上传到七牛后的图片的url
		.pipe(GulpIf(process.env.NODE_ENV === 'production', Csso())) // 若是生产环境则使用gulp-csso压缩。
		.pipe(Rename({ // 使用指定的后缀名
			extname: '.wxss'
			}))
		.pipe(dest('dist')) // 输出到指定目录
}
// es6 => js
function js () {
	return src(path.jsPath)
		.pipe(Alias(aliasConfig)) // 使用定义了别名的路径生成完整的路径
		.pipe(ESLint()) // 我不知道这2行做了什么
		.pipe(ESLint.format())
		// 可以使用ESLint.failOnError() / ESLint.failAfterError()在编译报错时中断编译
		/*
		before
			import * as Utils from '@Utils/base'
		after
			import * as Utils from '../../utils/base'
		*/
		.pipe(dest('dist'))
}
// 图片压缩
function imagemin () {
	return src(path.images)
		.pipe(ImageMin())
		.pipe(dest('dist/images'))
}
// 
const images = series(imagemin, (cb) => {
	const qiniu = new Qiniu(qiniuOptions),
	qiniu.upload()
	cb()
	})
// 把wxs/wxml/json复制到相应目录
function copy() {
	return src(path.copy)
		.pipe(Alias(aliasConfig))
		.pipe(UrlPrefixer.html(urlPrefix))
		.pipe(dest('dist'))
}
function clean () {
	return src('dist/*', {read: false})
		.pipe(Clean())
}
// watch
watch(path.lessPath, wxss)
watch(path.jsPath, js)
watch(path.copy, copy)
watch(path.images, images)
// exports.default = series(wxss, js, images)
exports.default = series(clean, parallel(copy, wxss, js, images))
```
