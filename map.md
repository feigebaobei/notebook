#map

类似对象。实现了“值-值”的对应。

**Map([[kay, value], [kay, value], [kay, value], [kay, value]])** 以数组为参初始化map对象。  
**Map.set(key, value)** 设置key对应的值是value  
**Map.get(key)** 得到key对应的值是value  
**Map.delete(key)** 删除指定项目  
**Map.clear()** 清空所有项目  
**Map.has(key)** 返回是否有指定项目  
**Map.size** 返回map对象的大小  

**Map.keys()** 返回key的遍历器  
**Map.values()** 返回value的遍历器  
**Map.entries()** 返回所有成员的遍历器  
**Map.forEach(function(value, key, map) {})**

**Map => Array**  

    [...map] // [[kay, value], [kay, value], [kay, value], [kay, value]]

**Array => Map**  

    new Map([[kay, value], [kay, value], [kay, value], [kay, value]])

**Map => Object**  

    function strMapToObj (strMap) {
        let obj = Object.create(null)
        for (let [key, value] of strMap) {
            obj[key] = value
        }
        return obj
    }

**Object => Map**  

    function objToStrMap (obj) {
        let strMap = new Map()
        for (let key of Object.keys(obj)) {
            strMap.set(key, obj[key])
        }
        return strMap
    }

**Map => JSON**  

    function strMapToJson (strMap) {
        return JSON.stringify(strMapToObj(strMap))
    }

**JSON => Map**  

    function jsonToStrMap (json) {
        return objToStrMap(json)
    }

#WeakMap

1. 只能设置对象为key.  
2. 对对象的引用是弱引用。  

**WeakMap.size**
**WeakMap.set(obj, value)**
**WeakMap.get(obj)**
**WeakMap.delete(obj)**
**WeakMap.clear()**

















































































































































































