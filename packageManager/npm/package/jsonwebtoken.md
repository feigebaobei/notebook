# jsonwebtoken

An implementation of json web tokens.

## usage

### jwt.sign(payload, secretOrPrivateKey[, options, cb])
异步：回调方法会接收一个错误`error`或者`jwt`。
同步：返回jwt String.
payload只能是可枚举的对象。不能是String/Buffer.若payload不是Buffer/String，则使用JSON.Stringify处理payload.
secretOrPrivateKey 是String/Buffer/Object
options
||default|describe|example|
|-|-|-|-|
|algorithm|HS256|||
|expiresIn|||60(60s), '2 days', '10h', '7d'|
|notBefore|||60(60s), '2 days', '10h', '7d'|
|audience||||
|issuer||||
|jwtid||||
|subject||||
|noTimestamp||||
|header||||
|keyid||||
|mutatePayload||||
|issuer||||

```
const jwt = require('jsonwebtoken')
let token = jwt.sign({foo: 'bar'}, 'shhhh') // 同步
jwt.sign({foo: 'bar'}, privateKey, {algorithm: 'RS256'}, (err, token) => {
  console.log(token)
})
let jwtSign = (payload, privateKey, options) => {
  return new Promise((r, j) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      error ? j(error) : r(token)
    })
  })
}

// 1h过期时间
jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'string'
}, 'secret')
jwt.sign({
  data: 'string'
}, 'secret', {expiresIn: '1h'})
```

### jwt.verify(token, secretOrPublicKey[, options, cb])
异步：若提供了回调方法，则：若解码payload后验证签名有效且在有效期内、audience是正确的、issuer是正确的则触发。若出错则使用error为参数触发该方法。
同步：若提供了回调方法，则：若解码payload后验证签名有效且在有效期内、audience是正确的、issuer是正确的则触发。否则不触发。
secretOrPublicKey是String/Buffer。
options
|||||
|-|-|-|-|
|algorithms||||
|audience||||
|complete||||
|issuer||||
|ignoreExpiration||||
|ignoreNotBefore||||
|subject||||
|clockTolerance||||
|maxAge||||
|clockTimestamp||||
|nonce||||

```
let decoded = jwt.verify(token, 'shhhhh')
jwt.verify(token, 'shhhhh', (err, decoded) => {
  console.log(decoded.foo) // bar
})
try {
  let decoded = jwt.verify(token, 'shhhhh')
} catch(err) {
  ...
}
let cert = fs.readFileSync('public.pem')
jwt.verify(token, cert, (err, decoded) => {...})
jwt.verify(token, cert, {audience: 'urn:foo', ...}, (err, decoded) => {...})
```

### jwt.decode(token[, options])

返回解码后的payload,不验证签名是否有效。
token String
options
|||||
|-|-|-|-|
|json|即使header里不包括'typ':'JWT',也会使用JSON.parse解析payload.|||
|complete|Boolean|是否返回一个完整的、包括解码后的payload和header||

```
let decoded = jwt.decode(token)
let decoded = jwt.decode(token, {complete: true})
// decoded.header
// decoded.payload
```

## Error Codes

### TokenExpiredError
```
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }
    */
  }
});
```
### JsonWebTokenError
```
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
    */
  }
});
```
### NotBeforeError
```
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'NotBeforeError',
        message: 'jwt not active',
        date: 2018-10-04T16:10:44.000Z
      }
    */
  }
});
```

## algorithms supported

||||||
|-|-|-|-|-|
|HS256|HMAC using SHA-256 hash algorithm||||
|HS384|HMAC using SHA-384 hash algorithm||||
|HS512|HMAC using SHA-512 hash algorithm||||
|RS256|RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm||||
|RS384|RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm||||
|RS512|RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm||||
|PS256|RSASSA-PSS using SHA-256 hash algorithm (only node ^6.12.0 OR >=8.0.0)||||
|PS384|RSASSA-PSS using SHA-384 hash algorithm (only node ^6.12.0 OR >=8.0.0)||||
|PS512|RSASSA-PSS using SHA-512 hash algorithm (only node ^6.12.0 OR >=8.0.0)||||
|ES256|ECDSA using P-256 curve and SHA-256 hash algorithm||||
|ES384|ECDSA using P-384 curve and SHA-384 hash algorithm||||
|ES512|ECDSA using P-521 curve and SHA-512 hash algorithm||||

