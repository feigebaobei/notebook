#平时工作中遇到的bug
##vue
在终端输入 npm run dev 后报错：  
 10% building modules 1/1 modules 0 activeevents.js:183                       i       throw er; // Unhandled 'error' event
      ^

resolve: 把config/index.js里的host: 'localhost' 改为 host: '127.0.0.1'。
reason: 我也不知道。  
按理说这2种方式都应该正常运行的。只是在浏览器的地址栏时显示的是localhost/# 和 127.0.0.1/# 的区别。

##css
iphone上不支持transform: translate(*, *)样式。若使用，iphone会认为这个元素是可以移动的。
resolve: 使用margin,padding方法。






























