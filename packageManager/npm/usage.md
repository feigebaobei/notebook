# usage
npm 的使用方法。
## scope
### descrption
每个包都有包名。有的包名有作用域。包名作用域规则：`@somescope/somepackagename`。
作用域可把相关的包放在一个组里。
每个用户、组织都自己的作用域。你可以为自己的包添加作用域。如此，你不用担心别人占用你的包名。也标明该包是该组件的权威出品。
作用域包支持发布到私有注册源。向后兼容。

### installing scoped packages
作用域包被安装在固定的子目录中。如`node_modules/@myorg/packagename`。
安装:`npm i @myorg/mypackage`
在`package.json`中如下：
```
"dependencies": {
    "@myorg/mypackage": "^3.3.3"
}
```

### requiring scoped packages
`require('@myorg/mypackage')`

### publishing scoped packages
可把作用域包发布到要私有注册源中。

#### 发布作用域包到私有注册源
第一次发布时必须使用`--access public`发布公开作用域包。会被设置为公开包，就像执行`npm access publish`一样。

#### 发布作用域包到npm注册源
你必须有一个npm private modules账号。
然后使用`npm publish` / `npm publish --access restricted`发布。也可以使用`npm access`修改访问权限。

### associating a scope with a registry
使用指定的注册源可访问作用域包。使用若干个注册源无缝使用包。
```
npm login --registry=http://reg.example.om --scope=@myco
```
作用域有一个多对一的关系表。可实现一个注册表管理多个作用域。每次只使用其中一个注册源。
```
npm config set @myco:registry http://reg.example.com
```
一旦注册被使用，则每次执行`npm i`时都会使用同一个注册源。当使用`npm publish`时包括了作用域，则注册表被替换。

## scripts
## workspaces
