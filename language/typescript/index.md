# typescript

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

```
|-----------------------------------------------|
|   typescript                                  |
|                                               |
|   |-----------------------------------------| |
|   |  es2016                                 | |
|   |                                         | |
|   |    |----------------------------------| | |
|   |    |  es2015                          | | |
|   |    |                                  | | |
|   |    |    |---------------------------| | | |
|   |    |    |  es5                      | | | |
|   |    |    |                           | | | |
|   |    |    |---------------------------| | | |
|   |    |----------------------------------| | |
|   |-----------------------------------------| |
|-----------------------------------------------|
```

## typescript是什么

| TypeScript | JavaScript |
|-|-|
|JavaScript的超集用于解决大型项目的代码复杂性|一种脚本语言，用于创建动态网页|
|可以在编译期间发现并纠正错误|作为一种解释型语言，只能在运行时发现错误|
|强类型，支持静态和动态类型|弱类型，没有静态类型选项|
|最终被编译成JavaScript代码，使浏览器可以理解|可以直接在浏览器中使用|
|支持模块、泛型和接口|不支持模块，泛型或接口|
|社区的支持仍在增长，而且还不是很大|大量的社区支持以及大量文档和解决问题的支持|

### 安装typescript

```
npm i -g typescript
tsc -v
Version 4.0.2
```

若不想安装typescript，可以使用[typescript playground](https://www.typescriptlang.org/play)

### 工作流程

```
   ts          js            js           browser
        编译          打包           部署
      -------->   -------->     -------->
   a.ts       a.js
   b.ts       b.js          main.js        main.js
   c.ts       c.js
```
即使编译出错，也会生成编译结果。（ts=>js）

### 初体验

```
// hello.ts
function greet(person: string) {
  return 'Hello, ' + person;
}
console.log(greet("TypeScript"));

// hello.js
"use strict";
function greet(person) {
  return 'Hello, ' + person;
}
console.log(greet("TypeScript"));
```
person 参数的类型信息在编译后被擦除了。

## typescript基础类型

any
number
string
boolean
数组
元组
枚举
void
null
undefined
never

### Boolean

let isDone: boolean = false
var k: string

### Number

let count: number = 10

|属性||||
|-|-|-|-|
|MAX_VALUE||||
|MIN_VALUE||||
|NaN||||
|NEGATIVE_INFINITY||||
|POSITIVE_INFINITY||||
|prototype||||
|constructor||||

### String

let name: string = "sem"

### Symbol

const sym = Symbol(); let obj = {[sym]: "sem"}; console.log(obj[sym])

### Array

let list: number[] = [1, 2, 3]; let list: Array<number> = [1, 2, 3]

### Enum

enum Direction {NORTH, SOURTH, EAST, WEST}; let dir: Direction = Direction.NORTH;
默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。

```
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
```
```
// 也可以设置初始值
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
```
字符串枚举
```
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```
```
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```
支持反向映射
```
let dirName = Direction[0] // "NORTH"
let dirVal = Direction["NORTH"] // 0
```
常量枚举
异构枚举
数字、字符串的混合。
```
enum Enum {
  A,
  B,
  C = "C",
  D = "C",
  E = 8,
  F,
}
```
```
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```
### Any
任何类型,是一种顶级类型。any 可在any类型上访问任意属性、方法。若求声明类型，则被识别为any型。
```
let notSure: any = 66
notSure = 'stri'
notSure = true
```
### Unknown
不知道类型,是一种顶级类型。
可以对unknown变量赋值，不能把unknown变量赋值给其他类型的变量。
```
let value: unknown
value = true
value = 42
value = 'str'
value = []
value = {}
value = Math.random
value = null
value = undefined
value = new TypeError()
value = Symbol("type")
```
### Tuple
元组。在“数组”中保存不同类型的值。可用于定义具有有限数量的未命名属性的类型。
使用时必须保存元组内有下标、类型一致。
不可越界。

```
let t: [string, boolean]
t = ['string', true]
```
### Void
表示，没有任何类型。void类型的变量只能被赋值`undefined`/`null`
```
function warnUser(): void {
  console.log('string')
}
```
```
"use strict";
function warnUser() {
  console.log("This is my warning message");
}
```
### Null / Undefined
undefined的类型分别为undefined
null的类型分别为null

### object / Object / {}

object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。
Object 类型：它是所有 Object 类的实例的类型，它由以下两个接口来定义：
object 会定义该对象的结构。多、少都会报错。可修改。

```
// node_modules/typescript/lib/lib.es5.d.ts
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
ObjectConstructor 接口定义了 Object 类的属性。
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  /** Invocation via `new` */
  new(value?: any): Object;
  /** Invocation via function calls */
  (value?: any): any;
  readonly prototype: Object;
  getPrototypeOf(o: any): any;
  // ···
}
declare var Object: ObjectConstructor;
```
{}类型
一个没有成员的对象。
### Never类型
never 类型表示的是那些永不存在的值的类型。
使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。
```
type Foo = string | number;
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

### map

```
var mm = new Map()
var mm = new Map([
  ['k0', 'v0'],
  ['k1', 'v1']
])
```

## 断言
手动指定一个值的类型
### 尖括号语法
```
let sv: any = 'string'
let sl: number = (<sting>sv).length
```
### as语法
```
let sv: any = 'string'
let sl: number = (sv as string).length
```
### 非空断言
x! 将从 x 值域中排除 null 和 undefined 。
```
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```
```
type NumGenerator = () => number;
function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```
我们使用了非空断言，使得 const b: number = a!; 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，! 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 undefined。
要它有什么用？
```
const a: number | undefined = undefined;
const b: number = a!;
console.log(b);
```
```
"use strict";
const a = undefined;
const b = a;
console.log(b);
```
## 类型守卫
类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。
### in关键字
```
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```
### typeof关键字
typeof 类型保护只支持两种形式：typeof v === "typename" 和 typeof v !== "typename"
```
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### instanceof关键字

用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链
`instance instanceof prototype`

```
interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}
class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}
let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

## interface（接口）

它是对行为的抽象，而具体如何行动需要由类去实现。
需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。
它是对行为的抽象，由类实现具体行为。
一般大写。有时有前缀`I`
实现类接口的关键字是implements.

```
interface ClockInterface {
  currentTime:Date;
  setTime(d:Date);
}
class Clock implements ClockInterface {
  currentTime:Date;
  h:number;
  s:number;
  setTime(d:Date) {
    this.currentTime = d;
  }
  constructor(h:number, s:number) {
    this.h = h;
    this.s = s;
  }
  print() { console.log("hello lsw");}
}
var c:Clock = new Clock(10, 100);
c.setTime(new Date());
c.print();
```

### 对象的形状

```
interface Person {
  name: string;
  age: number;
}
let semlinker: Person = {
  name: "semlinker",
  age: 33,
};

interface ages { 
   [index:string]:number 
} 
 
var agelist:ages; 
agelist["John"] = 15   // 正确 
agelist[2] = "nine"   // 错误
```

### 可选|只读属性

TypeScript 还提供了 ReadonlyArray<T> 类型，可以确保数组创建后再也不能被修改。
```
interface Person {
  readonly name: string;
  age?: number;
}
```

### 任意属性
有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。

```
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
const p1 = { name: "semlinker" };
const p2 = { name: "lolo", age: 5 };
const p3 = { name: "kakuqo", sex: 1 }
```
### 接口与类型别名的区别

```
interface Point {
  x: number;
  y: number;
}
interface SetPoint {
  (x: number, y: number): void;
}

type Point = {
  x: number;
  y: number;
};
type SetPoint = (x: number, y: number) => void;

```
### other types

```
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

```
```
```
```
```
```
```
```
```

## 类

移到了./class.md

## 联合类型和类型别名
### 联合类型
类型 A 和类型 B 联合后的类型是同时接受 A 和 B 值的类型。
```
// 1、2 或 'click' 被称为字面量类型，用来约束取值只能是某几个值中的一个。
let num: 1 | 2 = 1;
type EventNames = 'click' | 'scroll' | 'mousemove';
```
### 可辨识联合

TypeScript 可辨识联合（Discriminated Unions）类型，也称为代数数据类型或标签联合类型。它包含 3 个要点：可辨识、联合类型和类型守卫。
```
enum CarTransmission {
  Automatic = 200,
  Manual = 300
}
interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}
interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission
}
interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}
```

### 联合类型

```
type Vehicle = Motorcycle | Car | Truck;
```

### 类型守卫

### Unknown
### Unknown
### 类型别名

### Unknown
### Unknown
## tsc
### options

||||
|-|-|-|
|--help|显示帮助信息||
|--module|载入扩展模块||
|--target|设置ecma版本||
|--declaration|额外生成一个.d.ts文件。它是声明文件。||
|--removeComments|删除注释||
|--out|把多个文件合并到一个文件。||
|--sourcemap|生成一个sourcemap文件||
|--module nolmpliciAny|在表达式和声明上有隐含的any类型时报错。||
|--watch|在监视模式下运行编译器。当文件改变时重新编译。||

## 书写规范

TypeScript 会忽略程序中出现的空格、制表符和换行符。
区分大小写
分号可选
```
//
/*  */
```

## 命名空间

```
namespace SomeNameSpaceName {
  // 需要使用export显露出想要在外部调用的方法、类、属性。
  export interface ISomeInterfaceName {}
  export class SomeClassName {}
}
namespace Drawing {
  export interface IShape {
    draw()
  }
}
```

使用///引用。

### 嵌套全名空间

```
// invoice.ts
namespace N1 {
  export namespace N2 {
    export class C {...}
  }
}
// invoiceTest.ts
/// <reference path = "invoice.ts" />
var invoice = new N1.N2.C()
```

## 模块

模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。
使用export / import(require) 导出、导入。
别的模块加载器是node.js的commonjs和web应用中的require.js

```
// someInterface.ts
export interface SomeInterface {...}

// otherFile.js
import someInterfaceRef = require("./someInterface.ts")
```

转化为js会使用defind。

## 泛型

使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

```
// 泛型的语法
function fn<T> (arg: T) :T {
  return arg
}
// demo
class Collection<T> {
  private _things: T[]
  constructor () {
    this._things = []
  }
  add(param: T): void {
    this._things.push(param)
  }
  get(index: number): T {
    return this._things[index]
  }
}
let strs = new Collection<string>()
strs.add()



let f1: <U> (arg: U) => U = fn
```

## 声明文件

声明文件：包含声明语言的文件。
为了使用“代码补全”、“接口提示”。
为了让编辑器知道某变量、方法、类……是什么。
文件名：`*.d.ts`
放置位置：
- 编辑`*.d.ts`并在`package.json`中的`types`字段指向`*.d.ts`。
- 发布`@types/xxx`。

```
// demo
// 定义
declare var jQeury: (selector: string) => any;
// 使用
jQuery('#foo')
```
### 全局变量
- 自己编写。一般放在`src/`下。再在tsconfig.json中设置include/file/exclude。
- `npm i @types/xxx -D`   // 推荐
- 
```
declare let a: string
declare function fn(a: string): any
declare class A {
    name: string;
    constructor(name: string) {...};
    sayHi(): string
}
declare enum D {
    Up,
    Down
}
declare namespace jQuery {
    function ajax(url: string, setting?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
// interface / type 可不写declare
interface A {
    method?: 'GET' | 'POST',
}
type A {
    a: string
}
// 为防止命名冲突，最好放在namespace下
declare namespace ns {
    interface A {...}
    type B {...}
}
// 重复声明不会被合并。
declare function jQuery(a: string): any
declare namespace jQuery{
    function ajax(u: string): void;
}
```
namespace是ts为了解决模块化，创建的关键字。在es6前namespace是module。在es6后是namespace。可嵌套。

```
declare var jQuery: (selector: string) => any
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
声明文件以 .d.ts 为后缀。

```
// 引入声明文件
/// <reference path = "filename.d.ts" />
```
## 内置对象
ts中有好多已经内置的js对象。
```
// js对象
Boolean
Error
...
// dom/bom
Document
HTMLElement
Event
NodeList
// ts的核心库
// 使用ts写node
npm i @types/node -D
```

## 函数
```
function sum(x, y) {
    return x + y
}
function sum(x: number, y: number): number {
    return x + y
}
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}
interface Sf {
    (a: string, b: string): boolean
}
let sf: Sf
sf = function (x: string, y: string) {          // 使用接口定义函数
    return x.search(b) !== -1
}
function sum(a: number, b: number, c?: number) {...}  // 可选参数必须在最后
function sum(a: number = 0, b: number) {...}     // 参数的默认值
function sum(a: number, ...items: any[]) {...}   // 剩余参数
function sum(a: number): number
function sum(a: string): string
function sum(a: string | number): number | string {...} // 重载
```

## 别名
```
type newName = string;
```

## 类和接口
```
// 实现
interface F {
    alert(): void;
}
class A extends B implements F {
    alert () {
        console.log('alert')
    }
}
interface E {...}
interface G {...}
class C implements F, E, G {
    ...
}
// 接口继承接口
interface A {...}
interface B extends A {...}
// 接口继承类
// 在声明class P时，创建了P类，也创建了P类型的接口。
class P {...}
interface A extends P {...} // 实际上继承P类型的接口。
```

## 泛型
泛型是类型的变量。即：用变量表示类型。
```
// demo 1
function f<T>(l: number, v: T): Array<T> {
    let result: T[] = Array.from({length: l}).map(item => item = v)
    return results
}
// demo 2
function f<U, T>(tuple: [U, T]): [T, U] {
    return [tuple[1], tuple[0]]
}
// demo 3 泛型之间有结束
function f<T extends U, U>(a: T, b: U): T {...}
```
方法名后面的`<T>` / `<U, T>`   表示该方法中会用到1个（或2个）泛型数据。在此声明后，才能在后面使用（参数中使用、返回值中使用）。
参数中`v: T`                  表示该参数是`T`代表的类型。
返回值中`Array<T>`            表示返回结果是`T`组成的数组。
```
// 在接口内的属性、方法中使用泛型。
interface C {
    <T>(l: number, v: T): Array<T>
}
let ca: C
ca = function<T>(l: number, v: T): Array<T> {...}
// 在接口名中使用泛型。则该接口中的属性、方法都可以使用该泛型。
interface C<T> {
    <l: number, v: T>: Array<T>
}
// 泛型类
class A<T> {
    name: T;
    f: (x: T, y: T) => T
}
// 泛型的默认值
function f<T = string>(l: number, v: T): Array<T> {...}
```

## 为什么使用ts
- 代码检测，在编译时发现错误。
  - 用于发现代码错误，统一代码风格。
  - ts关注重点是检查类型，
  - eslint是检查错误。统一风格。
- 可配置编译选项。


