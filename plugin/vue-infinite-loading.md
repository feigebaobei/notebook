#vue-infinite-loading  

##function  

可以实现瀑布流式累加载。  

##install

1. npm i vue-infinite-loading --save  
2. import InfiniteLoading from 'vue-infinite-loading' 或 const InfiniteLoading require('vue-infinite-loading')
3. <script src="/path/to/vue-infinite-loading/dist/vue-infinite-loading.js"></script>

##usage  

1. 需要累加载页面元素时。
3. 放在页面底部。  
3. 在InfinityLoading组件中监听infinite事件。  

infinite事件触发的函数有一个特殊事件参数（$state）。  
$state.loaded() => 表示已经加载成功，用于当次加载数据成功时。此时出现slot="no-more"的内容  
$state.complete() => 表示已经加载完成，用于加载数据结束时。此时出现slot="no-resluts"的内容    
$state.reset() => 表示
<tag slot="no-more"></tag> => 表示在没有更多元素时（即加载完数据时）显示  
在InfinityLoading组件中设置ref="child"。运行this.$refs.child.$emit('$InfiniteLoading:reset')可以使用组件回到初始状态，此时组件会立即请求新数据。  
可以写多个参数 <infinite-loading @infinite="handler($event, arg0, arg1, arg2)"></infinite-loading>

###properties  

1. distance InfiniteLoading距离底部多远时触发加载数据的事件。  
2. spinner 等待加载数据时的动画。 default/bubbles/circles/spiral/waveDots  
3. ref   
4. direction 触发加载数据的滑动方法 bottom/top  
5. identifier 当指定的值改变时再次执行初始化方法。  

###slot

1. no-resluts  
2. no-more  
3. spinner  

###在服务端渲染（ssr）

1. use
  import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'
  import InfiniteLoading from 'vue-infinite-loading'  
2. npm i less less-loader --save-dev

###与第三方滚动插件一起使用。
（我不会那这些第三方插件，所以我不会处理这种情况）  

###手动触发加载数据  

1. 设置一个加载按钮，为其绑定加载事件。  
2. 加载按钮与InfinityLoaing组件的显示互斥。（v-if, v-else）  
3. 页面初始化时，渲染加载按钮（也就是说不渲染InfiniteLoading组件）。  
4. 点击加载按钮时。改变加载按钮的显示条件。出现InfiniteLoading组件，它开始工作。  
5. InfiniteLoading加载数据后再次改变加载按钮的显示条件。  

### vue-infinite-loading与选项卡结合使用。

为vue-infinite-loading组件设置`:indentifier="sv"`
为一个切换tab的事件（@click="fn"）绑定函数
在该函数体中清空列表后改变sv

