## DataTransfer

在执行拖放操作时`DataTransfer`用来保存拖动到浏览器的数据（一项、多项、一种、多种）。不能使用代码创建，只能使用拖放生成。  

### 属性

dropEffect

### 方法

## 拖放

draggable 是否可拖动

true
false
auto

链接、图片默认可拖动。  

Blob
  new Blob(data, option)
  otherBlob.slice(start, end)
  canvas.toBlob((blob) => {...})
  blob.size
  blob.type
  blob.slice(start, end)

File
  基于Blob.
  input.files
  new File(bits, name[, options])
  file.name
  file.size
  file.type
  file.lastModified
  file.slice(star, end) 返回blob对象

FileList
  input.files

URL
  URL / window.URL
  new URL(host[, path])
  url.href
  url.host
  url.protocol
  url.hostname
  url.port
  url.pathname
  url.search
  url.hash
  url.username
  url.password
  url.origin
  url.searchParams
  URL.createObjectURL(obj)
  URL.revokeObjectURL(url)

FileReader
  new FileReader()
  error
  readyState
  result
  onabort
  onerror
  onload
  onloadstart
  onloadend
  onprogress
  fileReader.obert()
  fileReader.readAsArrayBuffer(blob)
  fileReader.readAsBinaryString(blob)
  fileReader.readAsDataURL(blob)
  fileReader.readAsText(blob)

canvas
  width
  height
  canvas.getContext('2d')
  canvas.getContext('experimental-webgl')
  canvas.toDataURL(type[, quality])
  canvas.toBlob(callback[, type, quality])

URL.createObjectURL(obj)
URL.revokeObjectURL(url)  
fileReader.readAsDataURL(blob)
canvas.toDataURL(type[, quality])  

取图片的url时 fileReader.readAsDataURL(blob)
取canvas里的资源做为url时 canvas.toDataURL(blob => {}, type, quality)
其它情况 URL.creatObjectURL(obj) URL.revokeObjectURL(url)
