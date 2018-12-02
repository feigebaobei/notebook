在npm维护package可以方便版本更新、使用、复用。  
这篇文章里会聊从零开始在npm上创建发布package.  

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
index.js // 与package.json里的main值一样。它是作为入口文件的。  
再创建package的内容。  

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

###8. 删除

当前包的作者可以删除。admin角色（24 小时内删除）

    npm unpublish packagename --force

当前团队的拥有者。owner角色。点击删除。

###9. 不足

npm还有一些不足。eg:1.协作者不能删除package.2.多个协作者不能同时编辑同一个package.3.无法删除org。  

---
2018/11/06 by stone