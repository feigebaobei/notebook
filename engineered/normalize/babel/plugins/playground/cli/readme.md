本示例展示：如何使用babel的命令行。

步骤：
- npm init
- npm i -D @babel/cli @babel/core @babel/preset-env
- mkdir src
- 创建`<root>/src/index.js`
- npm setscript build 'babel src -d lib'
- npm run build
- 创建`<root>/lib/index.html`。里面的script标签是程序员写的。
