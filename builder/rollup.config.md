# 各字段说明

## overview
大体可分为
|核心方法|-|类型|说明|demo|
|-|-|-|-|-|
|external|-|`(string | RegExp)[] | RegExp | string | (id: string, parentId: string, isResolved: boolean) => boolean`|指定不打包的内容||
|input|||入口||
|output|||出口||
||dir||输出多块代码时使用，不与file同时使用。||
||file||输出单个代码。||
||format||生成格式||
||globals||当输出格式是`umd/iife`时需要指定全局变量的id。`id: variableName`。定义`id`与`variableName`的相等关系。||
||name||当输出格式是`umd/iife`时需要指定全局变量的名字。||
||plugins||输出时的插件。只有使用有`bundle/generate()`/`bundle/write()`方法的插件可使用。||
|plugins|||||

|高级方法|-|类型|说明|demo|
|-|-|-|-|-|
|cache|||是否使用缓存中的包。若是，则在下次打包是只检查是否改变。否则重新打包。||
|makeAbsoluteExternalsRelative|||是否把绝对路径转换为相对路径。||
|onwarn|||是否在warn时打断打包。||
|output|||||
||assetFileNames|`string | ((assetInfo: AssetInfo) => string)`|自定义打包后资源文件的名字。|`assets/[name]-[hash][extname]`|
||banner||打包后的前缀||
||footer||打包后的后缀||
||chunkFileNames|打包后的文件名|||
||compact||是否变紧凑（多行变一行）。（不是压缩）||
||entryFileNames||修改入口文件的名字。|`[name]-[hash].[format]`|
||extend||是否扩展全局变量的`name`选项。用于`umd`/`iife`||
||hoistTransitiveImports||默认输出多块代码||
||inlineDynamicImports||使用行内动态引入代替生成一个新代码块。||
||interop||不会||
||intro||是否包含指定格式的包裹者||
||outro||-||
||manualChunks||创建一个共享的代码块。使用指定的key定义块的名字|`manualChunks: {lodash: ['lodash']}`|
||minifyInternalExports||当`output.compact: true`并格式为es、system时，默认为ture。则表示变量使用一个字母。||
||paths||指定外部模块id对应的url.打包后使用url代替模块id。||
||preserveModules||不会||
||preserveModulesRoot||不会||
||sourcemap||是否使用源代码地图。若输出，则输出在源代码内、后。||
||sourcemapExcludeSources||不否使用外部的源代码地图。||
||sourcemapFile||指定sourcemap的相对路径||
||sourcemapPathTransform|指定每个文件的sourcemap的目录|||
||validate||是否检测打包后的代码||
|preserveEntrySignatures||不会|||
|strictDeprecations||当出现错误时，是否中断打包。true中断false报warning|||

|危险区|-|类型|说明|demo|
|-|-|-|-|-|
|acorn|||是否把每个选项都会被处理到`parse()`中。||
|acornInjectPlugins|||不会||
|context|||模块的内容||
|moduleContext|||不会||
|output|||||
||amd||不会||
||amd.id||umd/amd的id||
||amd.autoId||设置块id||
||amd.basePath||不会||
||amd.define||用于代替`define`||
||esModule||是否在输出包中设置`__esModule:true`。该属性表示 esm的命名空间、是默认输出。||
||exports||不会||
||externalLiveBinding||不会||
||freeze||是否使用`Object.freeze(namespace)`||
||indent||是否使用缩进||
||namespaceToStringTag||是否允许添加`.toString()`到namespace对象上。||
||noConflict||不会||
||preferConst||是否使用const代替var.||
||strict||是否使用严格模式||
||systemNullSetters||当systemjs时是否使用null代替空函数。||
|preserveSymlinks|||是否保护软链接。若是则代替其后的文件。否则使用该链接。||
|shimMissingExports|||不会||
|treeshake|||不会||
||annotations||不会||
||moduleSideEffectsx||不会||
||tryCatchDeoptimization||不会||
||unknownGlobalSideEffects||不会||

|扩展选项|-|类型|说明|demo|
|-|-|-|-|-|
|experimentalCacheExpiry|||不会||
|perf|||不会||

|检视选项|-|类型|说明|demo|
|-|-|-|-|-|
|watch|||||
||buildDelay||当修改个多长时间开发重新打包。||
||chokidar||是否传递`chokidar`实例到打包时。||
||clearScreen||在重新构建时是否清空屏幕。||
||exclude||限定不监视区域|`watch:{exclude: 'node_modules/**'}`|
||include||限定监视区域。|`watch:{include: src/**}`|
||skipWrite||是否跳过`bundle.write()`||

|弃用选项|-|类型|说明|demo|
|-|-|-|-|-|






- 核心方法
  - plugins
```
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const isProduction = process.env.NODE_ENV === 'production';

export default (async () => ({
  input: 'main.js',
  plugins: [
    resolve(),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser()
  ],
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
}))();
```
- 高级方法
  - output.assetFileNames
    - `[extname]` 文件扩展名。以`.`开头。
    - `[ext]`     文件扩展名。无`.`开头。
    - `[hash]`    文件的hash值。
    - `[name]`    文件的名字。
  - output.chunkFileNames
    - `[format]`  文件格式
    - `[hash]`    文件的hash值。
    - `[name]`    文件的名字。可被`output.manualChunks`设置，或被插件的`this.emitFile`设置，否则从块的内容中取得。
  - external
- 危险区
  - external
  - external
  - external
- 扩展选项
  - external
  - external
  - external
- 检视选项
  - external
  - external
- 弃用选项
  - external
  - external
  - external







# 名词说明
resolve ID ： 就像绝对路径一样。（用于明确指定一个模块的标记）
