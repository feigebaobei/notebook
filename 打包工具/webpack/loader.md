# loader

所有的loader都是一个管道
在webpack中，可以把一个loader看做是一个数据管道，进口是 一个字符串，然后经过加工，输出另一个字符串，多个loader可以像水管一样串联起来，很像java中的stream流。
所有模块都是JS模块 webpack 只支持JS模块，所有其他类型的模块，比如图片，css等，都需要通过对应的loader转成JS模块。所以在webpack中无论任何类型的资源，本质上都被当成JS模块处理。
对于CSS，我们可以把它转成一段JS，这个JS会把CSS插入到DOM中。
对于图片，我们可以把它进行base64转换变成一个字符串，或者进行文件拷贝然后导出它的URL

let compiler = new Compiler(options.context)
__webpack_require__ 函数定义了一个可以在浏览器中执行的加载函数来模拟 Node.js 中的 require 语句。

## style-loader原理解析

1. require一个css文件，得到其中的字符串。
2. 使用addStyles把css插入到dom中。

pitch模式 从左向右执行。
默认模式   从右向左执行。

## css-loader原理解析

只能处理import / url，2种依赖。

## file-loader

复制一份文件内容，并根据配置为他生成一个唯一的文件名。

通过 loaderUtils.interpolateName 方法可以根据 options.name 以及文件内容生成一个唯一的文件名 url（一般配置都会带上hash，否则很可能由于文件重名而冲突）
通过 this.emitFile(url, content) 告诉 webpack 我需要创建一个文件，webpack会根据参数创建对应的文件，放在 public path 目录下。
返回 'module.exports = __webpack_public_path__ + '+ JSON.stringify(url) + ‘;’ ，这样就会把原来的文件路径替换为编译后的路径

## url-loader

把文件做base64编码，直接嵌入到CSS/JS/HTML代码中。

获取 limit 参数
如果 文件大小在 limit 之类，则直接返回文件的 base64 编码后内容
如果超过了 limit ，则调用 `file-loader