# 创建公开的私有包
## overview
当只希望把包分享到一些用户、团队时，可使用私有包。
更多信息，请查看`about scopes` / `about private packages`。
> 在发布私有用户级作用域包前，需要注册npm一个付费账号。
> 在发布私有团队级作用域包前，需要创建npm的账号，再创建一个付费的团队。

## creating a private package
1. 若你是使用`npmrc`管理多个注册源的账号，则需要使用收下命令切换到合适的profile.
```
npmrc <profile-name>
```
2. 使用命令行创建一个包。`mkdir my-test-package`
3. 导航到包的根目录。`cd my-test-package`
4. 若使用git管理包，则需要在包的根目录执行以下命令
    ```
    git init
    git remote add origin git://git-remote-url
    ```
5. 在包的根目录执行
    `npm init --scope=@my-org` 用于创建团队级作用域包。
    `npm init --scope=@my-username` 用于创建用户级作用域包。
6. 按提示生成`package.json`。
7. 创建`README.md`文件。用于说明如何使用该包。
8. 使用你喜欢的编辑器，编辑该包。

## reviewing package contents for sensitive or unnecessary information
强制建议删除敏感信息。
可以使用`.npmignore`、`.gitignore`忽略敏感信息。

## test your package
建议在发布前测试。
`npm i fullpathOfMypackage`

## publishing private packages
默认发布作用域包后是私有可见的。
1. 导航到项目的根目录。`cd /path/to/package`
2. 发布包`npm publish`
3. 进入私有包的页面`https://npmjs.com/package/${package-name}`。可看到该包标明是private的。

# 有关作用域
## overview
## scopes and package visibility
