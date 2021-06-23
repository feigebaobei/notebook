问题
    XXX@1.0.0 dev D:\gitProjects\webapp\XXX 
    webpack-dev-server –inline –progress –config build/webpack.dev.conf.js 
    10% building modules 0/1 modules 1 active … webpack/hot/dev-server ./src/main 10% building modules 1/1 modules 0 activeevents.js:165 
    throw er; // Unhandled ‘error’ event

解决方法
    修改localhost为本地的

---

npm 安装 chromedriver  

解决方法  

    npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

## 打包结果

1. 打包后的代码是一个立即执行函数，且传入的参数为一个数组
2. 参数数组就是我们引用的模块
3. 每一个模块对应着数组的位置就是那么的id
4. 在立即函数中加载入口文件，并执行
__webpack_require__ ： 加载并执行某一个模块并将模块缓存在 installedModules 中。

```
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
```
这里是执行引用的某一个模块。
并将module，exports，require 加入模块中。
这也是为什么我们在模块中有全局变量 module/exports/require
