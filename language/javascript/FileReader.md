#FileReader  

它的作用和它的名字一样——读取文件。完整地阐述作用：使用web程序可以读取存储的用户计算机上的文件、缓冲区的内容。  

##api

|名称|说明||
|-|-|-|
|构造函数|||
|FileReader()|||
|属性|||
|.error|返回读取文件时发生的错误（DOMException）||
|.readyState|读取文件时的状态码。0: 还没有加载数据 1: 数据正在加载 2: 完成全部读取工作||
|.result|返回读取到的数据。只有读取完成后才有效。||
|事件处理方法|||
|.onabort|当读取操作中断时触发。||
|.onerror|当读取操作发生错误时触发。||
|.onload|当读取完成时触发||
|.onloadstart|当读取开始时触发||
|.onloadend|当读取完成时触发||
|.onprogress|读取blob对象时触发||
|方法|||
|.abort()|中止读取||
|.readAsArrayBuffer()|开始读取blob中的内容，在result属性中保存ArrayBuffer的数据对象||
|.readAsBinaryString()|开始读取blob中的内容，在result属性保存二进制数据||
|.readAsDataURL()|开始读取blob中的内容，在result属性中保存`data:url`格式的数据。用字符串的格式表示文件的内容。||
|.readAsText()|开始读取blob中的内容。在result属性中保存字符串格式的读取到的内容。||  

##思考

这个对象就是用来读取、保存文件的。  
它的属性表示当时读取的状态。  
它的事件都是读取文件时的钩子函数。  
它的方法都是`blob`从读取成什么格式的数据。  

--- 

2018/12/10 by stone