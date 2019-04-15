#require.js

##为什么使用require.js

1. 因插件之间的可能有信赖，所以必须依次加载。  

##可以解决的问题

1. 异步加载js文件。  
2. 模块化管理js文件。  

##加载require

    <script src="./js/require.js" defer async=true></script>
    // defer / async="true" 都是标明异步加载的。
    // ie 只支持 defer
    // 其它浏览器支持 async="true"

## 指定主模块

    <script src="./js/require.js" defer async=true data-main="js/main"></script>
    // data-main 指定主模块的path。可以省略ext.  

## 主模块写法

    // main.js
    require.config({
        /* 若引入的插件不是amd规范,则需要shim start */
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'], // 当前插件依赖的插件
                exports: 'Backbone' // 输出的名称
            }
        },
        /* 若引入的插件不是amd规范,则需要shim end */
        baseUrl: 'js/lib', // 相对于main.js的基本路径
        paths: {
            'jquery': 'jquery.min', // 可省略ext
            'underscore': 'underscore.min',
            'backbone': 'https://www.xxx.xxx.min'
        }
    })
    require(['moduleA', 'moduleB', 'moduleC'], (moduleA, moduleB, moduleC) => {
        // ...
    })

## 自定义amd规范的文件

    // math.js
    define(
        /* 若当前文件需要依赖三方文件时,使用数组形式引入 start */
        ['moduleA', 'moduleB'],
        /* 若当前文件需要依赖三方文件时,使用数组形式引入 end */
        const foo = () => {
            // ...
        }
        return {
            foo: foo
        }
    )