    npm install (with no args, in package dir)
    npm install [<@scope>/]<name>
    npm install [<@scope>/]<name>@<tag>
    npm install [<@scope>/]<name>@<version>
    npm install [<@scope>/]<name>@<version range>
    npm install <tarball file>
    npm install <tarball url>
    npm install <folder>

    npm i

|缩写|全写||
|-|-|-|
|-S|--save|安装包信息将加入dependencies(生产阶段的依赖)（默认）|
|-D|--save-dev|安装包信息将加入到devdependencies(开发阶段的依赖)|
|-O|--save-optional|optionalDependencies(可选阶段的依赖)|
|-E|--save-exact|精确安装指定模块版本|
||--dry-run||
||local|本地安装|
|-g|--global|全局安装|  

npm uninstall 卸载模块  
npm  

||||
|-|-|-|
|uninstall|卸载模块||
|update|更新模块||
|outdated|检查模块是否已经过时||
|ls|查看安装的模块||
|help|查看详细信息||
|root|查看安装路径||
|config|设置配置|npm config set proxy=http://xxx.com:8080(设置代理)npm config set registry="http://r.cnpmjs.org"(设置镜像)npm install -g cnpm --registry=https://registry.npm.taobao.org(设置淘宝镜像)|
|cache|管理模块的缓存||
|start|启动模块||
|stop|||
|restart|||
|test|||
|version|||
|view|查看模块的注册信息||
|adduer|用户登录||
|publish|发布模块||
|access|在发布的包上设置访问级别||
||||
||||

