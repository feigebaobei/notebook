    // 取后者
    let uniqueArr = (arr) => {
        let arrBox = []
        for ( let i = 0, iLen = arr.length; i < iLen; i++) {
            let index = arrBox.indexOf(arr[i])
            if (index !== -1) {
                arrBox.splice(index, 1)
            }
            arrBox.push(arr[i])
        }
        return arrBox
    }

    // 取1-100内的素数
    let primeNumber = (i = 100) => {
        // let i = 100,
            let arrBox = []
        while (i) {
            let j = i,
                acount = 0
            while (j) {
                if (i % j === 0) {
                    acount++
                }
                j--
            }
            if (acount <= 2) {
                arrBox.push(i)
            }
            i--
        }
        return arrBox
    }