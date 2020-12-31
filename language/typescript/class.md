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

### 修饰符

```
class Animal {
  public name: string;
  public constructor(theName: string) {this.name = theName}
  public move(d: number) {
    console.log(`${this.name} moved ${d}`)
  }
  // 默认是public 公开的，                              可被实例化，可被继承。
  // private     私有的。 只能在当前类中使用。            不被实例化，不被继承。
  // protected   受保护的。在当前类、子类中可访问。        不被实例化，可被继承。
  // readonly    只读的。 在声明是使用，在构造函数中初始化。可被实例化，可被继承。
  // get / set   存取描述符。分别对应2个方法
  // static      静态属性。需要使用类名访问。如Animal.age 可被实例化，可被继承。
}
```

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

### 抽象类


使用 abstract 关键字声明的类，我们称之为抽象类。抽象类不能被实例化，因为它里面包含一个或多个抽象方法。所谓的抽象方法，是指不包含具体实现的方法。
只要有抽象方法的类都是抽象类。抽象类需要使用`abstract`修饰。
抽象类的子类的实例不能调用抽象类中未定义的方法。（虽然可以定义）。

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
