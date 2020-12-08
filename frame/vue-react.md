# 相同点

1. 使用vdom
2. 组件化
3. 有路由器
4. 数据向上向下流动
5. 都有自己的构建工具（@vue/cli , create-react-app）
6. 配套框架。都专注于ui渲染。路由、状态管理由同伴处理。

# 不同点

|vue|react||
|-|-|-|
|Vue的核心团队维护着vue-router和vuex|react-router和react-redux则是由社区成员维护||
|模板.很接近html.|jsx，本质是js的class||
|当前vue对象管理|使用setState()||
|weex|react-native||
|模板|jsx||
|为每个属性设置watcher,当属性变化时，更新dom.watcher越多越可能卡顿。|setState后使用shouldComponentUpdate判断是否渲染，若为true，则重新渲染组件。||
|中小型|都可以||
|把html/css/js放在一起。使用vue-loader统一处理。|使用js生成html/css.||
|声明式的写法|使用扩展类式的写法。||
|使用mixins扩展|使用高阶组件扩展||
|大部分是内置的|react做的较少，大部分由社区做。||
|mutation是直接改变原始数据|redux的reducer是返回一个全新的state||
|不需要|redux使用immutable来优化性能。||
|双向数据绑定|数据单向流动||
||||