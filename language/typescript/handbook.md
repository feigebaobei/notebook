# handbook
## the handbook

文档很简单。它每天为很多程序员提供服务。

1. 学习基本语法、格式。
2. 解释重要的编译选项。
3. 正确预言行为
4. 为function/object/class生成.d.ts文件。

## the handbook reference

# basicTypes
## Boolean
## Number
## String
## Array
```
let list: number[] = [1,2,3]
```
## Tuple
```
let x: [string, number]
x = ['hi', 10]
```
## Enum
```
enum Color {
  Red,
  Green,
  Blue
}
```
## Unknown
可以是任意类型。
```
let notSure: unknown = 4;
notSure = 'hi'
notSure = true
```
## Any
## Void
## Null & Undefined
## Never
## Object
非原始类型。类似`Object.create`
type assertions
trust me, I know what I’m doing.
```
// as-syntax
let someValue: unknown = 'str'
let strLength: number = (someValue as string).length
// angle-bracket
let someValue: unknown = 'str'
let strLength: number = (<string>someValue).length
```
## demo
```
function reverseStr(s: string): string {
  return s.split('').reverse().join('')
}
let reverseStr = (s: string): string => s.split('').reverse().join('')
```

# interfaces

ts的核心是类型检测。interface就是定义一种类型。它会定义变量应该有哪些属性。

```
interface LabeledValue {
  lable: string // 最普通的
}
function printLabel(labeledObj: LabeledValue): void {
  console.log(labedObj.lable)
}
printLabel({size: 10, label: 'str'})
```

接口会要求object必须有指定的属性、类型。

```
interface infObj {
  baseProp: string;
  a: number[];
  color?: string; // 可选属性
  readonly x: number; // 只读属性
  [propName: string]: any // 任意数量的key为string，value为any的属性。
   // 该属性的类型应该包括其他属性的类型
  [index: number]: string; // 对数组下标进行约束
  [index: string]: string; // 对对象属性进行约束
}

// 函数接口
interface func {
  (p: string, q: number): boolean
}
let fn: func = function(p, q) {
  ...
  return true
}

// indexable Types
interface StringArray {
  [index: string]: string
  // 当把key设置为number时，js会以把它轮换为string。
}
let mya: StringArray;

// class types
// static & instance of class

// extending interface
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number
}
let square = {} as Square
square.color = 'blue'
square.sideLength = 10
interface Square extends Shape, PenStroke {...} // 可继承多个接口

// hybrid types
既可以定义为object也可以定义为function
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = function (start: number) {} as Counter
  counter.interval = 123;
  counter.reset = function () {}
  return counter
}
let c = getCounter()
c(10)
c.interval = 12
c.reset()
// interface extending class
```

## base usage
## optional properties

# functions

```
// typing the function
function add(x: number, y: number): number {
  return x + y
}
let ma = function (x: number, y: number): number {
  return x + y
}
// writing the function type
// 使用全方法型
let ma: (x: number, h: number) => number = function (x: number, y: number): number {return x + y}
// optional and default parameters
// 一般放在必要参数的后面。
// 若放在要前面或中间则在使用时需要设置为undefined
function f(a: string, b?: number, c='str') {...}
// rest parameters
function f(a: string, ...b: string[]): string {...}
// this
function时，this方法所在上下文。
=>      时，方法所在的对象所在的上下文。
// overloads
function f(x: {a: string, b: number}[]): boolean;
function f(x: string[]): string
function f(x: number): number {
  // 判断参数后分别执行。
  ...
}
```

# literal types

逐个类型。我把它理解为枚举。
常用于限定可选范围。

```
type Easing = "ease-in" | "ease-out" | "ease-in-out" // Easing必须是这三个值。
// 用于overload
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLImageElement;
function createElement(tagName: string): HTMLImageElement {...}
// 可枚举类型
function rollDice(): 1|2|3|4|5|6 {...}
// boolean literal types
interface ValidationSuccess {
  isValid: true;
  reason: null;
}
interface ValidationFailure {
  isValid: false;
  reason: string;
}
type ValidationResult = ValidationSuccess | ValidationFailure // 其类型是二者之一。
```

# unions and intersection types

unions type 与联合可选值很像。
```
function f(a: string | number) {}
// union with common field
把我个interface的交集属性联合起来
interface Bird {
  fly(): void;
  layEggs():void;
}
interface Fish {
  swim(): void;
  layEggs(): void
}
declare function getSmallPet(): Fish | Bird // 只有layEggs方法。
```
```
type NetworkLoadingState = {
  state: "loading";
}
type NetworkFailedState = {
  state: "failed";
  code: number;
}
type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  }
}
type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState
```
联合类型是由多种类型组成的。在实际运行时只能是其中一种类型。当不确定是否是指定类型时，不能使用该类型下的方法。

```
// intersection types
interface ErrorHandling {
  success: boolean;
  error?: {message: string}
}
interface ArtworksData {
  artworks: {title: string}[];
}
type ArtworksResponse = ArtworksData & ErrorHandling
```
# classes
# enums
# generics
# tsconfig reference

一般在root目录下。tsconfig.json/jsconfig.json。
用于定义typescript处理ts文件的配置项。

# title
# title
