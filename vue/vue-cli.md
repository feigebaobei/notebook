##installation

    $ npm install -g vue-cli // 1.x 2.x
    npm uninstall -g vue-cli
    npm i -g @vue/cli // 4.x
    vue --version

## update

```
npm update -g @vue/cli
```

## usage  

    // vue-cli
    $ vue init <template-name> <project-name>
    $ vue init webpack firstvue

    // @vue/cli
    // 创建并打包单个*.vue文件
    vue serve
      ver serve main.js // 指定入口文件。可以main.js/index.js/App.vue/app.vue中的一个。也可自定义。
    vue build

    // 创建一个项目
    vue create program-name // 项目名需要全小写

    // 在已有的项目中添加插件
    vue add eslint // 可能会修改现有文件

### 创建项目

```
vue create program-name // 项目名需要全小写
```

### 安装插件
```
vue add plugin-name // 在一个已经创建好的项目中安装插件
```
vue add 的设计意图是为了安装和调用 Vue CLI 插件。

### preset

一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。
```
// example
{
    "userConfigFiles": true,
    "cssPreprocessor": "sass",
    "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-eslink": {
            "config": "airbnb",
            "lintOn": ["save", "commit"]
        },
        "@vue/cli-plugin-router": {},
        "@vue/cli-plugin-vuex": {},
    }
}
```


```
vue create --preset username/repo pn // 使用github上的preset仓库
vue create --preset gitlab:username/repo pn // 使用gitlab上的preset仓库
vue create --preset ./my-preset pn // 使用本地的preset
```





使用vue-cli会从0开始创建一个vue项目。  

## official templates  

可以使用以下的模板名字。  

1. webpack 包括webpack的全部功能+vue-loader+热更新+linting+testing+css extraction  
2. webpack-simple 简单的webpack功能+vue-loader.  
3. browserify  
4. browserify-simple  
5. pwa PWA模板+webpack的基本模板。  
6. simple 创建一个简单html文件。  

也可使用自定义模板。  
    
    vue init username/repo projectName

## config

在`@vue/cli`创建的项目中没有配置文件。不是代表没有配置文件，而是没有显式创建出来。
`@vue/cli`的配置文件是在根目录的`vue.config.js`文件。若没有该文件，则需要手动创建。其基本结果是
```
// vue.config.js
module.exports = {
    // config
}
```
在该文件里调试的配置项会在被`@vue/cli-service`自动加载。
各配置项可参考 https://cli.vuejs.org/zh/config


## issue

```
command failed: npm install --loglevel error
```
原因：
.vuerc是@vue/cli的全局配置文件。这里默认不使用taobao的registry。估计又与墙有关。
解决方法：
打开`~/.vuerc`
修改`useTaobaoRegistry`为`true`。
