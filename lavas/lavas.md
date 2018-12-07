#lavas

一个百度做的基于vue的pwa框架。  

##prepare

    npm i lavas -g
    lavas init
    cd (...)
    npm i
    lavas dev

##基本结构

###assets/static

都是存放外部静态资源。  
/assets里的内容会被 webpack 构建到生成目录的文件中，不再会单独以文件形式存在。因此 iconfont 放置在 /assets 中。  
/static里的内容会被原样复制到生成目录中，会以独立的文件形式存在。因此 PWA 用到的 manifest.json 和一系列图标等都放置在 /static 中。  

###components

存放vue组件。  

###core

散落但必须的文件。  

###middlewares

用户自定义的中间件。  

###pages  

每个页面的vue组件。  
在这里的每一个vue文件都会生成一个路由。  
生成的路由是首字母小中间的大小写不变。  
`/pages/Index.vue` => `/`  

###动态参数

    this.$route.param.id

###嵌套路由

    <router-view></router-view>

###store

    export const state = () => {
        return {...}
    }
    export const mutations = () => {
            ...
    }
    export const actions = () => {
            ...
    }

###lavas.config.js  

配置文件  

###.lavas

一旦lavas项目运行过一次，就会生成一个`/.lavas`目录。  
这里有路由规则，处理热更新。  
应处理为`/.gitignore`  

##命令

###lavas init // 项目初始化
###lavas build // 构建项目,生成到/dist目录中
###lavas dev // 使用lavas内置的服务器启动项目.一般用于开发.
###lavas start // 使用lavas内置的服务器启动服务端渲染项目
###lavas static // 以当前目录为基准启动lavas内置服务器  