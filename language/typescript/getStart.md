# overview
官网说了很多种擅长不同语言的入门教程。读者捡自己擅长的入门即可。

# start in 5 min
```
npm i  -g typescript
tsc -v
```

## usage
`greeter.ts`
```
class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}
interface Person {
  firstName: string;
  lastName: string;
}
function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
```
执行编译
```
tsc greeter.ts
```
得到编译结果
`greeter.js`
```
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
```
