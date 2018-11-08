#vuex

状态管理。  
在定义有state的组件及子组件都可以访问到数据。  

##定义组成部分

###state

用来保存数据。  

    // state.js
    const state = {
        // key: value
        age: 23
    }
    export default state

###getters

定义得到state里的数据的方法。可以给这些方法加一些过滤、截取、整合等操作。  
getter的返回值会根据它的依赖被缓存起来，只有当依赖值被改变时才重新计算。  

    // getters.js
    const getters = {
        // ...
        fn: (state) => state.age,
        // 第一个参数是state。第二个参数是getters
        fn2: (state, getters) => {
            // state 是仓库
            // getters 是getters对象。即：它包含所有get方法。
            return state.skey + getters.fn // 这里不能写括号
        },
        // 可以返回一个函数。在这个函数中进行一些操作。
        fn3: (state) => {
            return (id) => { // 这种写法有点像闭包
                return state.skey.find(item => item.key === value)
            }
        }
    }
    export default getters

###mutations

1. 每个mution都有一个字符串的事件事件类型(type)和一个回调函数(handler)。  
2. 提交载荷一般是对象。  
3. 必须是同步函数。  
4. 只能在这里修改state的值。  
3. 应当遵守vue的响应规则。  

```
    state.obj = {
        ...state.obj,
        newProp: 'value'
    } // obj是state的根级数据
    // 或者
    // state.obj = Object.assign({}, state.obj. {k: 'v'})
```

**mutations的例子**  

```
    const mutations = {
        mType: (state, payload) => {
            state.sKey += payload.pKey
        }
    }
```

*tip：*创建一个整合事件类型的文件。  
    
    // mutation-types.js
    const type = {
        // ...
        first: 'ft',
        second: 'st'
    }
    // 变量、数组、对象都可以输出。
    export default type
    // 也可以 export {type, item0, item1, ...}

###actions

1. action提交的是mutation，不是直接变量状态。  
2. actino可以包含异步操作。  

action函数接受一个与store实例具有相同属性和方法的对象（context），但不是store对象。  

    const actions = {
        aevent0 (context) {
            context.commit('mType')
        },
        aevent1 ({commit}) { // 使用解构赋值方法得到store实例里的commit方法。
            commit('mType')
        }
    }

##使用vuex

我一般在src下创建一个vuex目录。把状态管理文件都放在这个目录里。  

    import Vue from 'vue'
    import Vuex from 'vuex'
    import state from './state.js'
    import getters from './getters.js'
    import mutations from './mutations.js'
    import actions from './actions.js'
    Vue.use(Vuex)
    const store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })
    export default store

###使用state

使用`state`的数据可以在`data`，`computed`里。分别是得到state数据一次后不再改变，随着state数据改变后改变。  

当前组件中使用`store.state.key`访问。  
后代组件中使用`this.$store.state.key`访问。  

    data () {
        return {
            key: this.$store.state.sKey
        }
    },
    compouted: {
        fn () {
            return this.$store.state.sKey
        }
    }

辅助函数**mapState**  

    import { mapState } from 'vuex' // 引入mapstate才能使用

    // 只得到state里的数据
    computed: mapState({
        key: state => state.stateKey,
    })
    // 得到state里的数据和自定义计算属性
    computed: {
        // state里的属性
        ...mapState({ // 这里使用了解构赋值
            vueKey: state => state.stateKey
        }),
        // 自定义计算属性
        myComp () {
            return 'value'
        }
    }

**解构赋值**  

    let arr = [1, 2, 3]
    console.log(...arr) // 1, 2, 3

###使用getter

使用它从仓库中取数据。  
在当前组件中使用`store.getter.key`得到。  
在子组件中使用`this.$store.getter.key`得到。  

使用**mapGetters**  

    import { mapGetters } from 'vuex'

    computed: {
        ...mapGetters({
            vueKey: 'getKey'
        }),
        ...mapGetters(['getkey', ...]),
        // 自定义计算属性
    }
    // 建议使用...mapGetters。因为它使用了扩展运算符，把对象转化为单个数据。...mapGetters内部使用解构赋值。

###使用mutation

    // import
    import { mapMutaions } from 'vuex'
    // usage
    methods: {
        ...mapMutations(['mkey'], ...),
        ...mapMutations({
            // ...
            vueKey: 'mKey'
        }),
        // custom method
        // ...
        firstm: () => { // 调用
            store.commit('mTypeFirst', {
                key: 'value'
            })
        },
        secondm: () => { // 可以对象风格调用
            store.commit({
                type: 'mTypeSecond',
                key: 'value'
            })
        }
    }

###使用action

    store.dispatch('aevent0') // 分发
    // 可以进行异步操作。

    // import { mapActions } from 'vuex'
    methods: {
        ...mapActions({
            // ...
            vueKey: 'actionKey'
        }),
        m ({dispatch, commit}) {
            return dispatch('actionKey').then(() => {
                commit('mutationKey')
            }).catch(() => {
                ...
            })
        }
    }

--- 
2018/11/08 by stone