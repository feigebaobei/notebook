# overview
就是快。
是一种前端构建工具。由2部分组成
- 一个开发服务器。提供原生es模块，支持hmr。
- 使用rollup打包。可输出用于生产环境优化过的静态资源。

## 需要的环境
- 支持esm的浏览器

## quick start
```
npm init @vitejs/app first-proj
// 再选择合适的选项
cd first-proj
npm i
npm run dev // 实际运行 vite
```

## 项目结构
项目根目录中有`index.html`。该文件被`vite`视为vite项目的一部分。

# function
- 不支持裸模块导入。
- 使用esbuild预构建。负责ts => js。
- 重写导入为合法的url.
- 支持hmr api
- 支持直接使用ts。不负责类型检查。使用`vue-tsc --noEmit`做类型检查。
- 内置支持scss sass less styl stylus
- 构建优化
    + 对动态导入的polyfill
    + css代码分割
    + 预加载指令生成
    + 异步chunk加载优化

# 使用插件
vite使用rollup提供的可插件功能。
```
// add plugin
npm i -D @vitejs/plugin-legacy // 为传统浏览器提供支持
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import image from '@rollup/plugin-image'
export default {
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        {
            ...image(),
            enforce: 'pre', // 在何时使用该插件
            apply: 'build', // 在打包阶段使用
        }
    ]
}
```
## 强制使用插件的时间
- pre       在vite的核心插件之前使用该插件
- default   在vite的核心插件之后使用该插件
- post      在vite的核心插件之后使用该插件
## 使用阶段
由`apply`指定。可选`build`：打包阶段，`server`：生产阶段。

# 依赖预构建
首次启动vite。
目的：
- 兼容commonjs / umd。为了给浏览器提供es模块。需要先把依赖转换为esm.
- 性能。把多人模块转换为一个模块。
- 

# 静态资源处理

# 打包生成版本
`vite build`。
使用`<root>/index.html`为构建入口。
`build.base`  静态资源的基本路径
`build.rollupOptions`    设置rollup打包时选项。
`build.watch`            设置rollup的监视对象。
## 多入口
```
<root>
|-- index.html
|-- main.js
|-- vite.config.js
|-- ....
|-- nested
    |-- index.html
    |-- nested.js
// vite.config.js
const {resovle} = require('path')
module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resovle(__dirname, 'index.html'),
                nested: resovle(__diranem, 'nested/index.html')
            }
        }
    }
}
```
## 库模式
```
// vite.config.js
const path = require('path')
module.exports = {
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/main.js'),
            name: "mylib"
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'vue'
                }
            }
        }
    }
}

```

# 部署静态站点
```
vite build    // build project
vite preview  // preview at localhost
```

# 环境变量与模式
`import.meta.env`是环境变量对象。
```
import.meta.env: {
    MODE:            运行基于模式
    BASE_URL         部署的base url
    PROD             是否运行在生产环境
    DEV              是否运行在开发环境
    VITE_APP_TITLE   标题
}
```

## .env文件
环境可自定义
```
// define
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

// define
# .env.staging
NODE——ENV=production
VITE_APP_TITLE=My App (staging)
// use
vite build --mode staging
```

# ssr
## 源码结构
```
<root>
|-- index.html
|-- src
    |-- main.js              # 导出环境无关的（通用的）应用代码
    |-- entry-client.js      # 将应用挂载到一个dom元素上
    |-- entry-server.js      # 使用某框架的ssr api渲染该应用
```
index.html应该包含以下代码：
```
<div id="app"><!-- ssr-outlet --></div>                      // 用于供服务端渲染
<script type="module" src="/src/entry-client.js"></script>
```

## 设置开发服务器
```
const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()

  // 以中间件模式创建 vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })
  // 使用 vite 的 Connect 实例作为中间件
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    // 服务 index.html - 下面我们来处理这个问题
    const url = req.originalUrl

  try {
    // 1. 读取 index.html
    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    )

    // 2. 应用 vite HTML 转换。这将会注入 vite HMR 客户端，and
    //    同时也会从 Vite 插件应用 HTML 转换。
    //    例如：@vitejs/plugin-react-refresh 中的 global preambles
    template = await vite.transformIndexHtml(url, template)

    // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
    //    你的 ESM 源码将在 Node.js 也可用了！无需打包
    //    并提供类似 HMR 的根据情况随时失效。
    const { render } = await vite.ssrLoadModule('/src/entry-server.js')

    // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
    //    函数调用了相应 framework 的 SSR API。
    //    例如 ReactDOMServer.renderToString()
    const appHtml = await render(url)

    // 5. 注入应用渲染的 HTML 到模板中。
    const html = template.replace(`<!--ssr-outlet-->`, appHtml)

    // 6. 将渲染完成的 HTML 返回
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    // 如果捕获到了一个错误，让 vite 来修复该堆栈，这样它就可以映射回
    // 你的实际源码中。
    vite.ssrFixStacktrace(e)
    console.error(e)
    res.status(500).end(e.message)
  }
  })

  app.listen(3000)
}

createServer()
```
package.json
```
"script": {
    "dev": "node server"
}
```
## 生产环境构建
部署到生产环境需要
1. 打包一个客户端包
2. 打包一个服务端包
```
// package.json
{
    "script": {
        "dev": "node server",
        "build:client": "vite build --outDir dist/client",
        "build:server": "vite build --outDir dist/server --ssr src/entry-server.js",
    }
}
```
`vite build --src path/file.js` 用于把`path/file.js`打包为一个服务端包。
`server.js`中需要增加一些生产环境的逻辑。
- 使用`dist/client/index.html`作为模板。读取根目录的`index.html`。
- 使用`require('./dist/server/entry-server.js')`。该文件是ssr构建的结果。
- xxx

# 与传统后端集成
后端使用node/laravel/rails。前端使用`vite`。需要做以下三点：
1. 在`vite.config.js`中配置入口文件和启动创建`manifest`。
2. 在入口文件添加`import 'vite/dynamic-import-polyfill'`
3. 在开发环境中，修改index.html中引入的脚本。
4. 在生产环境中，`vite build`会生成静态资源文件与`manifest.json`。

# plugin api
## 约定
```
vite-plugin-vue-
vite-plugin-react-
vite-plugin-svelte-
```

##插件配置
```
// vite.config.js
import vitePlugin form 'vite-plugin-vue-name'
export default {
    plugins: [
        vitePlugin()
    ]
}
```

## 插件框架
```
// import ...
export default function framwork(config) {
    // ...
    return ...
}
```

## demo插件
// 写法真像rollup的插件
```
export default function mp() {
    const virtualFileId = '....'
    return {
        name: 'mp',
        resolveId(id) {
            ...
            return virtualFileId
        }
        load(id) {
            return `export const msg = "from virtual file"`
        }
    }
}
```

## 插件的钩子
- options
- buildStart
- resolveId
- load
- transform
- buildEnd
- closeBundle

## vite独有的钩子

# hmr api
```
interface ImportMeta {
  readonly hot?: {
    readonly data: any

    accept(): void
    accept(cb: (mod: any) => void): void
    accept(dep: string, cb: (mod: any) => void): void
    accept(deps: string[], cb: (mods: any[]) => void): void

    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void

    on(event: string, cb: (...args: any[]) => void): void
  }
}
```
必要的条件守卫
hot.accept(cb)

# js api
# 配置
## 配置文件
vite.config.js
`vite --config config.js`
```
export default ({command, mode}) => {
    if (command === 'server') {
        return {...}
    } else {
        return {...}
    }
}
```

## 共享配置
||||||
|-|-|-|-|-|
|root|||||
|base|||||
|mode|||||
|define|||||
|plugins|||||
|publicDir|||||
|cacheDir|||||
|resolve.alias|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
|root|||||
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# 名词说明
|||||
|-|-|-|-|
|裸模块导入|导入的内容为空或导入后不使用。|||
|||||
|||||
|||||