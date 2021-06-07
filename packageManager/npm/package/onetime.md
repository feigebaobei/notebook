# overview
确保方法只执行一次。
若多次执行，则返回第一次执行的结果。
与`once` 模块不同。本包不是调皮的/是基于`Function.prototype`扩展的。

# install
`npm i onetime`

# usage
```
import onetime from 'onetime';

let index = 0;

const foo = onetime(() => ++index);

foo(); //=> 1
foo(); //=> 1
foo(); //=> 1

onetime.callCount(foo); //=> 3
```

# api
onetime(fn, options?) 返回一个人只能行一次的方法。
    fn
    options               该对象只能设置一个属性。
        throw: boolean 
onetime.callCount(fn) 返回指定方法的对应的方法的调用次数。
    fn

# principle
初始化时使用map对象以方法名这key，以方法为值记录。
onetime.callCount(fn)返回该方法被调用的次数。

定义callCount，在每次执行onetime(fn, options)返回的方法时加1.
若callCount !== 1 && options.throw 则返回error对象。
