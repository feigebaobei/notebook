## Install

`npm install xxtea`

## Usage

```
var xxtea = require('xxtea');
var pass  = 'password';
// to encrypt
var encrypted = xxtea.encrypt('data to encrypt', pass);
// to decrypt
var decrypted = xxtea.decrypt(encrypted, pass);
```

## API

decrypt(string, password)
  string - required - the data to be decrypted.
  password - required - the password to be used in decryption.
encrypt(string, password)
  string - required - the data to be encrypted.
  password - required - the password to be used in encryption.