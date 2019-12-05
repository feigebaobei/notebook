# instruction

1. 观察者模式。提供多对一的依赖。
2. iterable模式。迭代流式编程。
3. 函数式编程模式。

# install

```
npm i rxjs // rxjs v6
// 当下最新版本是v7
```

# usage

```
import {range} from 'rxjs'
import {map, filter} from 'rxjs/operators'
range(1, 100).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x))
  .subscribe(x => console.log(x))
```