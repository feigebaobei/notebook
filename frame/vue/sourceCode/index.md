# overview
root目录下有rollup.config.js说明用到了rollup打包。
有tsconfig.json说明用到了ts语言。
查看package.json后，得知：
- 此项目是"一包多库"项目。子包在root/packages里。
- 脚本在root/scripts里

# 打包配置文件
vue3.0使用rollup打包。打包配置在`<root>/rollup.config.js`。
入口是各子包的src/runtime.ts或src/index.ts。
出口由各子包的package.json里的buildOptions字段控制。

# 各子包在同级同名文件中

# global.d.ts
里面定义了好多变量。在其他子包中被使用。如：
__DEV__
__BROWSER__
__ESM_BUNDLER_
__GLOBAL__