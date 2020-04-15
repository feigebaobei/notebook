## canvas

`document.querySelector('#canvas')`

### 属性

height // canvas标签的css高度
width // canvas标签的css宽度

### 方法

getContext('experimental-webgl') // 在支持webgl的浏览器中返回`WebGLRenderingContext`对象  
getContext('2d') // 返回`CanvasRenderingContext2D`对象  
toDataURL(type[, quality]) // type: '文件的MIME类型'，默认'image/png'。quality: 0.0-1.0 默认 0.92 返回data: URL
toBlob(callback[, type, encoderOptions]) // callback 回调函数，type: 默认'image/png' 返回在canvas中的图片。由浏览器决定保存在内存还是硬盘。  
mozGetAsFile()
mozFetchAsStream()

## input -> File -> url -> img -> canvas -> url -> img

    // 得到dom
    let input = document.querySelector('#input')
    let file = null
    let fileReader = new FileReader()
    let img = document.querySelector('#img')
    let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')
    let img2 = document.querySelector('#img2')
    // 为input绑定change事件。该事件触发的事件是changeFn
    // input -> file
    let changeFn = (e) => {
        let files = e.target.files // files是类数组对象
        // 在本例中只取第一个file
        let file = files
    }
    // file -> url
    let url = fileReader.readAsDataURL(file)
    // url -> img
    img.src = url
    // img -> canvas
    context.drawImage(img, 0, 0, canvas.width, canvas.height)
    // canvas -> url
    let url2 = canvas.toDataURL()
    // url -> img
    img2.src = url2
