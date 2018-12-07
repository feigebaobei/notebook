#pjax

![](./image/pjax/pjax.png)  

需要前后端通信的header部分添加一个共识的字段（一般为X_PJAX）。  
例：  

    // 前端
    $.ajax({
        url: "/path",
        data: {},
        dataType: 'html', // pjax请求到的数据类型是html
        header: {
            X_PJAX: true
        },
        success: function () {}, 
        error: function () {}
    })

    // 后端
    function is_pjax() {
        return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'] === 'true';
    }

教程链接

|||
|-|-|
|welefen|https://github.com/welefen/pjax|
|jquery-pjax|https://github.com/defunkt/jquery-pjax|  