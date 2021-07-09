# overview
> chai提供了三种接口
- assert 断言 tdd   先写测试代码再写逻辑代码
- expect      bdd  使用行为、规范来驱动开发
- should      bdd

# assert

## usage
```
var assert = require('chai').assert
// ... other code
assert.typeof(foo, 'string') // 断言foo是否是string类型
assert.equal(foo, 'value')   // 断言foo的值是否是'value'
assert.<api>(params...)
```

## api
`assert(expression, message)`
expression 断言表达式
message    断言失败是显示的提示信息

`assert.fail([msg])`
`assert.fail(actual, expected, [msg], [operator])`
actual      实际值
expect      期望值
msg         断言失败时的提示信息
operator    actual与expect之间的操作符
手动触发一个断言失败。

`assert.isOk(obj, [msg])`
obj是否为真值

`assert.isNotOk(obj, [msg])`
xxx

`assert.equal(actual, expect, [msg])`
==

`assert.notEqual(actual, expect, [msg])`
!=

`assert.strictEqual(actual, expected, [msg])`
`===`

`assert.notStrictEqual(actual, expected, [msg])`
!==

`assert.deepEqual(actual, expected, [msg])`
深度相等
用于判断2个对象是否相等。

`assert.notDeepEqual(actual, expected, [msg])`
不是深度相等

`assert.isAbove(a, e, [msg])`
xxx

`assert.isAtLeast(a, e, [msg])`
xxx

`assert.isBelow(a, e, [msg])`
xxx

`assert.isAtMost(a, e, [msg])`
xxx

`assert.isTrue(a, [msg])`
断言实际值是否是true

`assert.isNotTrue(a, [msg])`
`assert.isFalse(a, [msg])`
`assert.isNotFalse(a, [msg])`
`assert.isNull(a, [msg])`
`assert.isNotNull(a, [msg])`
`assert.isNaN(a, [msg])`
`assert.isNotNaN(a, [msg])`
`assert.exists(a, [msg])`
断言是否存在。
不是null/undefined

`assert.notExists(a, [msg])`
`assert.isUndefined(a, [msg])`
`assert.isDefined(a, [msg])`
不是undefined

`assert.isFunction(a, [msg])`
`assert.isNotFunction(a, [msg])`
`assert.isObject(a, [msg])`
`assert.isNotObject(a, [msg])`
`assert.isArray(a, [msg])`
`assert.isNotArray(a, [msg])`
`assert.isString(a, [msg])`
`assert.isNotString(a, [msg])`
`assert.isNumber(a, [msg])`
`assert.isNotNumber(a, [msg])`
`assert.isFinite(a, [msg])`
是一个数字且是无限值。

`assert.isBoolean(a, [msg])`
`assert.isNotBoolena(a, [msg])`
`assert.typeOf(a, name, [msg])`
a        actual 实际值
name     Object.prototype.toString的值
如`assert.typeOf({}, 'object', 'msg')`
如`assert.typeOf([], 'array', 'msg')`

`assert.notTypeOf(a, name, [msg])`
`assert.instanceOf(obj, constructor, [msg])`
obj
constructor   构造者
断言obj的构造者是否是constructor

`assert.notInstanceOf(o, c, [msg])`
`assert.include(haystack, needle, [msg])`
断言haystack中是否包含needle.

`assert.notInclude(haystack, needle, [msg])`
`assert.deepInclude(haystack, needle, [msg])`
是否深度包含。

`assert.notDeepInclude(haystack, needle, [msg])`
`assert.nestedInclude(haystack, needle, [msg])`
`assert.notNestedInclude(haystack, needle, [msg])`
`assert.deepNestedInclude(haystack, needle[msg])`
`assert.notDeepNestedInclude(haystack, needle[msg])`
`assert.ownInclude(h, n, [msg])`
`assert.notOwnInclude(h, n, [msg])`
`assert.deepOwnInclude(h, n, [msg])`
`assert.notDeepOwnInclude(h, n, [msg])`
`assert.match(a, r, [msg])`
r  正则
a是否符合r。

`assert.notMatch(a, r, [msg])`
`assert.property(o, p, [msg])`
o中是否包含、继承p属性。

`assert.notProperty(o, p, [msg])`
`assert.propertyVal(o, p, v, [msg])`
o.p的值是否是v.

`assert.notPropertyVal(o, p, v, [msg])`
`assert.deepPropertyVal(o, p, v, [msg])`
o.p的值是否深度相等于v.

`assert.notDeepPropertyVal(o, p, v, [msg])`
o.p的值是否不是深度相等于v.

`assert.nestedProperty(o, p, [msg])`
是否存在嵌套的属性o.p

`assert.notNestedProperty(o, p, [msg])`
`assert.nestedPropertyVal(o, p, v[msg])`
`assert.notNestedPropertyVal(o, p, v, [msg])`
`assert.deepNestedPropertyVal(o, p, v, [msg])`
`assert.notDeepNestedPropertyVal(o, p, v, [msg])`
`assert.lengthOf(o, l, [msg])`
o的长度是否等于l

`assert.hasAnyKeys(o, [k], [msg])`
断言o中是否至少有一个`[k]`中的值为key。

`assert.hasAllKeys(o, [k], [msg])`
`assert.containsAllKeys(o, [k], [msg])`
`assert.doesNotHaveAnyKeys(o, [k], [msg])`
`assert.doesNotHaveAllKeys(o, [k], [msg])`
`assert.hasAnyDeepKeys(o, [k], [msg])`
`assert.hasAllDeepKeys(o, [k], [msg])`
`assert.containsAllDeepKeys(o, [k], [msg])`
`assert.doesNotHaveAnyDeepKeys(o, [k], [msg])`
`assert.doesNotHaveAllDeepKeys(o, [k], [msg])`
`assert.throws(fn, [errorLike/string/regexp], [string/regexp], [msg])`
不会，好像断言fn会抛出error

`assert.doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [msg])`
`assert.operator(v1, operator, v2, [msg])`
与assert.fail()很相似，但是参数顺序不同。这该包的不足。

`assert.closeTo(a, e, delta, [msg])`
断言a在e的+-delta内。

`assert.approximately(a, e, delta, [msg])`
`assert.sameMembers(set1, set2, [msg])`
`assert.notSameMember(set1, set2, [msg])`
`assert.sameDeepMembers(set1, set2, [msg])`
`assert.notSameDeepMember(set1, set2, [msg])`
`assert.sameOrderedMember(set1, set2, [msg])`
`assert.notSameOrderedMember(set1, set2, [msg])`
`assert.sameDeepOrderedMembers(s1, s2, [msg])`
`assert.notSameDeepOrderedMember(s1, s2, [msg])`
`assert.includeMembers(superset, subset, [msg])`
`assert.notIncludeMembers(superset, subset, [msg])`
`assert.includeDeepMembers(superset, subset, [msg])`
`assert.notIncludeDeepMembers(superset, subset, [msg])`
`assert.includeOrderedMembers(superset, subset, [msg])`
`assert.notIncludeOrderedMembers(superset, subset, [msg])`
`assert.includeDeepOrderedMembers(superset, subset, [msg])`
`assert.notIncludeDeepOrderedMembers(superset, subset, [msg])`
`assert.oneOf(inList, list, [msg])`
`assert.changes(fn, obj, property, [msg])`
断言fn会修改obj.property的值。

`assert.changesBy(fn, o, p, delta, [msg])`
`assert.doesNotChange(fn, o, p, [msg])`
`assert.changesButNotBy(fn, o, p, delta, [msg])`
`assert.increases(fn, o, p, [msg])`
`assert.increasesBy(fn, o, p, delta, [msg])`
`assert.doesNotIncrease(fn, o, p, [msg])`
`assert.increasesButNotBy(fn, o, p, delta, [msg])`
`assert.decrease(fn, o, p, [msg])`
断言fn会让o.p的值变小。

`assert.decreaseBy(fn, o, p, delta, [msg])`
`assert.doesNotDecrease(fn, o, p, [msg])`
`assert.doesNotDecreaseBy(fn, o, p, delta, [msg])`
`assert.descreasesButNotBy(fn, o, p, delta, [msg])`
`assert.ifError(obj)`
`assert.isExtensible(obj)`
`assert.isNotExtensible(obj)`
`assert.isSealed(obj)`
`assert.isNotSealed(obj)`
`assert.isFrozen(obj)`
`assert.isNotFrozen(obj)`
`assert.isEmpty(obj)`
`assert.isNotEmpty(obj)`

# expect / should
## 支持链式调用
- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same
- but
- does
- still
- also
它们没有实际逻辑，只是为了接近自然语言。
我反对这种做法。它让代码多了一些不必要的关键字。无用的便是有害的。

## usage
`expect(p).<api>`
```
expect(function () {}).not.throw()
```

## api
`expect(p).not.xx`
`expect(p).deep.xx`
`expect(p).nested.xx`
`expect(p).own.xx`
`expect(p).ordered.xx`
`expect(p).any.xx`
`expect(p).all.xx`
`expect(p).a(type, [msg]).xx`
断言目标的类型等于type.

`expect(p).include(val, [msg]).xx`
`expect(p).ok.xx`
断言是真值

`expect(p).true.xx`
target===true

`expect(p).false.xx`
`expect(p).null.xx`
`expect(p).undefined.xx`
`expect(p).NaN.xx`
`expect(p).exist.xx`
`expect(p).empty.xx`
`expect(p).arguments.xx`
`expect(p).equal(val, [msg]).xx`
`expect(p).eql(obj, [msg]).xx`
断言深度等于。

`expect(p).above(n, [msg]).xx`
`expect(p).least(n, [msg]).xx`
`expect(p).below(n, [msg]).xx`
`expect(p).most(n, [msg]).xx`
`expect(p).within(start, finish, [msg]).xx`
`expect(p).property(name, [val, [msg]]).xx`
`expect(p).ownPropertyDescriptor(name[, desciptor[, msg]]).xx`
`expect(p).lengthOf(n[, msg]).xx`
`expect(p).match(re[, msg]).xx`
`expect(p).string(str[, msg]).xx`
`expect(p).keys(k1[, k2[, ...]]).xx`
`expect(p).throw([errorLike], [errMsgMatcher], [msg]).xx`
`expect(p).respondTo(method[, msg]).xx`
`expect(p).itself.xx`
`expect(p).satisfy(matcher[, msg]).xx`
`expect(p).closeTo(expected, delta[, msg]).xx`
`expect(p).members(set[, msg]).xx`
`expect(p).oneOf(list[, msg]).xx`
`expect(p).change(subject[, prop[, msg]]).xx`
`expect(p).increase(subject[, prop[, msg]]).xx`
`expect(p).decrease(subject[, prop[, msg]]).xx`
`expect(p).by(delta[, msg]).xx`
`expect(p).extensible.xx`
`expect(p).sealed.xx`
`expect(p).frozen.xx`
`expect(p).finite.xx`
`expect(p).fail([msg]).xx`
`expect(p).fail(a, e, [msg], [operator]).xx`
