# packages/vue
本子包是vue框架向外提供功能的文件。
从package.json开始。
先看vue/index.js。得知分环境输出不同的包。
结合配置文件得知。输出文件的本质在src/index.ts文件。
依赖了"@vue/shared""@vue/compiler-dom""@vue/runtime-dom"。

## vue/src/index.ts
输出了compileToFunction和@vue/runtime-dom的全部内容。

### compileToFunction
保存起template对应的render，并返回。
