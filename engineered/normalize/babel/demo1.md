# overview
本示例展示了：
- 在浏览器使用以`system`规范使用`babel`

1. 使用cdn中的babel。
2. 编写自定义代码。


# init project
```
// index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> 
  <script type="text/babel">
    const getMessage = () => "Hello World";
    document.getElementById('output').innerHTML = getMessage();
  </script> 
</head>
<body>
    <div id="output"></div>
</body>
</html>
```
