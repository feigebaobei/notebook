这是一个浏览器的history对象的插件（history插件）

```
npm i history
import createHistory from 'histroy/createBrowserHistory'
```

## 有三种使用方式

    createBrowserHistory 现代浏览器使用
        createBrowserHistory({
            basename: '', // 基链接
            forceRefresh: false, // 是否强制刷新整个页面
            keyLength: 6, // location.key的长度
            getUserConfirmation: (message,callback) => callback(window.confirm(message)) // 跳转拦截函数
        })
    createMemoryHistory 手机端使用
        createMemoryHistory({
            initialEntries: ['/'], // 初始载入路径，和MemoryRouter中的initialEntries是一样的
            initialIndex: 0, // initialEntries初始载入索引
            keyLength: 6, // location.key的长度
            getUserConfirmation: null // 路由跳转拦截函数
        })
    createHashHistory 老版本浏览器使用，暂不介绍

## 基本使用功能

    const history = createHistory(); 创建历史对象
    const location = history.location; 获取location对象
    const unlisten = history.listen( (location, action) => {
        console.log(location,action)
        // location是location对象
        // action是动作名称，比如 "PUSH"
    } )
    history.push('/a', { some: 'state' }) // 强制跳转
    unlisten() // 监听解绑

## history对象

    属性：
        上面三种方法创建的history对象都有如下三个属性
            history.length 历史记录的条数
            history.location 历史记录中的location对象
            history.action 当前的历史记录是通过什么动作添加进来的，如 "PUSH"
        createMemoryHistory中提供了额外的两个属性
            history.index 当前历史记录的索引
            history.entries 历史记录
    方法
        listen方法
            history.listen( (location,action) => {
                console.log(location,action);
                // location就是window.location的一个子集
                // action可能的值，"PUSH", "REPLACE", "POP"
            } )

## 使用history实现跳转

    push
        使用push可以将一条新的历史记录推送到历史堆栈中
        history.push('/a');
        history.push('/a',{name: 'yejiawei'});
        history.push({
            pathname: '/a',
            state: {
                name: 'yejiawei'
            }
        });
    replace方法和push方法使用形式一样，replace的作用是取代当前历史记录
    go，此方法用来前进或者倒退，history.go(-1);
    goBack，此方法用来回退，history.goBack();
    goForward，此方法用来前进，history.goForward();
    另外使用createMemoryHistory创建的history对象，有canGo方法，和go方法类似

## 使用history实现路由跳转警告

    const unblock = history.block('Do you want to leave?');
    上面这个用法，就是添加一个跳转提示信息，默认使用dom环境的window.confirm，所以如果使用非dom环境的createMemoryHistory就要使用getUserConfirmation方法实现
    另外，除了传递一个字符串提示信息以外，还可以添加函数
    const unblock = history.block( (location,action) => {
        return 'do you leave?'
    } )
    可以通过直接调用，unblock(); 实现方法解绑





