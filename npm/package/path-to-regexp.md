# 介绍

把纯文本转化为正则表达式。

# install

`npm i path-to-regexp`

# usage

```
const { pathToRegexp, match, parse, compile } = require('path-to-regexp')

// pathToRegexp(path, keys?, opts)
// match(path)
// parse(path)
// compile(path)
```
path: String, Array[String], regexp
keys: 由需要在path中发现的key组成的数组。
opts: {
  sensitive: Boolean false
                      true 大小写敏感
  strict: Boolean false
                  true 允许跟踪定位符匹配
  end: Boolean true 匹配字符串的末尾
                false
  start: Boolean true 匹配字符串的开头
                  false
  delimiter: 默认使用定位符分隔
  endsWith: 可选项 Array[String] | String 以什么红结尾
  encode: 在插入regexp之前编码string的方法。
  prefixes: Array[String] | String ./ 在解析的时候自动包含前缀。
}

# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
# 介绍
