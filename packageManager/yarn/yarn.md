|npm|yarn|
|-|-|
| npm i | yarn |
| npm i react --save | yarn add react |
| npm uninstall react --save | yarn remove react |
| npm i react --save-dev | yarn add react --dev |
| npm update --save | yarn upgrade |

yarn的出现是为了解决npm的缺点。（比如：慢。）
npm在5.0后有了很大改善。

# yarn

包管理工具。

## install

```
brew install yarn
// upgrade
brew upgrade yarn
yarn --version
```

## usage

```
yarn init
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

yarn add [package] --dev
yarn add [package] --peer // 对应peerDependencies
yarn add [package] --optional // 对应optionalDependencies

yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

yarn remove [package]

yarn // 安装项目的全部依赖
<=> yarn install
```