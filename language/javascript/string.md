#string
处理文本（字符串）

##创建

    var a = new String();
    var b = String();

##属性
**constructor** 对创建该对象的方法的引用  

**length** 返回当前字符串的长度  
    
    a = “Try the demo below to see what we mean.”
    var num0 = a.length // 39

**prototype** 允许向对象添加属性和方法  

##方法
**anchor(anchorname)** 为字符串添加一个锚。并返回这个字符串。  
anchorname: 锚的名字。

    var baidu = 'baidu'
    var link = baidu.anchor(link) // <a name="link">baidu</a>

**big()** 用`<big>`包裹字符串。并返回这个字符串。  

    var big = baidu.big() // <big>baidu</big>

**blink()** 用`<blink>`包裹字符串。并返回这个字符串。  

    var blink = baidu.blink() // <blink>baidu</blink>

**bold()** 用`<b>`包裹字符串。并返回这个字符串。  

    var bold = baidu.bold() // <b>baidu</b>

**small()** 用`<small>`包裹字符串。并返回这个字符串。  

    var small = baidu.small() // <small>baidu</small>

**charAt(index)** 返回字符串中下标为index的字符。  
index: 必填，指定下标位置。

    var num1 = baidu.charAt(3) // d

**charCodeAt(index)** 返回查询到的字符的Unicode编码。  
index: 必填，

    var code0 = baidu.charCodeAt(2) // 105

**concat(str0, str1, ...)** 把str0,str1,...依次连接起来并返回这个字符串。  
str0: 必填，
str1: 必填，

    var c = baidu.concat(link, big) // baidu<a name="baidu">baidu</a><big>baidu</big>

**fixed()** 用`<tt>`包裹字符串。并返回这个字符串。  

    var tt = baidu.fixed() // <tt>baidu</tt>

**fontcolor("color")** 用`<font>`包裹字符串再添加相应的color属性值。并返回这个字符串。  
"color": 必填，为字符串指定颜色值

    var color = baidu.fontcolor('#892') // <font color="#892">baidu</font>

**fromCharCode(num0, num1, num2, ...)** 返回这些数字对应的字符组成的字符串。  
num0, num1, num2, ... 都是unicode编码值

    String.fromCharCode(65, 66, 67) // ABC

**indexOf(str, fromindex)** 返回指定字符串的位置，或-1。  
str: 必填，要查询的字符串。
fromindex: 非必填，指定从什么位置开始。

    var num2 = baidu.indexOf(d, 2) // 3

**italics()** 用`<i>`包裹字符串。并返回这个字符串。  

    var italics = baidu.italics() // <i>baidu</i>

**lastIndexOf(str, fromindex)** 返回指定字符串从开始位置最后一次出现的位置，或-1。  
str: 必填，
fromindex: 非必填，

    var num3 = baidu.lastIndexOf('x', 2) // -1

**link(url)** 用`<a>`包裹字符串并为href添加url。并返回这个字符串。  
url: 必填，

    var link1 = baidu.link('http://www.baidu.com') // <a href="http://www.baidu.com">baidu</a>

**match(str)** 返回查到字符串或null。  
str: 必填，

    var match0 = baidu.match('ai') // ai

**match(reg)** 返回数组或null。  
reg: 必填，

    var str = '1 22 333 4444 ha ha ha '
    var match1 = str.match(/\d+/g) // ['1', '22', '333', '4444']

正则表达式采用全局配置会返回数组。数组的每个元素都是匹配正则的字符串。数组的长度是子字符串在父字符串中出现的次数。  

    var match2 = str.match(/ha/) // ["ha", index: 14, input: "1 22 333 4444 ha ha ha ", groups: undefined]

正则表达式不采用全局配置会返回一个数组。这个数组有数组都有的属性方法。有访问input等时有区别。eg:match2.index // 14  
match2.length // 1
match2[0] // 'ha'
match2.index // 子字符串在父字符串中的下标。
match2.input // 得到原字符串
match2.groups // 我不知道
match2.push('str') // 2

**replace(str, replacementstr)** 匹配第一个符合要求的字符串替换后返回这个字符串。  
str: 必填，
replacementstr: 必填，

    var replace0 = baidu.replace('i', baidu) // babaidu du

**replace(reg, replacementstr)** 匹配第一个符合要求的字符串替换后返回这个字符串。  
reg: 必填，
replacementstr: 必填，

    var replace1 = str.replace(/4/, 5) // '1 22 333 5444 ha ha ha '
    var replace2 = str.replace(/4/g, 5) // '1 22 333 5555 ha ha ha '

**replace(reg, replacementfn)** 匹配第一个符合要求的字符串替换后返回这个字符串。  
reg: 必填，
replacementfn: 必填，对每一个匹配项执行该方法。

    var replace3 = str.replace(/\b\w+\b/g, function (match, index, string) {
        // match 当前匹配项
        // index 当前匹配项的下标
        // string 全字符串
        return match.substring(0,1).toUpperCase()+match.substring(1)
    })
    // '1 22 333 5444 Ha Ha Ha '

<table>
    <thead>
        <tr>
            <td>字符</td>
            <td>替换文本</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$1, $2, ..., $99</td>
            <td>与正则中第1个到第99个表达式相匹配的文本</td>
        </tr>
        <tr>
            <td>$&</td>
            <td>与正则相匹配的子串</td>
        </tr>
        <tr>
            <td>$`</td>
            <td>位于匹配左侧的文本</td>
        </tr>
        <tr>
            <td>$'</td>
            <td>位于匹配右侧的文本</td>
        </tr>
        <tr>
            <td>$$</td>
            <td>直接量符号</td>
        </tr>
    </tbody>
</table>

    var replace4 = str.replace(/(4444) (ha)/g, "$2 $1") // '1 22 333 ha 4444 ha ha '

**search(str)** 返回与查询字符串想匹配的第一个子字符串的index。  
str: 必填，

    var search0 = str.search('ha') // 14

**search(reg)** 返回与查询正则表达式想匹配的第一个子字符串的index。  
reg: 必填，

    var search0 = str.search(/ha/) // 14

**slice(start, end)** 返回指定范围的子字符串。  
start, 必填，开始的index，若是负值表示从右边开始数。  
end, 选填，开始的index，若是负值表示从右边开始数。  
[start, end)

    var slice0 = baidu.slice(-3,-1) // id

**split(separatestr|reg, arrarLength)** 在原字符串中以separatestr|reg为分隔符做成字符串数组。并返回这个数组。  
separatestr|reg, 必填，
arrarLength, 非必填，

    var split0 = str.split(/\d+/) // ['', ' ', ' ', ' ', ' ', ' ha ha ha ']

**strike()** 用`<strike>`包裹字符串。并返回这个字符串。  

    var strike = baidu.strike() // <strike>baidu</strike>

**sub()** 用`<sub>`包裹字符串。并返回这个字符串。  

    var sub = baidu.sub() // <sub>baidu</sub>

**sup()** 用`<sup>`包裹字符串。并返回这个字符串。  

    var sup = baidu.sup() // <sup>baidu</sup>

**substr(start, length)** 返回指定范围内的字符串。  
start, 必填，  
length, 非必填，  

    var substr0 = baidu.substr(-4, 2) // ai

**substring(start, end)** 返回指定范围内的字符串。  
start, 必填，  
end, 非必填， 
[start, end)

    var substring0 = baidu.substring(2, 4) // id

**toLocaleLowerCase()** 按照本地方式把字符串转化为小写。并返回新字符串。  
    
    var bigBaidu = 'BAIdu'
    var localeLower = bigBaidu.toLocaleLowerCase() // 'baidu'

**toLocaleUpperCase()** 按照本地方式把字符串转化为大写。并返回新字符串。  

    var localeUpper = bigBaidu.toLocaleUpper() // 'BAIDU'

**toLowerCase()** 把字符串转化为小写。并返回这个字符串。  

    var lower = bigBaidu.toLowerCase() // 'baidu'

**toUpperCase()** 把字符串转化为大写。并返回这个字符串。  

    var upper = bigBaidu.toUpperCase() // 'BAIDU'

**toString()** 返回这个字符串。  

    var string0 = baidu.toString() // baidu

**valueOf()** 返回这个字符串的原始值。  

    var val0 = baidu.valueOf() // baidu

**includes(subString)** 返回是否包含指定的字符串。  

    var bool0 = baidu.includes('ai')

**startsWith(str)** 是否以指定字符串开头。  

    baidu.startsWith('bai') // true

**endsWith(str)** 是否以指定字符串结尾
    
    baidu.endsWith('du') // du

**repeat(num)** 将字符串重复n次  

    baidu.repeat(3) // 'baidubaidubaidu'

**padStart(n, string)** 在开头使用指定的字符串补齐字符串。  

    baidu.padStart(10, 'ab') // abababaidu

**padEnd(n, string)** 在结尾使用指定字符串补齐字符串。  

    baidu.padEnd(8, 'abcde') // baiduabc

**`${variable}`** 模板字符串  

    `str0 ${baidu} str1` // str0 baidu str1

**String.raw(string)** 返回原始字符串

    let str = `asf\twe`
    String.raw(str) // asf\twe

**trim()** 删除首尾的空格
**trimStart()**
**trimLeft()** 删除首空格
**trimEnd()**
**trimRight()** 删除尾空格

（待续）  

