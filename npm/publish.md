在npm维护package可以方便版本更新、使用、复用。  
这篇文章里会聊从零开始在npm上创建发布package.  
简单来说就是：  

1. 在本地初始化包。（npm init）  
2. 创建内容。（最后规范）  
3. 在https://www.npmjs.com网站上注册账号。  
4. 在本地用这个账号登录。（npm login, 再输name,password,email）  
5. 发布（npm publish）

以下是详细步骤。  

###1. install

初装必要环境。  
node, npm  

###2. register 

在npm网站创建一个账号。  
进入官网-进入注册页面-验证邮箱地址。  

###3. create

在本地创建一个目录，并进入。  

    mkdir ...
    cd ...
    npm init
    // 再输入相应信息。

###4. adduser

     npm adduser

###5. login

    npm login
    //有可能是 npm adduser
    // 再输入账号、密码。

###6. 创建基本内容

README.md // 介绍当前package，可以不创建。  
npm init // 根据readme生成package.json文件。  
index.js // 与package.json里的main值一样。它是作为入口文件的。  
再创建package的内容。包文档结构如下：  

![](../image/npm/docuConstruct.jpg)  

`src/assets` 是用来放置资源。  
`src/assets/basic` 我个人习惯用来放置基本内容。可以不管。  
`src/assets/img` 是用来放置图片。  
`src/conponents` 是用来放置组件。  
`src/conponents/vueName` 是用来放置当前组件需要的子组件。  
`src/conponents/vueName/index` 一般是该子组件的主体。  
`src/lib` 所有组件需要的数据资源。  
`.gitignore` 指定需要git忽略的内容。  
`index` 当前包的入口文件。  
`package` 当前包的信息。  
`README.md` 介绍当前包。  

当前包的入口文件中index.js文件。在该文件中输出各个组件。  

    // package/index.js
    import first from './src/components/first'
    import second from './src/components/second'
    export {
      first,
      second
    }



###7. 发布

    npm publish

    <!-- package name 已经被注册 -->
    npm ERR! publish Failed PUT 403
    npm ERR! code E403
    npm ERR! Package name too similar to existing packages; try renaming your package to '@feigebaobei/secondtest' and publishing with 'npm publish --access=public' instead : secondtest

    <!-- 邮箱未验证 -->
    <!-- 镜像问题 -->

####issue

    // 报错
    npm ERR! publish Failed PUT 401
    npm ERR! code E401
    npm ERR! 404 unauthorized Login first: firstasdfqwer1234
    npm ERR! 404
    npm ERR! 404  'firstasdfqwer1234' is not in the npm registry.
    npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
    // 解决方法
    npm config set registry https://registry.npmjs.org/
    npm adduser
    npm login
    npm publish

    // 报错
    Package name triggered spam detection; if you believe this is in error, please contact support@npmjs.com : firstasdfqwer1234
    // 解决方法
    // 改为正常的名字

```
npm ERR! path C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz
npm ERR! code EPERM
npm ERR! errno -4048
npm ERR! syscall unlink
npm ERR! Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!  { Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!   cause:
npm ERR!    { Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!      errno: -4048,
npm ERR!      code: 'EPERM',
npm ERR!      syscall: 'unlink',
npm ERR!      path: 'C:\\Users\\Admin\\AppData\\Local\\Temp\\npm-12284-cd09bc74\\tmp\\fromDir-8703ef80\\package.tgz' },
npm ERR!   isOperational: true,
npm ERR!   stack: 'Error: EPERM: operation not permitted, unlink \'C:\\Users\\Admin\\AppData\\Local\\Temp\\npm-12284-cd09bc74\\tmp\\fromDir-8703ef80\\package.tgz\'',
```

大概意思是说没有登录.需要使用`npm login`登录。

使用`npm login`登录时，输入Username/Password/Email后，提示：

```
npm ERR! code E409
npm ERR! Registry returned 409 for PUT on http://registry.npm.taobao.org/-/user/org.couchdb.user:feigebaobei: [conflict] User feigebaobei already exists
```

去网上搜了一下，原因是淘宝镜像的问题。  

`npm config set registry http://registry.npm.org`

npm config [set | get | delete | list | edit]

###8. 删除

当前包的作者可以删除。admin角色（24 小时内可删除）

    npm unpublish packagename --force

当前团队的拥有者或owner角色。点击删除按钮可把该package从team中删除。  

###9. 不足

npm还有一些不足。eg:1.协作者不能删除package.2.多个协作者不能同时编辑同一个package.3.无法删除org。4.24h后不可删除该包。  

###10. 测试

在发布前最后先测试是否能正常工作。我采用的方法是创建一个vue项目把package放在`src/components/`下。使用相对链接引用。这是开发阶段的测试。若需要在正式测试需要再创建一个vue项目。使用`npm i packageName`安装该包，再使用包。若通过这2个测试就可以正常使用了。  


---
2018/11/06 by stone