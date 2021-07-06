# overview
利用cypress可以测试app的功能。把vue3写的项目在本地启动。再用cypress测试该应用。具体代码请见`./demo3.md`
本示例展示了：
1. 编写/启动一个vue3写的项目。
2. 使用cypress测试no.1的项目。

# init project
```
npm init @vitejs/app projName
npm i
npm i -D cypress
npx cypress open // 会生成`<root>/cypress/`
// 然后关闭cypress服务 crtl+c
// npm run dev      // 记住此项目的本地服务地址
```

## 创建文件
创建组件：`<root>/src/component/TipMsg.vue`
功能是把`props.msg`显示为橙色。测试就测此功能。
```
<template>
  <p class="tip-box">{{msg}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
export default defineComponent({
  name: 'App',
  props: {
    msg: String
  }
})
</script>

<style scoped>
.tip-box {
    color: orange;
}
</style>
```

编辑`<root>/src/App.vue`
```
<template>
    // ... other code
    <tip-msg :msg="str" />
</template>
<script lang="ts">
// ... other code
import TipMsg from './components/TipMsg.vue'
export default defineComponent({
  name: 'App',
  components: {
    // ... other code
    TipMsg
  },
  setup() {
    let str = 'hi tip msg.'
    return {
      str
    }
  }
})
</script>
```

编辑`<root>/cypress.json`
```
{
    "baseUrl": "<此项目的本地服务地址>"
}
```

创建`<root>/cypress/integration/comp_spec.js`
```
describe('TipMsg', () => {
    it('color', () => {
        cy.visit('/')
        cy.get('.tip-box', {timeout: 0}).should('have.css', 'color', 'rgb(255, 165, 0)')
    })
    it('text', () => {
        cy.visit('/')
        cy.get('.tip-box').contains('hi tip msg.')
    })
})
```

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- cypress
    |-- fixture
    |-- integration
        |-- xxx
        |-- comp_spec.js   // 测试文件
    |-- plugins
    |-- support
|-- src
    |-- components
        |-- xxxx
        |-- TipMsg.vue     // 被测试的组件
|-- cypress.json
```

# usage
```
// 启动本项目
npm run dev
// 再新开一个终端页面。在同目录下启动cypress服务
npx cypress open
// 在cypress的gui页面中点击comp_spec.js
// 即可看到效果。
```

# 后记
有可能需要执行`cypress install`.
组件开发了什么功能测什么功能。
测试分了四个级别c0/c1/c2/c3.
c0  100%的覆盖率
c1  覆盖到每一个分支
c2c3每个if判断中的条件的真/假都要覆盖
c4  覆盖到每种可能的路径.
