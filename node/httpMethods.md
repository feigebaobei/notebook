# get/post/put/delete的区别

这四种请求方式都是经常用到的。有自个适合的使用情况。

get/delete分别是得到数据和删除数据。
请求数据一般使用get.若请求的数据不是敏感数据，后端就直接给前端了。若是敏感数据，后端做一个请求者是否有权限的验证，再分别处理是否给前端数据。
删除数据的操作比较危险。都需要验证是否有权限删除该数据，再执行删除操作。即使开始执行删除操作也是使用软删除，一段时间后再删除数据。
post/put区分没有上面2个简单。一般模糊在它们都可以修改数据。
它们的区别在于是否等幂。

> 等幂：若输入相同的参数执行任意次结果相同，则为等幂操作。

put是等幂操作。post是不等幂操作。所以post方式每执行一次会增加一条数据。put是在已经存在的数据上进行修改。也就是说post一般用于增加数据。put用于修改已有数据。若非要使用post执行一个等幂操作，也可以实现。但是与语义不符。
