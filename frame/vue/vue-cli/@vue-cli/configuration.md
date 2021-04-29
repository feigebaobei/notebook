@vue/cli内置了很多默认配置项。若要修改配置项可在`vue.config.js`或`package.json`中修改。
vue.config.js是commonjs规范。         js格式
package.json是json对象。在vue字段设置。 json格式
二者方法取其一。

## 配置项

baseUrl
publicPath
outputDir
assetsDir
indexPath
filenameHashing
pages
lintOnSave
runtimeCompiler
transpileDependencies
productionSourceMap
crossorigin
integrity
configureWebpack
chainWebpack
css: {
    modules
    requireModuleExtension
    extract
    sourceMap
    loaderOptions
}
devServer: {
    proxy
}
parallel
pwa
pluginOptions

## 整合到package.json文件

{
    ……
    babel: ...        // babel.config.js
    eslintConfig: ... // .eslintrc
                      // tsconfig.json
}
## 测试
jset
mocha
cypress
nightwatch


