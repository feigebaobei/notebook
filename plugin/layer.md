layer.md
##type 基本层类型
0 信息框。
1 页面层
2 iframe层
3 加载层
4 tip层
##title 标题
##content 内容
string/dom/array  
##skin 样式类名
string
##area 宽高
string/array auto
##offset 坐标
string/arrray 垂直水平居中  
##icon 图标 (信息框、加载层的私有参数)
number -1 / 0
##btn 按钮
strign/array
##btnAlign 按钮排序
string
##closseBtn 关闭按钮
string/boolean 1  
0 不显示
1, 2 显示(显示的样式不一样)  
##shade 遮罩的透明度和颜色
string/array/boolean
##shadeClose 点击遮罩时是否关闭
boolean false
##time 自动关闭所需毫秒
number 0
##id 用于控制弹层唯一标识
string ''
##anim 弹出动画
number 0 平滑放大
1 从上掉落
2 从最底部往上滑入
3 从左滑入
4 从左翻滚
5 渐显
6 抖动
##isOutAnim 关闭动画
boolean true
##maxmin 最大最小化
boolean false
##fixed 固定
boolean true
##resize 拉伸
boolean true
##resizing 监听窗口拉伸动作
function null
##scrollbar 滚动条
boolean true
##maxWidth 最大宽度
number 360
##maxHeight 最大高度
##zIndex 层叠顺序
##move 触发拖动的元素
string/dom/boolean '.layui-layer-title'
##moveOut 是否可拖拽到窗口外
boolean false
##moveEnd 拖拽完毕后的事件
function null
##tips tips的方向和颜色
number/array 2
1 上
2 右
3 下
4 左
##tipsMore 是否允许多个tips
boolean false
##success 层弹出后的成功回调方法
function (layero) {} null
##yes 确定按钮回调方法
funciton null
##cancel 右上角关闭按钮触发的回调
funciton null
##end 层销毁后触发的回调方法
funciton (null) {} null
##full/min/restore 最大化、最小化、还原后触发的回调
function (layero) {} null



##layer.config(options) 初始化全局配置
##layer.ready(callback)  初始化就绪
##layer.open(options) 原始核心方法
##layer.alert(content, options, yes)
##layer.confirm(content, options, yes, cancel) 询问框
##layer.msg(content, options.end) 提示框
##layer.load(icon, options) 加载层
##layer.tips(content, follow, options) tips层
##layer.close(index) 关闭特定层
##layer.closeAll(type) 关闭所有层
type是弹层的样式。若不指定就关闭所有的弹层。
##layer.style(index, cssStyle) 重新定义层的样式
##layer.getFrameIndex(windowName) 获取特定iframe层的索引
##layer.iframeAuto(index) 指定iframe层自适应
##layer.iframeSrc(index, url) 重置特定iframe url
##layer.setTop(layero) 置顶当前窗口
##layer.full(), layer.min(), layer.restore() 手工执行最大小化
##layer.prompt(options, yes) 输入层
##layer.tab(options) tab层
##layer.photo(options) 相册层































