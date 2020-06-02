# multer

它是基于`busboy`开发的、使用`multipart/form-data`上传文件的、node环境的中间件。

## install

```
npm i multer
```

## usage

`multer`会在`request`对象添加`body`/`file/files`。body里包含表单中的文本字段。file/files里包含表单中的上传的文件。

```
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>

// node
var express = require('express')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var app = express()
app.post('/profile', upload.single('avatar'), function(req, res, nexy) {
  // req.file = avatar
  // req.body = test field
})
app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
  // req.files is array of 'photos' files
  // req.body ....
})
var cpUpload = upload.fields([{name: 'avatar', maxCount: 1}, {name: 'gallery', maxCount: 8}])
app.post('/cool-profile', cpUpload, (req, res, next) => {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  })
```

若需要设置为只有文本字段的表单，则应该使用`.none()`

```
var multer = require('multer')
var upload = multer()
app.post('/profile', upload.none(), (req, res, next) => {
  // req.body
  })
```

## api

### 文件信息

|key|description|note|
|-|-|-|
|filedname|表单中的字段名||
|originalname|文件在用户电脑上的名字||
|encoding|文件的编码类型||
|mimetype|文件的mime类型||
|size|文件的大小（byte）||
|destination|保存文件的目录||
|filename|保存文件的文件名||
|path|保存文件的全路径||
|buffer|整个文件的buffer||

### multer(opts)

一般最少有一个`dest`。它用来指明保存文件的目录。若不设置该属性，则保存在内存中永远不写入硬盘中。
为了避免文件冲突，默认对文件重命名。

|options|description||
|dest / storage|||
|fileFilter|||
|limits|||
|preservePath|||

#### .single(fieldname)

只接收一个指定字段名的文件，且保存在`req.file`。

#### .array(fieldname[, maxCount])

设置可以接收的字段名的文件，相应的最大数量由`maxCount`控制。保存在`req.files`。

#### .fields(fields)

设置可以接收的字段名的文件，也有相应的最大数量。
```
multer.upload([{
  name: 'avatar', maxCount: 1
  }, {
    name: 'gallery', maxCount: 8
    }])
```

#### .none()

不接收文件，只接收文本字段。

#### .any()

可以接收任意文件。保存在`req.files`。这样比较危险。

#### .diskStorage(opts)

disk storage提供了全部的把文件保存在硬盘的方法。

```
var upload = multer({
  storage: multer.diskStorage({
    // 决定文件保存在哪个目录。
    destinamtion: function (req, file, cb) {
      cb( null, '/tmp/my-uploads')
    },
    // 决定文件保存为什么名字
    filename: function (req, file, cb) {
      cb(null, file,fieldname + '-' + Date.now())
    }
    })
  })
```

#### .memoryStorage()

在内存中以buffer的形式保存文件。文件信息中的`buffer`字段保存着整个文件。
当文件比较小时，使用此方法可以加快运行速度。若文件比较大，就比较危险。

```
var upload = multer({storage: multer.memoryStorage()})
```

#### limites

一个对象有下列大小限制的属性。multer会把这些属性传给busboy。关于它们的更详细信息可以查看busboy。

||||
|-|-|-|
|fieldNameSize|||
|fieldSize|||
|fileSize|||
|files|||
|parts|||
|headerPairs|||

#### fileFilter

控制文件应该被上传还是被跳过。

```
function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  // To reject this file pass `false`, like so:
  cb(null, false)
  // To accept the file pass `true`, like so:
  cb(null, true)
  // You can always pass an error if something goes wrong:
  cb(new Error('I don\'t have a clue!'))
}
```

### 控制错误

可以使用`MulterError`类捕获error。
```
var multer = require('multer')
var upload = multer().single('avatar')

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //
    } else if (err) {
      //
    }
    })
  })
```
