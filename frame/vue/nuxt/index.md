# `nuxt`

## overview
创建vue2.x项目的脚手架。

### feature
- 按`<root>/pages`目录自动生成路由。
- feature1
- feature2

## install
`npm i nuxt`

## usage
同`./demo.md`


## dir construct
```
<root>
|-- xxxx             // 说明主要文件/目录的功能
|-- package.json
|-- nuxt.config.js   // nuxt的配置文件
|-- pages            // 所有路由级组件所在目录
    |-- index
        |-- index.vue
    |-- news
        |-- index.vue
|-- components       // 组件所有目录
    |-- first.vue
|-- assets           // 不会被编译的文件
    |-- xxxx.png
    |-- xxxx.styl
    |-- xxxx.fft
|-- static           // 服务端根目录下的数据的目录。
    |-- robots.txt
|-- .nuxt            // 运行nuxt dev / nuxt build时生成的目录
|-- content          // 
|-- layouts
|-- middleware
|-- modules
|-- plugins
|-- store
|-- xxxx
```

## commands & deployment
与配置文件中的target属性有关。
`target: 'server'`时
`nuxt dev`   启动dev server
`nuxt build` 使用webpack优化并打包应用。
`nuxt start` 启动prod server.(然后运行`nuxt build`)
`target: 'static'`时
`nuxt dev`   启动dev server
`nuxt generate` 把路由生成静态html文件放在`dist/`目录下。如果需要则打包应用。
`nuxt start`    启动对于`dist/`目录的服务，

### 查看webpack配置
`nuxt webpack [query]`
||||
|-|-|-|
|--name|根据包的名字检查|client / server / modern|
|--dev|在dev环境检查webpack的配置||
|--depth|指定检查深度|默认2|
|--no-colors|不使用ANSI颜色||

### production deployment
可选择服务部署和静态部署。

#### server deployment
使用`target: 'server'`。
再执行`npm run build`。 // 会创建`.nuxt/`目录。里面有需要部署的全部东西。
再执行`npm run start`。 // 可查看应用的版本号

#### static deployment
nuxt可以为静态目录提供服务。
使用`target: 'static'`。
再执行`npm run generate`。 // 会创建`dist/`目录。里面有需要部署的全部东西。

#### 处理部署失败
`npm run generate --fail-on-error` // 当执行ci/cd失败时返回“非零值”。

## upgrading
升级nuxt版本：
1. 检查本地nuxt的版本号。
2. 修改`package.json`中`nuxt`的版本号。
### yarn
3. `rm -rf yarn.lock`
4. `rm -rf node_modules`
5. `yarn`
6. 在安装完成并运行测试之后，还要考虑升级其他依赖项。执行`yarn outdated`
### npm
3. `rm -rf package-lock.json`
4. `rm -rf node_modules`
5. `npm i`
6. 在安装完成并运行测试之后，还要考虑升级其他依赖项。执行`npm outdated`

## configuration
默认配置文件：`<root>/nuxt.config.js`。
```
{
    target: ...
}
```
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|target||'server'|'server'/'static'||||
||||||||
||||||||

## api
`nuxt.fn(param, first: string, second: boolean = true) => void`
description

`nuxt.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。