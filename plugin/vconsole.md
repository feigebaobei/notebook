#vconsole

为移动端开发的前端开发工具。  

##function

1. 查看console日志。  
2. 查看network请求。  
3. 查看文档元素。  
4. 查看cookie/localstorage.  
5. 执行手写的js命令。  
6. 自定义插件。  

##install

    npm i vconsole
    <script src="path/to/vconsole.js"></script>

##usage

    var vc = new VConsole(option)
    // option

直接使用。与console.log无区别。  
console.log('system', value) // 会把value输出支system.  
