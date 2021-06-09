# overview
本文只说明git commit时的备注的规范。
使用`husky`/`commitlint`从技术上要求规范备注。

# install
`npm i husky @commitlint/cli @commitlint/config-conventional`

# usage
```
// init
mkdir proj-name
cd proj-name
npm init -y
npm i husky @commitlint/cli @commitlint/config-conventional
git init
// 设置脚本
// npm set-script prepare "husky install"
// npm run prepare // 是否可省？
npx husky install
npm set-script commit-msg "commitlint -e \$HUSKY_GIT_PARAMS" // 设置执行检查的脚本。本行代码是使用终端命令的方式设置npm script的。也可以直接在packages.json中的script字段中添加"commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
npx husky set .husky/commit-msg "npm run commit-msg" // set命令是为指定文件设置指定npm script. add命令是为指定文件添加指定npm script
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js // echo "string" > file.ext 表示把指定字符串输出到指定文件。
// 检查/使用
git add .
// git commit -m 'string' // 报错误
git commit -m 'chore(proj-name): init'
```

# api

# principle
我可以搞懂`husky`的使用方法，但是搞不懂`commitlint`的使用方法。以上内容是我看官网/源码/网友blog后总结出来的。

# 吐槽
官网都写不清楚用法。