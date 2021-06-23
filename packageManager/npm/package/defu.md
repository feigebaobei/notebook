defu.md
# overview
快速分配默认属性。

# install
`npm i defu`

# usage
`const options = defu(object, ...default)`
设置新对象的默认值是default，然后被object覆盖。
default部分的参数，靠前的优先。然后被object覆盖。
不改变object/...default.返回新对象。

# api
## defu.extend((obj, key, currentValue, _namespace) => {})
自定义合并方法。
`defu.extend(fn)`该fn是`(obj, key, vulue) => boolean`。obj是源对象。key、value是obj的各kv。若返回true，则合并。否则不合并。
## defu.fn()

## defu.arrayFn((obj, key, currentValue, _namespace) => {})


# principle
好多库都说自己快。这个库也这么说。也没见过谁说自己慢的。都快了，还能看得到谁快么。
源码中用到高阶函数处理。