class Person {
    constructor (name) {
        this.name = name
    }
    hi () {
        return `${this.name}: hi`
    }
}

let p = new Person('tony')
console.log(p.hi())