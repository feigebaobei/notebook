# the ts handbook

## 1qaz2wsx

# basic type
# interface
# functions

```
let ma: (b: number, i: number) => number = function (x: number, y: number): number {
  ...
  return x + y
}
```

# literal types

逐个类型。
常用于限定可选范围。

```
type Easing = "ease-in" | "ease-out" | "ease-in-out"
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
type ValidationResult = ValidationSuccess | ValidationFailure
```

# unions adn intersection types

unions type 与联合可选值很像。
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


