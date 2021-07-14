# overview
本示例还没写完。因为cypress官方对组件测试还开发中。都是因为vue3还在开发中。vue3一套环境都在建设（2021/07/04）.vue卡着crpress也做不下去。
不过一个折中的办法：把单元测试改为集成测试。利用cypress可以测试app的功能。把vue3写的项目在本地启动。再用cypress测试该应用。具体代码请见`./demo3.md`
本示例展示了：
- 使用cypress测试vite创建的项目中的vue组件

# init project
```
npm init vite-app projName
cd projName
npm i
npm uninstall vite
npm i vite -D        // 为了使用vite@2.x.x版本
npm i cypress @cypress/vite-dev-server @cypress/vue@next @vitejs/plugin-vue -D
npx cypress open     // 为了生成cypress需要基本目录、文件。
// 然后关闭cypress服务
```

## 创建文件
创建`<root>/vite.confit.js`
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()]
})
```

编辑`<root>/cypress.json`
```
{
    "component": {
        "componentFolder": "src",
        "testFiles": "**/*.spec.js"
    }
}
```

编辑`<root>/cypress/plugins/index.js`
```
const path = require('path')
const { startDevServer } = require('@cypress/vite-dev-server')
module.exports = (on, config) => {
  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '../../vite.config.js'),
      },
    })
  })
  return config
}
```

创建被测试文件`<root>/src/components/MsgTip.vue`
```
<template>
    <h2>title of MsgTip</h2>
    <p v-text="msg" class="msg-p"></p>
  <div>
  </div>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, onMounted, computed, ref } from "vue";
// 组件
// import CaInputNumber from '../../InputNumber/src/index.vue';
// 验证
// type/interface
// 配置项
// 指令
// 数据

export default defineComponent({
  name: "MsgTip",
  // components: {
    //     CaInputNumber,
  // },
  // directives
  // inheritAttrs: false,
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  // emits: ['blur'],
  setup(props, ctx) {
    // inject
    // variable
    // ref
    // computed
    // methods
    // provide
    // evnet fn
    // watch
    // lifeCircle
    onMounted(() => {
      console.log("mounted");
    });
    return {
      // variable
      // ref
      // computed
      // methods
      // evnet fn
    };
  },
});
</script>

<style lang="css">
.msg-p {
    color: orange
}
</style>
```

创建测试文件`<root>/src/components/MsgTip.spec.js`
```
import { mount } from '@cypress/vue'
import MsgTip from './MsgTip.vue'
it('renders a message', () => {
  mount(MsgTip, {
    propsData: {
      msg: 'Hello Cypress!',
    },
  })

  cy.get('p').contains('Hello Cypress!')
})
```

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- vite.config.js          // vite的配置文件
|-- cypress
    |-- plugins
        |-- index.js        // 在node.js中运行的插件。为测试做服务。
    |-- xxxx
|-- cypress.json            // cypress的配置文件
|-- src
    |-- components
        |-- MsgTip.vue      // 单元测试文件
        |-- MsgTip.spec.js  // 被测试组件
|-- xxxx
```

# usage
```
npx cypress open-ct // 启动测试组件的服务
// npx cypress open // 启动测试的服务
```

# 后记
