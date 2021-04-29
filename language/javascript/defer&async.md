defer&async.md



无修饰
	读取并执行该script标签。
defer
	向用户代理提示该脚本不会生成任何网页内容。用户代理可以继续解析和渲染。在DOMContentLoaded执行之前，由上到下依次加载。
async
	异步读取并执行该script标签。

dom文档加载步骤
1. 解析html结构
2. 加载外部脚本/样式表
3. 解析并执行脚本代码
4. dom树构建完成        // rendy--DOMContentLoaded
5. 加载html和css中引用的外部资源文件
6. 页面加载完成         // load
$(document).ready()   // (function() {})
	在no.4后执行。
	多编写多个。都可执行。
window.onload         // $(window).load(function () {...})
	在no.6后执行。
	若编写多个，则只执行最后一个。




