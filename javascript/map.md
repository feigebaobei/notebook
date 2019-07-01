#map

类似对象。实现了“值-值”的对应。就是记录键值对的映射关系的集合。  

**Map([[kay, value], [kay, value], [kay, value], [kay, value]])** 以数组为参初始化map对象。  
|||||
|-|-|-||
|属性||||
|constructor|Map|||
|size|数量|||
|方法||||
|clear()|删除所有kv|||
|delete(key)|若该map对象中有key，则删除key及其值返回true。若该map对象中没有key，则返回false。|||
|entries()|返回一个iterator对象，其值为[key, value]|||
|forEach(callback(item, index, arr)[, thisArg])||||
|get(key)|若存在key，则返回其对应的值。若不存在key，则返回其undefined。|||
|has(key)|返回是否包含key。|||
|set(key, value)|设置该map对象key对应的value。|||
|values()|返回一个iterator对象，其值为value。|||

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

### 复制，合并

    var clone = new Map(othermap)
    var merged = new Map([...map0, ...map1, ...map2])

#WeakMap

1. 只能设置对象为key.  
2. 对对象的引用是弱引用。  

**WeakMap.length**
**WeakMap.prototype** // WeakMap对象
**WeakMap.set(obj, value)**
**WeakMap.get(obj)**
**WeakMap.has(obj)**
**WeakMap.delete(obj)**

















































































































































































