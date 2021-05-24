# overview
rollup为node.js提供了js api。你可以在脚本中使用rollup去打包项目。

# 2个api
## rollup.rollup
```
rollup.rollup(inputOption)
以inputOption为参数去打包，返回bundle对象，该对象包含若干属性/方法。
此方法不会输出打包内容。
```
inputOption:
||||||
|-|-|-|-|-|
|xxx|||||
```
bundle.generate(outputOption)
按outputOption输出打包内容。
可被执行多次。
bundle.write()
写入硬盘。
```
当完成打包后，请执行`bundle.close()`。该方法会执行`closeBundle`钩子，清除外部的程序或服务。

### demo
```
// demo
const rullup = require('rollup')
const inputOptions = {...}
const outputOptions = {...}
async function build() {
    const bundle = await rollup.rollup(inputOptions)
    bundle.geenrate(outputOptions)
    await bundle.write(outputOptions)
    await bundle.close()
}
build()
```

### bundle
```
bundle: {
    xxx
    xxx
    xxx
    xxx
}
```

### inputOptions
```
{
    external   不打包
    input
    plugins
    cache      缓存上一次打包的内容。可加快下一次打包速度。
    onwarn     在出现warning时打断打包的方法。使用--silent则只提示warning
    preserveEntrySignatures   是否使用与底层模块相同的输出。
    strictDeprecations        严格对待弃用功能。若使用弃用功能，则报错误，不显示警告。
    acorn                     应该被Acorn方法解析的属性。
    acornInjectPlugins        不应该被Acorn方法解析的插件。
    context                   模块的内容。即模块的id。默认为undefined。可明确指定，如windonw
    modulecontext             为每个模块设置id。
    preserveSymlinks          是否保存软链接。true:不解析该软链接。false:把链接到的文件放在此位置。
    shimMissingExports        当引入的文件不存在时是否停止。默认为undefined
    treeshake                 是否使用treeshake
    experimentalCacheExpiry   缓存数据使用多少次
    perf                      是否收集性能参数。
}
```
### outputOptions
```
{
    dir                      设置生成文件的目录，在分块打包时必填。不分块打包时使用file
    file                     设置生成文件的目录，不分块打包时使用。
    format                   生成文件的格式
    globals                  设置id:variableName。当使用umd/iife格式时此项必填。
    name                     本包的名字。umd/iife时使用。
    plugins                  为生成文件时使用的插件。
    assetFileNames           自定义资源目录。
    banner                   生成文件的前缀
    chunkFileNames           自定义生成文件的名字。
    compact                  生成的代码最小，不会修改程序员
    entryFileNames           自定义入口文件的名字
    extend                   在umd/iife格式时是否定义全局变量的名字。
    externalLiveBindings     xxx不会
    footer                   生成文件的后缀
    hoistTransitiveImports   在入口文件中的import是否使用空块。（不理解）
    inlineDynamicImports     是否使用行内动态引入。只在单入口时有用。它会影响执行顺序。
    interop                  如何处理外部依赖
    intro                    生成文件的前缀
    manualChunks             
    minifyInternalExports
    outro                    生成文件的后缀
    paths
    preserveModules
    preserveModulesRoot
    sourcemap
    sourcemapExcludeSource
    sourcemapFile
    sourcempaPathTransform
    validate
    amd
    esModule
    exports
    freeze
    indent
    namespaceToStringTag
    noConflict
    preferconst
    strict
    systemNullSetters
}
```
## rollup.watch

# overview
# overview
# overview
# overview
