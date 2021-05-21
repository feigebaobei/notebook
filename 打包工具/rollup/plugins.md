# overview
rollup的一站式插件库。
现在（2021/05/20）rollup的插件是这样的`@rollup/plugin-<name>`，以前是这样的`rollup-plugin-<name>`。不要用以前的，用现在的。未来更新的怎么办？我也不知道。
这是一个一库多包的仓库。

# list of plugin
|name|description|||
|-|-|-|-|
|alias|为打包定义、解决别名|||
|auto-install|自动安装bundle导入的依赖项|||
|babel|使用babel去编译文件|||
|beep|当出现错误、警告是使用系统的警告声。|||
|buble|使用buble编译es2015|||
|commonjs|把commonjs转化为es6|||
|data-uri|从data uri中引入模块|||
|dsv|使用`de-dsv`把`*.csv`/`*.tsv`转化为js|||
|dynamic-import-vars|解决包含变量的动态导入|||
|eslint|使用eslint检查入口和所有引入的文件|||
|graphql|把`*.gql`/`*.graphql`转化为es6模块|||
|image|引入jpg/png/git/svg/webp文件|||
|inject|扫描模块中的全局变量，并在必要时注入import语句|||
|json|把`*.json`转化为es6|||
|legacy|使用`export`处理传统的非模块脚本|||
|multi-entry|为打包使用多入口|||
|node-resolve|解决在`node_modules`中依赖|||
|replace|打包是取代文件中的字符串|||
|run|当打包完成时执行该包|||
|strip|移除包中的debugger声明，如console/assert.equal。|||
|sucrase|使用surase轮换ts/flow/jsx/……|||
|typescript|集成rollup+ts|||
|url|使用data-url或esm引入文件|||
|virtual|从内存中引入虚拟模块|||
|wasm|使用rollup引入webassembly代码|||
|yaml|把`*.yaml`转化为es6模块|||

[other plugin](https://github.com/rollup/plugins/tree/master/packages/pluginutils)
# contributing
这是一个使用`pnpm`管理的一库多包库。
`npm i pnpm -g`

## working with plugin packages
保持所有的插件包都在`packages`目录中。
```
// 在本地指定的包中添加指定的依赖
pnpm add <package> --filter ./packages/<name>
// 发布
pnpm run publish -- <name> [flags]
```
包请遵守`@rollup/plugin-<name>`的规则。
发布时过程（逻辑）：
- 收集最后一次发布的commit。
- 制定下一个版本号（包括：major, minor, patch）
- 更新package.json
- 生成一个新的ChangeLog入口.
- 为目标插件更新`CHANGELOG.md`。
- 使用`chore(release): <name>-v<version>`格式提交`packag.json`、`CHANGELOG.md`。
- 发布到npm
- 标记此次发布。格式：`<name>-v<version>`
- 推到远端仓库

## flags

|key|description||||
|-|-|-|-|-|
|--dry|执行演练脚本。跳过所有的文件修改，npm/git的动作。显示确定的版本、新添加的changelog||||
|--major, --minor, --patch|强制明确的语义化版本||||
|--no-push|不添加改变、tag到git||||
|--no-tag|发布是不打tag.||||

## running test
```
pnpm run test
// 测试所有有修改的文件
pnpm run test --filter ./packages/<name>
// 测试指定的包
pnpm run lint
// 检查所有有修改的文件的拼写
pnpm run lint --filter ./packages/<name>
// 检查指定包的拼写
```
# adding plugins
若想添加、讨论插件，请在twitter上联系@RollupJS。

# @rollup/plugin-alias
为打包时定义别名

## alias 101
假设在文件是这样写的
`import batman from '../../batman'`
这样写虽然不是太差，但是为了更好的可读、可维护。可以这样写
```
import batman from 'batman'
```
就像webpack里的`resovle.extensions`/`resolve.alias`
## requirements
node   >= 8.0.0
rollup >= 1.20.0

## install
```
npm install @rollup/plugin-alias --save-dev
// or
yarn add -D @rollup/plugin-alias
```

## usage
```
// rollup.config.js
import alias from '@rollup/plugin-alias'
module.exports = {
    input: 'src/input.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        alias({
            entries: [
                {find: 'utils', replacement: '../../utils'},
                {find: 'batman-1.0.0', replacement: './joker-1.5.0'},
            ]
        })
    ]
}
```
使用api/cli执行rollup。若出现错误，则使用`alias`为标记输出标准错误(stderr)。

## options
### customResolver
type     function | object
defualt  null
指导插件去使用另一种解析算法，而不使用rollup的解析算法。

### entries
type     object | array[...object]
default  null
定义一个代替`import`/`require`的声明。
注意定义的顺序很重要。先定义的被先使用。

#### object
以别名为key，以相当的值为value。
```
entries: {
    utils: '../../utils',
    'batman-1.0.-': './joker-1.5.0'
}
```

#### array[...object]
指定别名为一个对象。成为一个复合的k/v对象。
```
entries: [
    {find: 'utils', replacement: '../../utils'},
    {find: 'batman-1.0.0', replacement: './joker-1.5.0'},
]
```

## regular expression alias
原理同上，demo如下：
```
{find: /^i18n\!(.*)/, replacement: '$1.js'}
{find: /^(.*)\.js/, replacement: '$1.alias'}
```
## resolving algorithm
不会

## custom resolvers
为单个的别名指定特定的模块解析。
```
// rollup.config.js
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
});
const projectRootDir = path.resolve(__dirname);

export default {
  // ...
  plugins: [
    alias({
      entries: [
        {
          find: 'src',
          replacement: path.resolve(projectRootDir, 'src')
          // OR place `customResolver` here. See explanation below.
        }
      ],
      customResolver
    }),
    resolve()
  ]
};
```
此例是关于处理别名`src`的。使用`node-resolve`算法作用于`src`，引入`customResolver`选项。`resolve()`插件会作用于非别名的文件。`customResolver`会作用于每个别名控制的文件。