#Object
##Object.assign(target, ...sources)
把一个或多个源对象复制到目标对象。并返回目标对象。简单理解为合并对象。  
`Object.assign()`是浅拷贝。只复制一层，剩下的只复制指针。  
**深拷贝：**  
把对象转为字符串，再把字符串转为对象，再赋给变量。  

	// Deep Clone
	obj1 = { a: 0 , b: { c: 0}};
	let obj3 = JSON.parse(JSON.stringify(obj1));
	obj1.a = 4;
	obj1.b.c = 4;
	console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

