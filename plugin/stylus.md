#stylus

这是受到sass的鼓舞，新做的一个css预处理工具。  

##install 

    npm i stylus -g

##简单用法

|||||
|-|-|-|-|
|nesting||||
|flexible||||
|parent reference||||
|mixins||||
|variable|可以不使用$/@|||
|取属性值|使用@|||
|iteration||||
|interpolation||||
|operators||||
|sprintf||把格式数据写成串||
|color operation||||
|functions||||
|color bifs||||
|comments|/**/ //|||
|hashes||||
|impore|引入文件，可出现多次。|||
|require|引入文件，只能出现一次。|||
|支持css rules|@viewport @page @host @supports @block @css|||
|中间件||||
|||||
|||||
|||||
|||||
|||||
|||||

eg:  

    // mixins
    var (val)
        color: val
    .box
        var(red)
    // variable
    #id
        width: w = 200px
        margin-left: -(w / 2)
    // 取属性值
    #id
        width: 200px
        margin-left:-(@width / 2)
    // interpolation
    vendors = webkit moz o ms official
    var ()
        for vendor in vendors
            if vendor == official
                border-radius: arguments
            else
                -{vendor}-border-radius: arguments
    #id
        var: 5px
    // sprintf
    body
        foo: '%s / %s' %(5px 10px)
    body {
        foo: 5px / 10px;
    }
    // functions
    sum(nums...)
        n = 0
        n += num for num in nums
    body
        foo: sum(1, 2, 3)
    body {
        foo: 6;
    }


###nib 

它是一个stylus的扩展工具。  

##思考

结合前两天学习的less/sass。做一个对比。  
这三个css预处理工具都很强大。各有侧重。若要选择哪个一种做为项目开发的工具。我建议中小型项目用哪个都行。非要从长远角度考虑请选择sass/stylus。若是大型项目。我也不知道。（我都没做过大型项目）  
做大型项目也有一个文法。所有的大型项目都是由小部分组成的。我们把每个小部分做好就能把整个大项目做好。  


||less|sass|stylus|
|-|-|-|-|
|操作选择器|Y|Y|Y|
|操作color|Y|Y|Y|
|变量|Y|Y|Y|
|嵌套|Y|Y|Y|
|混合|Y|Y|Y|
|继承|Y|Y|Y|
|缓存|Y|Y|Y|
|独立文件的变量是否在会覆盖|Y|N||
|样式合并|Y|Y|Y|
|map|Y|Y|它有别名系统和map差不多|
|命令行|Y|Y|Y|
|脚本引用|Y|Y|Y|
|是否install方便|Y|Y|Y|
|css/scss/sass/less之间转换||||
|迭代|Y|Y|Y|
|原码地图|Y|Y|Y|  

---
2018/12/20 by stone