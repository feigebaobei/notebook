#jQuery validate
这篇文章就介绍怎么使用validete。

##简介
1. 用于表单验证。
2. 支持37种语言。
3. jquery开发团队成员之一开发的。

##使用
使用有2种方式。  

1. 使用属性验证  
2. 使用脚本验证。  

*tip*我更喜欢使用脚本验证。
###使用属性验证

1. 引入

    > jquery,  
    jquery.validata.js  
    汉语提示信息包  

1. 安规范编写html。  

####html  

    <form class="cmxform" id="commentForm" method="get" action="">
      <fieldset>
        <legend>输入您的名字，邮箱，URL，备注。</legend>
        <p>
          <label for="cname">Name (必需, 最小两个字母)</label>
          <input id="cname" name="name" minlength="2" type="text" required>
        </p>
        <p>
          <label for="cemail">E-Mail (必需)</label>
          <input id="cemail" type="email" name="email" required>
        </p>
        <p>
          <label for="curl">URL (可选)</label>
          <input id="curl" type="url" name="url">
        </p>
        <p>
          <label for="ccomment">备注 (必需)</label>
          <textarea id="ccomment" name="comment" required></textarea>
        </p>
        <p>
          <input class="submit" type="submit" value="Submit">
        </p>
      </fieldset>
    </form>

####js  

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>

###使用脚本验证

1. 引入

    > jquery,  
    jquery.validata.js  
    汉语提示信息包  

1. 安规范编写html。  
2. 编写脚本。  

####html  

    <form action="#" id="addMethod">
      <div>
        <label for="name">name</label>
        <input type="text" id="name" name="name">
      </div>
      <button type="submit">submit</button>
    </form>

####js  

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
    <script>
        $(function () {
            $('#addMethod').validate({
                rules: {
                    name: 'required',
                },
                submitHandler: function (form) {
                    form.submit() // submit 方式提交
                    $(form).ajaxSubmit() // ajax 方式提交
                }
            })
        })
    </script>

##api

    $('#form').validate({
        rules: {// 验证方法
            name0: 'method', // name0: 表单元素的name属性。method: 验证方法。
            name1: {// 使用多种验证方法。
                method0: true,
                method1: true
            }
        },
        messages: {// 自定义提示信息
            name0: "string", // 
            name1: {
                method0: "string",// 验证不通过时的提示信息
                method1: "string1"// 验证不通过时的提示信息
            }
        },
        debug: true, // 只验证，不提交。
        submitHandler: function (form) {
            // form: html元素,当前表单。
            $(form).ajaxSubmit(); // 必须手动提交
        },
        ignore: '.class', // 指定忽略验证内容
        groups: {// 成组验证
            // 几个元素的验证信息用一个错误提示。
            username: "name0 name1", // 几个name之间用空格隔开
        },
        onsubmit: boolean, // 是否在提交时验证
        onfocusout: boolean,
        onkeyup: boolean,
        onclick: boolean, // 一般用于checkbox, radiobox
        focusInvalid: boolean,// 是否自动获得焦点
        focusCleanup: boolean, // 错误元素获得焦点时是否移除提示
        errorClass: 'string', // 为错误元素添加的类。默认为"error"
        errorElement: 'html tag', // 使用什么标签记错
        wrapper: 'html tag', // 使用什么标签包裹errorElement
        errorLabelContainer: 'selector', // selector对象，eg: "#id"。把错误信息放在什么元素内。
        showErrors: function (errorMap, errorList) { // 处理错误信息
            // code
        },
        errorPlacement: function (error, element) {// 常用于把错误信息放在哪里。
            // error: 错误提示信息。
            // element: 出错误的元素。
        },
        success: 'class'|fn, // class: 为通过验证的元素添加的类。fn($errorTip, elementDom): 当前验证元素通过验证后执行的函数。
        highlight: '' // 我不知道。
    })

###验证规则（rules）

|名称|返回类型|描述|
|-|-|-|
|required()|boolean|验证必填|
|required(expression)|boolean|-|
|required(callback)|boolean|-|
|remote(url)|boolean|是否发起远程校验。url指向一个远程服务器。|
|minlength(length)|boolean|设置最小长度|
|maxlength|boolean|设置最大长度|
|ranglength([min, max])|boolean|设置一个长度范围|
|min(value)|boolean|设置最小值|
|max(value)|boolean|设置最大值|
|email()|boolean|验证电子邮箱格式|
|range([min, max])|boolean|值的范围|
|url()|boolean|验证url格式|
|date()|boolean|验证日期格式|
|dateISO()|boolean|验证ISO类型的日期格式|
|dateDE()|boolean|验证德式日期格式（29.04.1994）|
|number()|boolean|验证十进制数字|
|digits()|boolean|验证整数|
|creditcard()|boolean|验证信用卡号|
|accept(extension)|boolean|验证相同后缀名的字符串|
|equalTo(other)|boolean|验证两个输入框的内容是否相同|
|phoneUS()|boolean|验证美式的电话号码|

###validator对象
对$('#form')使用validator后会返回一个validator对象。  
validator对象的方法  

|名称|返回类型|描述|
|-|-|-|
|form()|boolean|验证form是否成功|
|element(element)|boolean|验证单个元素是否成功|
|resetForm()|-|重置|
|showError(error)|-|显示特定的错误信息|

###validator函数
|名称|返回类型|描述|
|-|-|-|
|setDefaults(defaults)|-|改变默认设置|
|addMethod(name, fn, message|-|添加新的验证方法|
|addClassRules(name, rules)|-||
|addClassRules(rules)|-||

###添加验证方法
####定义
    $.validator.addMethod('methodname', function (value, element, params) {
        // value: 当前验证元素的值。
        // element: 当着验证元素。
        // params: 自定义参数
        
    }, "messages")
####使用
    $('#form').validate({
        rules: {
            name: {
                required: true,
                methodname: true, //methodname 验证的名字
            }
        }
    })

##注意事项：
这些注意事项都是他不完美的地方。  

1. 必须写规范的html。例：把input元素放在form里面。
2. 不可出现太多递归。当前form只操作当前form的内容，不要操作别的form。
3. rules使用需验证元素的name值。

##积累的验证方法：

    <!-- 邮政验证 -->
    $.validator.addMethod('isZipCode', function (value, element) {
        // console.log(value)
        // console.log(element)
        var tel = /^[0-9]{6}$/
        // console.log(this)
        // console.log(this.optional(element))
        // console.log(tel.test(value))
        // return this.optional(element) || tel.test(value)
        return tel.test(value)
    }, '请正确填写您的邮政编码')
    <!-- 座机号码验证 -->
    $.validator.addMethod('specialPhoneZH', function (value, element) {
        var tel = /^8[0-9]{7}$/
        return tel.test(value)
    }, '请输入正确的座机号码')
    <!-- 手机号码验证 -->
    $.validator.addMethod('phoneZH', function (value, element) {
        var tel = /^1[3|5|6|8|]\d{9}$/
        return tel.test(value)
    }, "请正确的手机号码")
    <!-- ip验证 -->
    $.validator.addMethod('ip', function (value, elemnet) {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      return reg.test(value);
    })
    <!-- port验证 -->
    $.validator.addMethod('port', function (value, elemnet) {
      var reg =  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      return reg.test(value);
    })

---
2018/03/31 by stone





















