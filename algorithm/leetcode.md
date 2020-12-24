# 中等
## 整数转换为罗马数字

var intToRoman = (n) => {
  let q = ['', 'M', 'MM', 'MMM']
  let b = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  let s = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  let g = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  return `${q[Math.floor(n/1000)]}${b[Math.floor(n%1000/100)]}${s[Math.floor(n/10%10)]}${g[Math.floor(n%10)]}`
}

## 两数相除

## 表示数值的字符串

```
let isNumber = (param) => {
  return !isNaN(Number(param)) && param.replace(/\s*/g, '') !== ''
}
```

## 丑数3

```
var nthUglyNumber = function(n, a, b, c) {
  let num = Math.max(a, b, c)
  let min = Math.min(a, b, c)
  let index = 0
  while (index < n) {
    num += min
    if (num % a === 0 && num % b === 0 && num % c === 0) {
      index++
    }
  }
  return num
};
```

## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title
## title