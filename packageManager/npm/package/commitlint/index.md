commitlint
# overview
规范全团队commit message.
# install
`npm i -g @commitlint/cli @commitlint/config-conventional`

# usage
## configure
`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`
也可以定义在`.commitlint.js`/`.commitlintrc.json`/`commitlintrc.yml`/`commitlint/package.json`
## install husky
```
npm i husky
npx husky install
npx husky add .husky/commit-msg 'npx --no-intsll commitlint --edit $1' // 添加钩子。
```
# api
# principle

  "workspaces": [
    "@alias/*",
    "@commitlint/*",
    "@packages/*"
  ],




  