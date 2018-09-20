    // 平分数组
    let averageArr = (arr, count = 2) => {
        let len = arr.length,
            acount = count < 1 ? 1 : count,
            quotient = Math.floor(len / acount),
            model = len % acount,
            objArr = Object.create(null),
            objLen = Object.create(null)
            console.log(acount)
        for (let i = 0; i < acount; i++) {
            objArr[i] = [] // 创建相应数量的数组
            objLen[i + 'len'] = quotient
        }
        for (i = 0; i < model; i++) {
            objLen[i + 'len']++
        }
        let k = 0
        while (k < arr.length) {
            for (i = 0; i < acount; i++) {
                for (let j = 0; j < objLen[i + 'len']; j++) {
                    objArr[i].push(arr[k])
                    k++
                }
            }
        }
        return objArr
    }

    // 把有序数组合并成有序数组
    let concatOrderArr = (arr, oarr) => {
        let i = 0,
            j = 0,
            iLen = arr.length,
            jLen = oarr.length,
            count = Math.min(iLen, jLen),
            k = 0,
            arrBox = []
        while (i < iLen && j < jLen) {
            if (arr[i] < oarr[j]) {
                arrBox.push(arr[i])
                i++
            } else {
                arrBox.push(oarr[j])
                j++
            }
        }
        return arrBox.concat(i < iLen ? arr.slice(i) : oarr.slice(j))
    }

    // 最大公约数
    let divisor = (numa, numb) => {
        let min = Math.min(numa, numb),
            max = Math.max(numa, numb)
        while (max % min !== 0) {
            let temp = max % min
            max = min
            min = temp
        }
        return min
    }
    // 最小公倍数
    let multiple = (numa, numb) => {
        let product = numa * numb,
            divi = divisor(numa, numb),
            result = product / divi
        return result
    }

    // 取素数
    let primea = (max) => {
        if (max <= 0) {
            return []
        }
        let i = 3,
            boxArr = [1, 2]
        if (max < 3) {
            return boxArr.slice(0, max)
        }
        while (i <= max) {
            let j = 3,
                count = 1
            while (j < i) {
                if (i % j === 0) {
                    count++
                }
                j += 2
            }
            if (count === 1) {
                boxArr.push(i)
            }
            i += 2
        }
        return boxArr
    }
    // 取素数
    let primeb = (max) => {
        if (max <= 0) {
            return []
        }
        let i = 3,
            boxArr = [1, 2]
        if (max < 3) {
            return boxArr.slice(0, max)
        }
        while (i <= max) {
            let finger = 1,
                count = 1
            for (;finger < boxArr.length; finger++) {
                if (i % boxArr[finger] === 0) {
                    count++
                }
            }
            if (count === 1) {
                boxArr.push(i)
            }
            i += 2
        }
        return boxArr
    }
    // 取素数
    let primec = (max) => {
        if (max <= 0) {
            return []
        }
        let i = 3,
            boxArr = [1, 2]
        if (max < 3) {
            return boxArr.slice(0, max)
        }
        while (i <= max) {
            boxArr.slice(1).some(function (item, index, arr) {
                return i % item === 0
            }) ? '' : boxArr.push(i)
            i += 2
        }
        return boxArr
    }

    // 快速排序
    let quickSort = (arr) => {
        if (arr.length <= 1) {
            return arr
        }
        let index = Math.floor(arr.length / 2),
            pivot = arr.splice(index, 1)[0],
            left = [],
            right = []
        for (let i = 0, iLen = arr.length; i < iLen; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return quickSort(left).concat([pivot], quickSort(right))
    }