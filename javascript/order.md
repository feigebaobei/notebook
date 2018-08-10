#order

##冒泡排序

    const bobbleSort = (arr) => {
        let length = arr.length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                }
            }
        }
    }

##快速排序
##快速排序
##快速排序
##快速排序
##快速排序

    function quickSort(array) {
        function sort(prev, numsize) {
            var nonius = prev;
            var j = numsize - 1;
            var flag = array[prev];
            if ((numsize - prev) > 1) {
                while (nonius < j) {
                    for (; nonius < j; j--) {
                        if (array[j] < flag) {
                            array[nonius++] = array[j];　 //a[i] = a[j]; i += 1;
                            break;
                        };
                    }
                    for (; nonius < j; nonius++) {
                        if (array[nonius] > flag) {
                            array[j--] = array[nonius];
                            break;
                        }
                    }
                }
                array[nonius] = flag;
                sort(0, nonius);
                sort(nonius + 1, numsize);
            }
        }
        sort(0, array.length);
        return array;
    }









