# ramda.js  

一个函数式编程插件库。  
函数在最前面，数据在最后面。  

## install

    npm i ramda
    const R = require('ramda')
    <script src="/path/to/ramda.js"></script>

## usage

    import * as R from 'ramda'
    const {identity} = R
    R.map(identity, [1, 2, 3])

    import identity from 'ramda/src/identity'
    identity

## api

|关键字|说明|example||
|-|-|-|-|
|add|两数相加
|addIndex|-
|adjust|把指定位置的值修改为指定的值。|R.adjust(1, R.toUpper, ['a', 'b', 'c'])
|all|全部满足时返回true,否则返回false|R.all(fn, arr)
|prop|取出指定对象的指定的属性的值|R.prop('key', {key: 'a'})
|filter|把迭代的元素中筛选出经fn计算后为true的结果|R.filter(fn, enumerable)|
|propEq|String -> a -> Object -> Boolean|R.propEq('key', value)|指定的属性是否是指定的值
|propIs|指定对象的指定的属性是否为指定的值|R.propls(Number, 'key', {key: 2})
|propOr|从指定的非空对象中取出指定的属性的值，否则返回给定的默认值|R.propOr('key')
|map||Function f => (a -> b) -> f a -> f b|R.map(fn, arr)
|allPass|[(*...-> Boolean)] -> (*... -> Boolean)|全部通过验证时返回true,否则返回false
|always|a -> (* -> a)|返回一个返回恒定值的函数
|and|a -> b -> a | b|若2个参数都为true,则返回true,否则返回false
|flip|((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)|交换前2个参数的位置
|lt||R.lt()|若是升序则返回true，否则返回false
|gt|||若是降序则返回true,否则返回false
|lte
|any|用于数组
|anyPass|用于对象
|multiply||2数相乘|
|ap||将函数列表分别作用于值列表上，再合并在一起。
|aperture
|append
|apply|R.apply(Math.max, arr)
|applySpec
|applyTo
|identity
|ascend|升序
|sort|排序
|assoc|浅复制
|assocPath
|binary
|pipe
|tap
|both
|call
|chain
|clamp
|clone
|comparator
|complement
|compose
|composeWith
|concat
|cond
|construct
|constructN
|converge
|countBy
|curry
|curryN
|dec
|defaultTo
|descend
|difference
|differenceWith
|dissoc
|dissocPath
|divide
|drop
|dropLast
|dropLastWhile
|dropRepeats
|dropRepeatsWith
|dropWhile
|either
|empty
|endsWith
|eqBy
|eqProps
|equals
|evolve
|F
|fliter
|find
|findIndex
|findLast
|findLastIndex
|flatten
|forEach
|forEachObjIndexed
|fromPairs
|groupBy
|groupWith
|gt
|gte
|has
|hasIn
|hasPath
|head
|identical
|identity
|ifElse
|inc
|inclueds
|indexBy
|init
|innerJoin
|insert
|insertAll
|intersection
|intersperse
|into
|invert
|invertObj
|invoker
|is
|isEmpty
|isNil
|join
|juxt
|keys
|keysIn
|last
|lastIndexOf
|length
|lens
|lensIndex
|lensPath
|lensProp
|lt
|lte
|map
|map
|match
|max
|maxBy
|mean
|median
|memoizeWith
|mergeAll
|mergeDeepLeft
|mergeDeepRight
|mergeDeepWith
|mergeDeepWithKey
|mergeLeft
|mergeRight
|mergeWith
|mergeWithKey
|min
|minBy
|modulo
|move
|multiply
|nAry
|negate
|none
|not
|nth
|nthArg
|o
|objOf
|of
|omit
|once
|or
|over
|pair
|partial
|partialRight
|partition
|path
|pathEq
|pathOr
|pathSatisfies
|pick
|pickAll
|pickBy
|pipe
|pipeWith
|pluck
|prepend
|product
|project
|prop
|propEq
|propIs
|propOr
|props
|propSatisfies
|range
|reduce
|reduceBy
|reduced
|reduceRight
|reduceWhile
|reject
|remove
|repeat
|replace
|reverse
|set
|slice
|sort
|sortBy
|sortWith
|split
|splitAt
|splitEvery
|splitWhen
|startsWith
|subtract
|sum
|symmetricDifference
|symmetricDifferenceWith
|T
|tail
|take
|takeLast
|takeLastWhile
|takeWhile
|tap
|test
|times
|toLower
|toPairs
|toPairsIn
|toString
|toUpper
|transpose
|trim
|tryCatch
|type
|unary
|uncurryN
|union
|unionWith
|uniq
|uniqBy
|uniqWith
|unless
|unnest
|update
|useWith
|values
|valuesIn
|view
|when
|where
|whereEq
|without
|xprod
|zip
|zipObj
|zipWith
|以下的不会
|ascend
|bind
|composeWith
|construct
|into
|lift
|liftN
|memoizeWith
|mapAccum
|mapAccumRight
|mapObjIndexed
|mathMod
|otherwise
|scan
|sequence
|then
|transduce
|traverse
|unapply
|until
|
|
|
|
|