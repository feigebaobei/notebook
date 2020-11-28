# loader
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