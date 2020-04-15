# bn.js

不支持小数。

## install
`npm i bn.js`

## usage

```
const BN = require('bn.js')
var a = new BN('deed', 16) // 按照16进制生成big number
var b = new BN('101010', 2)
var res = a.add(b)
console.log(res.toString(10)) // 57047
```

## natation

### prefixes

There are several prefixes to instructions that affect the way the work. Here is the list of them in the order of appearance in the function name:

i - perform operation in-place, storing the result in the host object (on which the method was invoked). Might be used to avoid number allocation costs
在本地执行操作，保存在调用该方法的对象里。可以减少分配内存的花销。
u - unsigned, ignore the sign of operands when performing operation, or always return positive value. Second case applies to reduction operations like mod(). In such cases if the result will be negative - modulo will be added to the result to make it positive
无符号，在执行操作时忽略操作数的符号，或者总是返回正的值。第二种情况适用于mod()之类的约简操作。在这种情况下，如果结果是负的，则在结果中加入模使其为正。

### postfixes

n - the argument of the function must be a plain JavaScript Number. Decimals are not supported.
这个方法的参数必须是纯js数字。不支持小数。
rn - both argument and return value of the function are plain JavaScript Numbers. Decimals are not supported.
该方法的参数、返回值都是纯js数字。不支持小数。

### example

a.iadd(b) - perform addition on a and b, storing the result in a
执行a+b后保存在a里。
a.umod(b) - reduce a modulo b, returning positive value
趋势为减小的操作：a%b。把返回一个正数。
`d*n-|a|=结果 d*(n-1)<a<=d*n`
a.iushln(13) - shift bits of a left by 13
左移13bits

## instructions

### utilities (实用)

|||
|-|-|
|a.clone()||
|a.toString(base, length)||
|a.toNumber()||
|a.toJSON()||
|a.toArray(endian, length)||
|a.toArrayLike(type, endian, length)||
|a.toBuffer(endian, length)||
|a.bitLength()||
|a.zeroBits()||
|a.byteLength()||
|a.inNeg()||
|a.isEven()||
|a.isOdd()||
|a.isZero()||
|a.cmp(b)|比较a/b。若a>b，则返回1，若a=b，则返回0。若`a<b`，则返回-1.|
|a.lt(b)||
|a.lte(b)||
|a.gt(b)||
|a.gte(b)||
|a.eq(b)||
|a.toTwos(width)||
|a.fromTwos(width)||
|BN.isBN(object)||
|BN.max(a,b)||
|BN.min(a,b)||

### arithmetics

|||
|-|-|
|a.neg()||
|a.abs()||
|a.add(b)||
|a.sub(b)|a-b|
|a.mul(b)||
|a.sqr()||
|a.pow(b)||
|a.div(b)|a/b||
|a.mod(b)||
|a.divRound(b)||

### bit operations

|||
|-|-|
|a.or(b)||
|a.and(b)||
|a.xor(b)||
|a.setn(b)||
|a.shln(b)||
|a.shrn(b)||
|a.testn(b)||
|a.maskn(b)||
|a.bincn(b)||
|a.notn(w)||

### reducion

|||
|-|-|
|a.gcd(b)||
|a.egcd(b)||
|a.invm(b)||

## fash reduction

当大量执行相同模的减少操作时，最好使用一些技巧。像在操作蒙哥马利乘法(montgomery multiplication)，或为梅森素数(mersenne prime)使用特殊算法时。

### reduction context （减少操作的环境）

在使用技巧前需要创建一个减少操作的环境。
```
// no.1
var red = BN.red(num)
  // num是一个BN数。
// no.2
var red = BN.red(primeName)
  // 'k256'/'p224'/'p192'/'p25519'
// no.3
var red = BN.mont(num)
```
使用蒙哥马利技巧做减少操作。运行速度：`.red(num)>.mont()>.BN.red(primeName)`。

### converting numbers

有下列情况之一者。先把大数转换为red再执行减少操作。
- 把一个大数转换为red.
- 在red中操作。
- 从red中转换出一个大数。

```
var redA = a.toRed(red) // 把一个大数转换为red。
var a = redA.fromRed() // 从red环境中转换出大数。
```

### red instruction

||||
|-|-|-|
|a.redAdd(b)|||
|a.redIAdd(b)|||
|a.redSub(b)|||
|a.redISub(b)|||
|a.redShl(num)|||
|a.redMul(b)|||
|a.redIMul(b)|||
|a.redSqr()|||
|a.redISqr()|||
|a.redSqrt()|||
|a.redInvm()|||
|a.redNeg()|||
|a.redPow(b)|||

### Number size

为了优化椭圆曲线的工作，使用了256-bit的数字。这些数字没有大小限制。

### 梅森素数

- `k256`
- `p224`
- `p192`
- `p25519`


## 梅森素数

s^p-1,p为素数，记作Mp。