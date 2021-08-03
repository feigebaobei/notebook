# overview
本示例展示了：
- 如何使用nuxt创建一个vue 2.x项目。

# no.1 方法
```
npm init nuxt-app <project-name>
cd project-name
npm run dev
```

# no.2 方法
```
mkdir <project-name>
cd <project-name>
```

## 创建文件
创建`<root>/package.json`
```
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

安装nuxt:`npm i nuxt`

创建`<root>/pages/index/index.vue`
```
<template>
<div>
  <h1>Hello world!</h1>
  <first />
  <nuxt-link to="/news" />
</div>
</template>
<script>
    import First from '../../components/first.vue'
    export default {
        components: {
            Frist
        }
    }
<script>
```

创建`<root>/pages/news/index.vue`
```
<template>
<div>
  <h1>Hello news!</h1>
</div>
</template>
```

创建`<root>/components/first.vue`
```
<template>
    <div>
  <h1>Hello first component!</h1>
  <img src="~/assets/images/a.png">
    </div>
</template>
```

创建`<root>/assets/images`，再放一张图片，命名为`a.png`。

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- package.json
|-- pages   // 所有路由级组件所在目录
    |-- index
        |-- index.vue
    |-- news
        |-- index.vue
|-- components // 组件所有目录
    |-- first.vue
|-- assets
    |-- a.png
|-- xxxx
```

# usage
`npm run dev`

# 后记
本示例中需要注意的地方。
为什么这么做示例。
如何恢复本示例的运行结果。