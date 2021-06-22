# overview
为指定git hook绑定指定npm script。
较大优化commit。
规范化要求commit message。

# install
`npm i husky`

# usage
需要npm 7+。
用三种方式：

## automatic
...

## manual
```
mkdir proj-name
cd proj-name
npm init -y
npm i husky -D
git init
npx husky install   // 执行了husky install后就可以添加git hook的对应脚本了。
npm set-script prepare "husky install"
```
运行结果：
```
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
npx husky add .husky/pre-commit "npm run test" // 为指定的git hook创建/添加一命令。会创建.husky/pre-commit文件。
git add .
git commit -m 'str' // 测试pre-commit绑定的脚本。
### 在package.json中设置husky
```
{
    "husky": {
        "hooks": {
            "pre-commit": "echo string",
            "commit-msg": "commitlint -E $HUSKY_GIT_PARAMS",
            "pre-push": "echo push string"
        }
    },
    ...
}
```
通过HUSKY_GIT_PARAMS传递参数，-E|--env用于指向相关的编辑文件。

## yarn 2
...

## recipes
可以与多包管理工具一起使用，如`lerna`。

### 安装到指定目录
```
// package.json
{
    "script": {
        "prepare": "husky install .config/husky"
        // 若与.git文件所在的目录不同，则需要设置为如下：
        // "prepare": "cd .. && husky install front/.husky"
        // 同时需要改变执行脚本时的目录到相应的目录。如：
        // cd front
        ...
    }
    ...
}
```

### bypass hooks


# api
只有4个方法。
install(dir = '.husky')
    要求已经使用git且。
    创建使用husky的环境：生成`.husky`。

set(file, cmd) 
    file: 与git hook同名。
    cmd:  npm的脚本。
    当执行git hook时执行对应的脚本。

add(file, cmd)
    为指定的git hook添加指定脚本。

uninstall()
    执行git config --unset core.hooksPath
    好像是删除所有的git hook对应的npm脚本。

# principle

# 疑问
.husky 是做什么的
