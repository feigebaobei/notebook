# `cypress`

## overview
> 完整的（服务）端到（客户）端测试体验。
> 集成测试环境

### feature
- 自动化测试
- 内置mocha/chai/loadsh/jquery等
- 内置测试运行器
- 支持快照
- 监听测试文件变化
- 支持单元测试、集成测试
- 支持bdd/tdd
- 支持模拟
- 支持大盘

## install
`npm i cypress`

## usage
cypress的gui工具支持执行：
- 一个测试文件
- 全部测试文件
- 匹配条件的测试文件

### xxxx
查询元素
cypress内置了jQuery.查询元素的写法与jquery很像。
cy.get() // 不是同步返回元素。
Cypress.$() // 是同步返回元素。
```
cy.get('.class)
cy.get('#id')
cy.get('tag')
cy.get('.class').find('.sub-class').children('tag[attr^="value"]').first()
cy.get('.class', {timeout: 100})
```
为了配合浏览器，cypress的方法都是异步的。可以为全部方法设置超时时间，也可以为特定方法设置超时时间。默认超时时间是4s。
cypress的链式调用是使用promise开发的。每个命令都为下一个命令生成一个`subject`。直到error/结束。

命令链:使用`.click() / .type() / .blur`等命令与元素交互。
断言元素
`cy.get('form').should('have.class', 'class-name')`
有的命令不能链式调用。如：`cy.clearCookie()`
可以定义别名
```
cy.get('.class').as('myEle').click()
cy.get('@myEle').click()
```
命令是异步的
命令队列。依次执行命令。
含蓄断言：should() / and()
明确断言：expect()

### 写/组织测试文件
测试文件可以使用的扩展名：js / jsx / coffee / cjsx
下载的文件在`<root>/cypress/downloads/<被下载的文件>`
快照在`<root/cypress/screenshots`
视频在`<root/cypress/video`
`cy.task(...)`使用node执行插件
`<root>/cypress/fixtures/...`为测试文件提供测试需要的外部数据。
```
<root>
|--cypress
    |--fixture       // 为测试文件提供测试需要的外部数据。
    |--integraion    // 测试文件
    |--plugins       // 在node服务器中运行的文件。可以使用cy.task()执行。
    |--screenshots   // 快照的目录
    |--support       // 所有测试文件自动引入。可以写before/beforeEach方法
    |--downloads     // 下载的文件
    |--videos        // 视频文件

```
cypress run  在浏览器中打开每个测试文件。
cypress open 启动cypress服务。
cypress是基于mocha/chai开发的。
支持hooks。因为mocha支持。
支持包含/跳过。（only/skip）
Cypress.isBrowser(...) 是否是指定的浏览器。
可以动态编写测试文件的内容。
支持bdd(expect/should)/tdd(assert)
测试状态
    passed
    failed
    pending // it("desc") 无cb

### 可重试
有2种方法去测试：命令（commands）/断言（assertions）
不能重试
`cy.get('#id', {timeout: 0}).should('not.exist')`

### 与元素交互
有一些可产生动作的命令，如：`click() / dbclick() / type() / clear() / select()`...
不可见性
- width/height为0
- visibility: hidden
- diaplay: none
- position: fixed
- 还有一些祖先元素被控制。……
不能用
- diabled: true
只读
动作
覆盖
滚动
坐标
`cy.get('buton').click({position: 'topLeft'})`
debugging
```
cy.get('button').then($bt => {
    debugger
    cy.url().shold(...)
})
```
force
`cy.get('button').click({force: true})`
快捷键
s stop
r restart
f view all tests

### 变量与别名
基本不用`const / let / var`

#### alias
共享上下文。this就是上下文。
可用于：
- 共享上下文
- cy.get() 得到元素
- cy.intercept() / cy.request()
- 可在beforeEach()等钩子函数中使用。

### conditional testing

### the test runner
- 在gui中点击command时会在dev tool中显示相应的信息。
- selector playground
- running experiments
- 
### component testing
组件测试还在开发阶段，api可能还变动。
前期准备
- 项目中的`package.json`使用webpack 4 / 5.
- 



## guides
### command line
`cypress run [opt]`
在electron browser中运行测试文件。默认运行全部。
`cypress open`
打开test runner，就是cypress的gui.
`cypress info`
当前的env.
`cypress verify`
验证cypress是否安装正确并可执行。
`cypress version`
`cypress cache [command]`
`cypress open`

`cypress open`
`cypress open`
`cypress open`










## configuration
<!-- 应该用一个单独的文件写config -->
默认配置文件：`<root>/cypress.json`。
global
|option|description|type|default||
|-|-|-|-|-|
|baseUrl|||null||
|env|环境变量||{}||
|includeShadowDom|查询时是否包括shadow元素||false||
|numTestsKeptInMemory|快照的时间||50||
|port|cypress服务的端口号。默认生成一个随机值||null||
|redirectionLimit|可重定向的最大次数||20||
|reporter|设置报告者||spec||
|reporterOptions|报告者的配置||null||
|retries|重试的最大次数，分别作用于cypress run / cypress open||{"runMode": 0, "openMode": 0}||
|watchForFileChanges|是否监听测试文件改变。||true||

timeout
|defaultCommandTimeout|||4000||
|execTimeout|cy.exec()的最大执行时间||60000||
|taskTimeout|||60000||
|pageLoadTimeout|||60000||
|requestTimeout|||5000||
|responseTimeout|||30000||

folders/files
|downloadsFolder|||||
|fileServerFolder|||||
|fixturesFolder|设置fixture的目录||cypress/fixtures||
|ignoreTestFiles|||||
|option|||||
|option|||||
|option|||||
|testFiles|配置测试文件||`**/*.*`||
|option|||||
|option|||||
|option|||||
|option|||||
|option|||||


folders
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||

viewport
|viewportHeight|默认窗口的大小||600||
|viewportWidth|||1000||

actionability 可运行的
|animationDistanceThreshold|||5||
|waitForAnimations|||true||
|scrollBehavior|执行命令前把元素滚动到视窗的什么位置。||top|'center', 'top', 'bottom', 'nearest', false|

folders
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||

folders
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||
|downloadsFolder|||||

## api
### events


### assertions
### command
cypress把每个方法称为命令。下面是各命令的说明：
|||||
|-|-|-|-|
|and||||
|as||||
|blur||||
|check||||
|children||||
|clear||||
|clearCookie||||
|clearCookies||||
|clearLocalStorage||||
|click||||
|clock||||
|closest||||
|contains||||
|dblclick||||
|debug||||
|document||||
|each||||
|end||||
|eq||||
|exec||||
|filter||||
|find||||
|first||||
|fixture||||
|focus||||
|focused||||
|get||||
|getCookie||||
|getCookies||||
|go||||
|hash||||
|hover||||
|intercept||||
|invoke||||
|its||||
|last||||
|location||||
|log||||
|next||||
|nextAll||||
|nextUntil||||
|not||||
|parent||||
|parents||||
|parentsUntil||||
|pause||||
|prev||||
|prevAll||||
|prevUntil||||
|readFile||||
|reload||||
|request||||
|rightclick||||
|root||||
|route||||
|screenshot||||
|scrollIntoView||||
|scrollTo||||
|select||||
|server||||
|setCookie||||
|shadow||||
|should||||
|siblings||||
|spread||||
|spy||||
|stub||||
|submit||||
|task||||
|then||||
|tick||||
|title||||
|trigger||||
|type||||
|uncheck||||
|url||||
|viewport||||
|visit||||
|wait||||
|window||||
|within||||
|writeFile||||

### utilities
cypress已经内置了lodash/jquery/blob/minimatch/promise/sinon
#### _
#### $
#### Blob
#### minimatch
#### Promise
#### sinon

### cypress api
### plugins





## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。