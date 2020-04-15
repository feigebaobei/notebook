# randombytes

randombytes来自工作在浏览器中的node。在node里你可以使用`crypto.randomBytes`，但是在浏览器中需要使用`crypto/msCrypto.getRandomValues`。

```
const randomBytes = crypto.randomBytes
// var randomBytes = require('randomBytes')
randomBytes(16) // get 16 random bytes
randomBytes(16, function (err, resp) {
  // resp is 16 random bytes
  })
```