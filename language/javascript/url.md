## url

`new URL(host[, path])`
host: 主域名。  
path: 路径，默认为''  

    new URL('https://baidu.com', '/docs') // https://baidu.com/docs
    // path 可以不用/开头

### 属性

href
protocol
host
hostname
port
pathname
search
hash
username
password
origin
searchParams


### 方法

`URL.createObjectURL(obj)` // 把一个资源转化为一个指向这个资源的url。
`window.URL.createObjectURL(obj)`
obj: file / blob mediasource
return domstring 表示该资源的引用。  
`URL.revokeObjectURL(obj)`
// 同一个obj执行createObjectURL()会得到不同的domString.
// 在使用完url请使用revokeObjectURL()清除内存中的url.  

### 美化input file
隐藏input。在另一个元素上绑定事件（如click）及对应的方法（如fn0）。在该方法内触发input的click事件。  

    // html
    <input type="file" id="inputFile" style="display: none;">
    <button id="bt">select pic</button>
    // js
    var bt = document.querySelector('#bt'),
        inputFile = document.querySelector('#inputFile')
    bt.addEventListener('click', function(e) {
        inputFile.click()
    })

为input绑定label元素。使用label元素触发input（display: none）的click事件。

    // html
    <label for="fileElem">fileElem</label>
    <input type="file" style="display: none;" id="fileElem">

使用拖放的方法，添加文件。  
    
    // js
    var dropbox = document.querySelector('dropbox')
    dropbox.addEventListener('dragenter', enterEvent, false)
    dropbox.addEventListener('dragover', overEvent, false)
    dropbox.addEventListener('drop', dropEvent, false)
    function enterEvent (e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function overEvent (e) {
        e.stopPropagation()
        e.preventDefault()
    }
    function dropEvent (e) {
        e.stopPropagation()
        e.preventDefault()
        var data = e.dataTransfer
        var files = data.files
        // op(files)
    }

在html中写一个img.并设置一个本地图片。
在canvas时渲染出这个图片。
在input type=file中添加从canvas里得到的图片。  

### 编码

encodeURIComponent()
对ascii字母数字编码。不对ascii标点编码。
decodeURIComponent()
encodeURI()
对ascii+特殊字符执行编码。
decodeURI()
