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

## introduction

永远不会出错，可以分享代码到全世界。使用'package.json'描述当前包。

## install

```
// 方法一
brew install yarn
// 方法二
npm i -g yarn

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
     up // 缩写
yarn set version latest
yarn set version from sources

yarn remove [package]

yarn // 安装项目的全部依赖
<=> yarn install
```

|commands|commands||||
|-|-|-|-|-|
|help|||||
|init|||||
|intall|或省略||||
|add||yarn add [package]@[version]|||
||||||
||||||
||||||
||||||