# packages/shared
Internal utility functions and constants shared across `@vue` packages.

## shared/src/index.ts
从兄弟文件中引入并输出。
定义了好多基本方法。

## shared/src/makeMap.ts
定义一个对象，为指定的key设置true.
再返回一个取指定key的方法。
我在想为什么不Array#includes(key)。可能因不好删除。但是我没看到删除。

## shared/src/patchFlags.ts
只定义了2套k/v。

## shared/src/ShapeFlags.ts
只定义shape的k/v。使用位运算。

## shared/src/slotFlags.ts
定义slot的标记。

## shared/src/globalsWhiteList.ts
## shared/src/normalizeStyle.ts
parseStringStyle
经过split后，再经过组成k/v。后返回。
normalizeStyle
调用parseStringStyle后再组成对象后返回。
stringifyStyle
把合法的style转换为string
normalizeClass
转换为string

## shared/src/domTagConfig.ts
isHTMLTag
isSVGTag
isVoidTag

## shared/src/domAttrConfig.ts
spcicalBooleanAttrs
isBooleanAttr
isSSRSafeAttrName
isNoUnitNumericStyleProp
isKnownAttr

## shared/src/escapeHtml.ts
处理逃逸字符。

## shared/src/looseEqual.ts
我不喜欢循环引用。此文件中用过循环引用。
looseEqual
是否相等。
looseIndexOf
找到第一个相等的元素。
looseCompareArrays
每个元素是否相等。

## shared/src/toDisplayString.ts
处理为string
