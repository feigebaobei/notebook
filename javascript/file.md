## File

file对象是文件对象。  
File对象是基于Blob类型的对象。也有人说成：file对象是特殊类型的blob.
在`<input>`dom对象的files属性可以得到。`input.files`

### 构造函数

`new File(bits, name[, options])`
bits : file对象的数据。（array/blob/domstring）
name : file对象的name值。  
options: type MIME类型，lastModified 最后修改的时间值（unix时间戳）

### 属性

lastModified // 最后一次修改时间
name // 
size //
type // MIME 类型
webkitRelativePath 

### 方法。
file 没有方法。有一个从blob继承来的方法——slice.
使用这个方法得到是blob对象。

    var file = new File([1, 2, 3, 4, 5], 'fromFuture', {type: 'text/javascript'})
    var flag = file.slice(1, 3) // Blob {size: 2, type: ''}

## FileList

    document.querySelector('#inputFile').files
