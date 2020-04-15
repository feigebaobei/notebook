# md5

a JavaScript function for hashing messages with MD5.

## Installation

```
npm install md5
```

## API

```
md5(message)
```
message -- String or Buffer
returns String

## Usage

```
var md5 = require('md5');
console.log(md5('message')); // 78e731027d8fd50ed642340b7c9a63b3

// It supports buffers, too
var fs = require('fs');
var md5 = require('md5');
fs.readFile('example.txt', function(err, buf) {
  console.log(md5(buf));
});
```