# overview
整理npm的命令。
# command
## npm access
### overview
发布包时设置访问级别。
### synopsis （大纲）
```
npm access public [<package>]
npm access restricted [<package>]

npm access grant <read-only|read-write> <scope:team> [<package>]
npm access revoke <scope:team> [<package>]

npm access 2fa-required [<package>]
npm access 2fa-not-required [<package>]

npm access ls-packages [<user>|<scope>|<scope:team>]
npm access ls-collaborators [<package> [<user>]]
npm access edit [<package>]
```
### description
所有子命令都作用于在当前目录下的包。
- public / restricted              设置该是公开的或受限制的。
- grant / revoke                   添加或移除用户或团队的只读权限或读写仅限。
- 2fa-required / 2fa-not-required  配置任何人发布是否需要2种因子验证。
- ls-packages                      列出能够访问该包的用户、团队。除了只读权限。
- ls-collaborators                 列出该包的所有权限。
- edit                             设置编辑权限。

### detail
`npm access`总是直接操作注册源（registry）。
不作用的包总是公开的。
作用的包默认是`restricted`，也可以直接设置，如：`npm publish --access=public`.
你必须有权限去设置包的访问权限：
- 你是作用域或非作用域包的拥有者。
- 你是作用域包的拥有团队的成员。
- 你有为包设置读写权限的权限。或你是直接拥有者团队的成员。
若你通过二因子验证，则你会得到一个otp token,它会在命令行中使用`--otp=...`。
若你的账号是免费的。当你发布一个作用域包时，你会得一个失败信息。状态码是`HTTP 402`。若使用`--access=public`，则会成功。
使用`npm team`可以管理团队、团队成员。
