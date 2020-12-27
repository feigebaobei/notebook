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
任何类型,是一种顶级类型。
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
```
let t: [string, boolean]
t = ['string', true]
```
### Void
表示，没有任何类型。
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
## typescript接口（interface）

它是对行为的抽象，而具体如何行动需要由类去实现。
需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。

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

使用extends去继承。`class Child extends Parent {}`
可以多重继承。
不能继承多个父类。

### 类的属性与方法
通过 Class 关键字来定义一个类：
```
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  // 成员即实例的属性。需要明确定义类型。
  greeting: string;
  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }
  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }
  // 成员方法
  // 可以标明返回的类型
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("world");
```
### 私有字段

私有字段以 # 字符开头，有时我们称之为私有名称；同private的功能一样。
每个私有字段名称都唯一地限定于其包含的类；
不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
私有字段不能在包含的类之外访问，甚至不能被检测到。
```
class Person {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
let semlinker = new Person("Semlinker");
```
### 访问器

在 TypeScript 中，我们可以通过 getter 和 setter 方法来实现数据的封装和有效性校验，防止出现异常数据。
```
let passcode = "Hello TypeScript";
class Employee {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (passcode && passcode == "Hello TypeScript") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee = new Employee();
employee.fullName = "Semlinker";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

### 联合类型
### 继承

通过 extends 关键字来实现继承：

```
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
let sam = new Snake("Sammy the Python");
sam.move();
```

子类继承后可重写祖先类的方法、属性。

### static

用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。

### 访问控制修饰符

public    默认   任何地方都可被访问
protected 受保存 可以被其自身以及其子类和父类访问。
                访问控制修饰符 protected 可使类的属性、方法可被该类和其子类（不是实例）在类中访问。不参被实例得到。
private   私有   只能被其定义所在的类访问。
readonly  只读   不能被修改。可以被继承 但是继承后的实例还是不能修改只读成员。

```
class Animal {
　　protected name: string;

　　constructor(theName: string) {
　　　　this.name = theName;
　　}
}

class Rhino extends Animal {
    constructor() {
          super('Rhino');
    }         
    getName() {
        console.log(this.name) //此处的name就是Animal类中的name
    }
}
```
构造函数也可以被标记为protected。这意味着这个类不能再包含它的类外被实例化，但是能被继承，也就是可以在派生类中被super执行。

### 抽象类

使用 abstract 关键字声明的类，我们称之为抽象类。抽象类不能被实例化，因为它里面包含一个或多个抽象方法。所谓的抽象方法，是指不包含具体实现的方法：
抽象类: abstract 修饰， 里面可以没有抽象方法。但有抽象方法(abstract method)的类必须声明为抽象类(abstract class)


```
abstract class Person {
  constructor(public name: string){}
  abstract say(words: string) :void; // 只定义不实现
  run () { // 它把run方法实现了，所以不是抽象方法。
    console.log('run')
  }
}
// Cannot create an instance of an abstract class.(2511)
const lolo = new Person(); // Error
```
抽象类不能被直接实例化，我们只能实例化实现了所有抽象方法的子类。具体如下所示：
```
abstract class Person {
  constructor(public name: string){}
  // 抽象方法
  abstract say(words: string) :void;
}
class Developer extends Person {
  constructor(name: string) {
    super(name);
  }
  say(words: string): void {
    console.log(`${this.name} says ${words}`);
  }
}
const lolo = new Developer("lolo");
lolo.say("I love ts!"); // lolo says I love ts!
```

### 多态

在一个抽象类是定义抽象方法。在其子类中实现该抽象方法，则该方法是是多态方法。

### 方法重载

1. 在同一个类中；
2. 方法名相同；
3. 参数列表不同；

```
class ProductService {
  // 先声明需要重载的方法。不实现方法。
  getProducts(): void;
  getProducts(id: number): void;
  // 在这里实现
  getProducts(id?: number) {
    if(typeof id === 'number') {
        console.log(`获取id为 ${id} 的产品信息`);
    } else {
        console.log(`获取所有的产品信息`);
    }
  }
}
const productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息
```
### 联合类型


### 联合类型
### 联合类型
### 联合类型
```
```


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

虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。

```
declare var jQuery: (selector: string) => any
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
声明文件以 .d.ts 为后缀。

```
// 引入声明文件
/// <reference path = "filename.d.ts" />
```


```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```







