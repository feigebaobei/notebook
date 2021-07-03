# overview
本示例展示了：
- cypress测试应用

# init project
同`./demo0.md`

## 创建文件
创建`<root>/cypress/integration/sample_spec.js`
```
let {log} = console
describe('The Home Page', () => {
    beforeEach(() => {
        // run system commands
        // cy.exec('npm run hi')
        // cy.task() // run code in node via the pluginFile
        // cy.request() // make http request
        log('beforeEach')
        cy.request('POST', '/test/seed/user', {
            username: 'jam'
        }).its('body').as('currentUser')
    })
  it('successfully loads', () => {
    // cy.visit('http://localhost:8080') // change URL to match your dev URL
    cy.visit('/')
  })
  it('request', () => {
    const {username, password} = this.currentUser
    cy.request('POST', '/login', {
        username,
        password
    })
    cy.visite('/dashboard')
    cy.getCookie('your-session-cookie').should('exist')
    cy.get('h1').should('contain', 'jam')
  })
})
```

# usage
同`./demo0.md`
