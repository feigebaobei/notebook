Boolean
Number
String
Array
```
let list: number[] = [1,2,3]
```
Tuple
```
let x: [string, number]
x = ['hi', 10]
```
Enum
```
enum Color {
  Red,
  Green,
  Blue
}
```
Unknown
可以是任意类型。
```
let notSure: unknown = 4;
notSure = 'hi'
notSure = true
```
Any
void
Null & Undefined
Never
Object
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

demo
```
function reverseStr(s: string): string {
  return s.split('').reverse().join('')
}
let reverseStr = (s: string): string => s.split('').reverse().join('')
```

