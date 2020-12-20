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
## title
## title