# mongoose

## getting started

先安装好mongodb/nodejs.
再安装mongoose
`npm i mongoose`

在项目引入mongoose，再链接mongodb的实例里的test数据库。

```
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true})

// or
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {...}) // 当建立链接时执行回调方法。
```
在mongoose里，一切都是`Schema`派生出来的。
现在让我们定义并获取kitten的引用。
```
const kittySchema = new mongoose.Schema({
  name: String
})
```
现在我们有一个shcema，它是kittySchema。它有一个属性。这个属性是String类型。
下一步把kittySchema编译到model里。
```
const Kitten = mongoose.model('Kitten', kittySchema)
```
在文档中Kitten具有相同的属性、行为。现在使用kitten
```
const silence = new Kitten({name: 'Silence'})
console.log(silence.name) // Silence
```
再为silence定义行为
```
kittySchema.methods.speak = function () { // 注意这里使用了methods
  const greeting = this.name ? 'Meow name is ' + this.name : 'I don\'t have a name'
  console.log(greeting)
}
const Kitten = mongoose.model('Kitten', kittySchema)
```
在methods属性里添加的方法会编译到model里。
```
const fluffy = new Kitten({name: 'fluffy'})
fluffy.speak() // 'Meow name is fluffy'
```
现在可以把创建好的Kitten的实例保存在mongodb里了。
```
fluffy.save((err, fluffy) => {
  if (err) return console.error(err)
  fluffy.speak()
  })
```
每一个实例都可以使用`save()`方法保存在mongodb实例里。
我们在上面已经创建了很多Kitten的实例。现在使用Kitten model获取所有实例。
```
Kitten.find(function (err, kittens) {
  if (err) return console.error(err)
  console.log(kittens)
})
```
若想找到指定的Kitten实例，可以使用mongoose的querying语法。
```
Kitten.find({name: /^fluff/}, (err, kittens) => {
  // kittens array
  })
```

### tip
schema是用于构造model的。
model是用于构造文档的类的。

objectid is a 12 byte field:
timestamp(4)machineId(3)proc.id(2)increment(3)
id.getTimestamp()





