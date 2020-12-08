# 动态规划

最优子结构
边界
状态转移方程式

// 24点问题
let judgePoint24 = (arr) => {
  let len = arr.length
  if (len === 1) {
    return arr[0] === 24
  }
  let isValid = false
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let [n0, n1] = [arr[i], arr[j]]
      let newArr = arr.filter(item => item != arr[i] && item != arr[j])
      // +
      isValid = isValid || judgePoint24([...newArr, n0 + n1])
      // -
      isValid = isValid || judgePoint24([...newArr, n0 - n1])
      isValid = isValid || judgePoint24([...newArr, n1 - n0])
      // *
      isValid = isValid || judgePoint24([...newArr, n1 * n0])
      // /
      if (n0 != 0) {
        isValid = isValid || judgePoint24([...newArr, n1 / n0])
      }
      if (n1 != 0) {
        isValid = isValid || judgePoint24([...newArr, n0 / n1])
      }
    }
  }
  return isValid
}