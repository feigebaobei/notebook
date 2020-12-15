#date

##简介

日期  

##属性  

**constructor**  
**prototype**  

**Date()**  

返回当前的日期和时间。  

**getDate()**  

从Date对象中返回一个月中的当前日期。  

**getDay()**  

返回星期几。  

**getMonth()**

返回月份数  

**getFullYear()**  

返回4位数字的年份。  
**getYear()**请用`getFullYear()代替`  

**getHours()**  

返回小时数（0-23）  

**getMinutes()**

返回分钟数（0-59）  

**getSeconds()**

(0-59)

**getMilliseconds**

(0-999)

**getTime()**  
**now()**  

返回从1970.01.01至今的毫秒数。

**getTimezoneOffset()**

返回本地时间与格林威治标准时间（GMT）的分钟差。  

**getUTCDate()**

根据世界时从Date对象中返回月的当前日期。  

**getUTCDay()**  
**getUTCMonth()**  
**getUTCFullYear()**  
**getUTCHours()**  
**getUTCMinutes()**  
**getUTCSeconds()**  
**getUTCMilliseconds()**  
**parse(dateString)**  

dateString 表示时间日期的字符串 必填。  
返回1970.01.01到指定日期的毫秒数。  

**setDate(Number)**  

number 数字 必填  
设置date对象中的日期。 

**setMonth(Number)**  
**setFullYear(Number)**  

4位数字。  
**setYear(Number)**请用`setFullYear(Number)`代替。

**setHours(0-23)**  
**setMinutes(0-59)**  
**setSeconds(0-59)**  
**setMilliseconds(0-23)**  
**setTime(Number)**  

以毫秒设置date对象。  

**setUTCDate(1-31)**  
**setUTCMonth(0-11)**  
**setUTCFullYear(4位数字)**  
**setUTCHours(0-23)**  
**setUTCMinutes(0-59)**  
**setUTCSeconds(0-59)**  
**setUTCMilliseconds(0-999)**  
**toSource()**

返回该对象的源代码。  

**toString()**  

转换为字符串。  

**toTimeString()**  

将time部分（时、分、秒、及后面的）转换为字符串。  

**toDateString()**

将date部分（星期、月、日、年）转换为字符串。  

**toUTCString()**  
**toGMTString()**请使用`toUTCString`代替。  
**toLocalString()**  
**toLocalTimeString()**  
**toLocalDateString()**  
**UTC(year(4位), mounth, day, hours, minutes, seconds, ms)**  

返回1970.01.01到指定时间的毫秒数。  

**valueOf()**  

date对象的原始值。  
经测试，发现该方法与`getTime()`得到的结果一样。  
