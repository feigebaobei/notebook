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

function fn (num, box = [1, 3, 5], res = 0) {
  if (num - 5 >= 0) {
    num -= 5
    return fn(num, box, res + 1)
  } else if (num - 3 >= 0) {
    num -= 3
    return fn(num, box, res + 1)
  } else if (num - 1 >= 0) {
    num--
    return fn(num, box, res + 1)
  }
   else {
    return res
  }
}

dp sums
0  [0]
1  max([0], [1])
2  max([0]+[2], [1])
3  max([3]+[3-2], [3-1])
4  max([4]+[4-2], [4-1])
5  max([5]+[5-2], [5-1])

let arr = [...]
let dp = [arr[0]]
function opDp () {
  dp[1] = Math.max(db[0], arr[1])
  for (let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(arr[i] + dp[i - 2], dp[i - 1])
  }
}
Math.max(...dp)
Math.max.apply(null, dp)

function fn (nums) {
  if (!nums.length) {
    return 0
  }
  if (nums.length === 1) {
    return nums[0]
  }
  let dp = [nums[0]]
  dp.push(Math.max(dp[0], nums[1]))
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
  }
  return Math.max(...dp)
}

function maxProfit (prices) {
  if (!prices.length) { return 0 }
  let minPrice = prices[0], maxPrice = 0
  for (let i = 1; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i])
    maxPrice = Math.max(maxPrice, prices[i] - minPrice)
  }
  return maxPrice
}

function rob (nums) {
  if (!nums.length) {
    return 0
  }
  if (nums.length === 1) {
    return nums[0]
  }
  if (nums.length === 2) {
    return Math.max(nums[0], nums[1])
  }
  let dp = [nums[0]]
  dp.push(Math.max(nums[0], nums[1]))
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
  }
  return Math.max(...dp)
}

function minCostClimbingStairs (cost) {
  if (!cost.length) {return 0}
  if (cost.length === 1) {
    return cost[0]
  }
  let dp = [cost[0], cost[1]]
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(cost[i] + dp[i - 1], cost[i] + dp[i - 2])
  }
  console.log(dp)
  return Math.min(...(dp.slice(-2)))
}

function lengthOfLIS (nums) {
  if (!nums.length) {return 0}
  let dp = new Array(nums.length).fill(1)
  // console.log(dp)
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // break
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  // console.log(dp)
  return Math.max(...dp)
}