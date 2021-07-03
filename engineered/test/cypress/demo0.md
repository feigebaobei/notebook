# overview
本示例展示了：
- 下载/安装/启动服务/使用。
- 写一个基本的测试文件。
- 在项目中使用cypress.

# init project
创建一个项目。
```
npm init @vuejs/app projName
cd projName
npm i
```

## install cypress
```
npm i cypress -D
// ubuntu需要安装二进制文件。请执行：
// npx cypress install
npx cypress open    // 启动cypres服务
npx cypress run
```

## create file
`<root>/cypress/integration/sample_spec.js`
```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
    cy.pause()
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
```

## dir construct
```
<root>
|-- xxxx // 说明主要文件/目录的功能
|-- cypress        // 需要cypress运行的测试文件
    |-- integration
      |-- sample_spec.js
    |-- xxxx
|-- xxxx
```

# usage
当执行`npx cypress open`后，会打开cypress的gui页面。列表中要内置的demo文件。点击任意一个可执行该测试文件。然后cypress会调用相应的浏览器运行该测试文件。

# 后记
## 很简单地安装/启动。还有一些基本示例。很好。我写东西时可以用上。
## 创建`<root>/.gitignore`
```
node_modules
.DS_Store
dist
dist-ssr
*.local
cypress
```
