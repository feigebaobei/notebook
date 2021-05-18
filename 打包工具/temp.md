# plugin development
## overview
rollup的插件是一个对象。它由properties/build books/output generation hooks中的一个或多个组成。插件应该遵守相关约定。一个插件应该可以被解构为一个输出方法的包。这个方法可以被指定的选项调用再返回一个上述对象。
生命周期：
```
打包阶段
    options
    buildStart
    buildEnd
生成阶段
```

## demo
```
// rollup-plugin-my-example.js
export default function myExample () {
  return {
    name: 'my-example', // this name will show up in warnings and errors
    resolveId ( source ) {
      if (source === 'virtual-module') {
        return source; // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null; // other ids should be handled as usually
    },
    load ( id ) {
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"'; // the source code for "virtual-module"
      }
      return null; // other ids should be handled as usually
    }
  };
}

// rollup.config.js
import myExample from './rollup-plugin-my-example.js';
export default ({
  input: 'virtual-module', // resolved by our plugin
  plugins: [myExample()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});
```
## conventions
- 插件名字的前缀`rollup-plugin-`
- `package.json`中的关键字`rollup-plugin`.
- 发布前经过测试。推荐使用`mocha`/`ava`
- 合理使用异步方法
- 使用英语写文档（^…^）
- 最好使插件输出合适的代码地图。
- 基于其他插件开发时请以其他插件名为前缀。

## perperties
name 插件的名字。一般用于错误信息、警告信息。
## build hooks
为了方便打包，每个插件都包括一些钩子。钩子是一个可被打包各阶段调用的方法。它会影响打包运行。为打包提供信息、或一次打包完成。钩子可分4种：
- async       返回要一个与`sync`相同结果的promise对象，`async`表示异步，`sync`表示同步。
- first       若多个插件实现了此钩子，则要依次执行这些插件。直到返回非`null`/`undefined`。
- sequential  若多个插件实现了此钩子，则这些插件依次执行，若其中一个是异步方法，则其后方法等此方法执行完后再执行。
- parallel    若多个插件实现了此钩子，则这些插件依次执行，若其中一个是异步方法，则其后方法并列执行。
所有的钩子方法都在打包阶段执行，即执行`rollup.rollup(inputOptions)`后开始。主要影响定位、提供、轮换输入文件。第一钩子是`options`，正常运行的最后一个钩子是`buildEnd`。
另外，`watchChange`可以在任意时间被触发。`closeWatcher`也会被执行。
生成的钩子会在生成阶段执行。

### options
得到options后，为其他钩子提供options。
打包阶段的第一个钩子。

### buildStart
当执行`rollup.rollup()`时执行。
得到options后，为其他钩子提供options。

### resolveId
### load
### transform
### moduleParsed
### resolveDynamicImport
### buildEnd
打包完成时触发。
之后触发`outputOptions`钩子。

### closeWatcher
### watchChange
## output generation hooks
### augmentChunkHash
### banner
### closeBundle
### footer
### generateBundle
### intro
### outputOptions
### outro
### renderChunk
### renderDynamicImport
### renderError
### renderStart
### resolveFileUrl
### resolveImportMeta
### writeBundle
## deprecated hooks
### resolveAssetUrl
## plugin context
许多实用函数和信息位可以通过以下方式从大多数钩子中访问:
### this.addWatchFile(id: string) => void
### this.emitFile(emittedFile: EmittedChunk | EmittedAsset) => string
### this.error(error: string | Error, position: number | {column: number: line: number}) => never
### this.getCombinedSourcemap() => SourceMap
### this.getFileName(referenceId: string) => string
### thie.getModuleId() => IterableIterator<string>
### this.getModuleInfo(moduleId: string) => (ModuleInfo | null)
### this.getWatchFiles() => string[]
### this.meta: {rollupVerrsion: string, watchMode: boolean}
### this.parse(code: string, acornOptions?: AcornOptions) => ESTree.Program
### this.resolve(source: string, importer?: string, options?: {skipSelf?: boolean, custom?: {[plugin: string]: any}}) => Promise<{id: string, external: boolean | "absolute", moduleSideEffects: boolean | 'no-treeshake', syntheticNameExports: boolean | string, meta: {[plugin: string]: any}} | null>
### this.setAssetSource(referenceId: string, source: string | Uint8Array) => void
### this.warn(warning: string | RollupWarning, position?: number | {column: number; line: number}) => void
## Deprecated Context Function
## file urls
## transformers
### overview
### example transformerss
### source code transformation
## synthetic named exports
## inter-plugin communication
### custom resolver options
### custom module meta-data
### direct plugin communication




