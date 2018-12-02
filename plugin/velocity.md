#velocity

一个js动画库。可以很好的与jquery使用，但不依赖于它。  

##install

    npm i velocity-aimate -S
    yarn add velocity-aimate

##usage

    // vue
    import velocity from 'velocity'
    import 'velocity/velocity.ui.js' // 若需要velocity.ui，再引入。

    // use jquery/zepto
    $('#id').velocity({
        // property: 'value'
    }, {
        // 设置动画配置项
    })
    // 使用原生js
    velocity(dom, {
        // property: 'value'
    }, {
        // options: 'value'
    })

与jquery结合使用时先引入jquery再引入velocity。  

属性需要单个写明。如`{padding:'1px'}` 需要写成 `{paddingLeft: '1px',paddingRight: '1px',paddingTop: '1px',paddingRight: '1px',}`。  

链式动画   

    $element.velocity({width: '100px'}).velocity({width: '12px'})

##option配置项

    // 默认参数
    {
        duration: 400, // 动画执行时间
        easing: 'swing', // 缓动效果
        queue: '', // 队列
        begin: undefined, // 动画开始时的回调函数
        progress: undefined, // 动画执行中的回调函数（该函数会随着动画执行被不断触发）
        complete: undefined, // 动画结束时的回调函数
        display: undefined, // 动画结束时设置元素的 css display 属性
        visibility: undefined, // 动画结束时设置元素的 css visibility 属性
        loop: false, // 循环
        delay: false, // 延迟
        mobileHA: true // 移动端硬件加速（默认开启）
    }

**easing**  

- jquery ui 缓动关键字  

'linear'  
'swing'  
"spring"
"easeInSine"
"easeOutSine"
"easeInOutSine"
"easeInQuad"
"easeOutQuad"
"easeInOutQuad"
"easeInCubic"
"easeOutCubic"
"easeInOutCubic"
"easeInQuart"
"easeOutQuart"
"easeInOutQuart"
"easeInQuint"
"easeOutQuint"
"easeInOutQuint"
"easeInExpo"
"easeOutExpo"
"easeInOutExpo"
"easeInCirc"
"easeOutCirc"
"easeInOutCirc"

- css3缓动关键字  

"ease"  
"ease-in"  
"ease-out"  
"ease-in-out"  

- css3 贝塞尔曲线  

    [0.17, 0.67, 0.83, 0.67]

- 弹簧物理缓动  

以2位数组的形式`[tension, friction]` tension最大500，friction最大20  

- 步骤缓动

```
    // 我不会
    [8]
```

缓动可指定作用的属性。可以多个也可以一个。  

    velocity({
        width: ['100px', [250, 10]], // spring physics
        height: ['200px', 'spring'], // jq ui
        backgroundColor: '#982'
    }, {
        easing: 'easeInSine'
    })

**自定义缓动函数**  

    $.Velocity.Easing,myCustomEasing = function (p, opts, tweenDelta) {
        return 0.5 - Math.cos( p * Math.PI ) / 2
    }

**begin**  
**complete**  
**progress**  

    {
        // elements 是当前jQuery对象
        begin: (elements) => {},
        complete: (elements) => {},
        // elements 是当前jQuery对象
        // complete 整个动画过程执行到百分之多少。没有%，只有数值[0-100]。
        // remaining 整个动画过程还余下多少时间。单位：毫秒。
        // tweenValue 补间值
        progress: (elements, complete, remaining, start, tweenValue)
    }

**mobileHA**  
**loop**  
**delay**  
**display**  
**visibility**  

    {
        mobileHA: false,
        loop: 2,
        delay: 100,
        display: 'none',
        visibility: false
    }

**duration**  

    { duration: 1000 } // ms
    { duration: 'slow' } // 'slow', 'normal', 'fast'

##command

它有几个命令指令。可以方便写代码。  

**fadeIn**  
**fadeOut**  
**slideUp**  
**slideDown**  
**finish** 停止执行动画，直接显示最终结果。  
    
    velocity(
        dom,
        'command',
        {
            // options
            // key: 'value'
        }
    )

**scroll**  

    velocity(
        dom, // 需要滚动到的元素
        'scroll',
        {
            container: 'domParent' // 当前元素的父、祖元素（它可以滚动）。
        }
        )

**stop**  

    // 停止当前元素的动画
    velocity(
        dom,
        'stop'
    )

    // 停止自定义队列
    velocity(
        dom,
        'stop',
        'queueName'
    )

`stop: true`停止并清空当前正在执行的整个动画队列  

**queue**  

先定义再手动执行队列。  
`loop`, `reverse`不能与queue一起使用。  

    // dom
    // define
    velocity(
        dom,
        property,
        {
            // optinos
            queue: 'queueName'
        }
    )
    // execute
    velocity.Utilities.dequeue(dom, 'queueName')
    // jquery
    // define
    $(ele).velocity(
        property,
        {
            queue: 'queueName2'
        }
    )
    // execute
    $(ele).element.dequeue('queueName2')

**reverse**  

有正向动画才能设置反向动画。  

    // 原生js
    velocity(
        dom,
        {
            left: 200
        },
        {
            duration: 200
        }
    )
    velocity(dom, 'reverse', options)
    // jquery
    $ele.velocity(
        property,
        options // 不能设置queue
    ).velocity('reverse', options)

##feature

**transforms**  
**colors**  
**svg**  
**hook**  

设置css属性值、得到css属性值  

    // set
    velocity.hook(dom, property, value)
    // get
    velocity.hook(dom, property) // 值，有单位。
    velocity.hook(dom, property, value) // 数组 [property, value]

**promise**  

    当动画执行完后执行then/catch
    velocity(dom, property, options).then(() => {...}).catch(() => {...})

**mock**  

当前动画执行的速率倍数。值越大速率越慢。  

    velocity.mock = number

**utility function**  

    // 我不会

##advanced

**value functions**  

给property的值使用function返回。  

    velocity(
        dom,
        {
            width: () => {
                // ...
                return Math.random() * 20 + 'px'
            }
        }
    )

**forcefeeding**  

velocity执行动画前会先检查当前dom的css初始值，再根据用户设置的结束值进行动画。  
若设置初始值就省去了对当前元素的检查css初始值。  

    velocity(
        dom,
        {
            property: [end, start]
        }
    )

##plugin

它有自己的插件--velocity.ui.js  

**velocity.registerEffect**  

把多个动画存储在一个数组里。  

    // 原生js
    // define
    velocity.RegisterEffect(
        'name', // 这个动画队列的名字
        defaultDuration: number, // 整个动画执行的时间，ms
        calls: [ // 定义动画队列的数组
            [ // 每个动画的设置
                {
                    property: 'value'
                },
                durationPercentage, // 当前动画占总时间的百分比。用小数表示。0.5 50%
            ], ...
        ],
        reset: { // 开始动画时的样式
            property: value
        }
    )
    // use
    velocity.RunSequence(dom, 'name')
    // jquery
    // define
    $.Velocity.RegisterEffect(
        'name',
        defaultDuration: number,
        calls: [
            [{property: value}, durationPercentage, {options}],
            [{property: value}, durationPercentage, {options}],...
        ],
        reset: {property: value}
    )
    // use
    $element.velocity('name')

**velocity.RunSequence**  

    // 原生js
    // define
    let arr = [
        {e: dom, p: {property: 'value'}, o: {...}},
        {e: dom, p: {property: 'value'}, o: {...}},
        {e: dom, p: {property: 'value'}, o: {...}},
        {e: dom, p: {property: 'value'}, o: {...}}
    ]
    // use
    velocity.RunSequence(arr)
    // jquery
    // use
    $.Velocity.RunSequence(arr)

执行多个动画的序列。  

velocity.ui.js插件有好多已定义的动画。  

- callout.bounce  
callout.shake  
callout.flash  
callout.pulse  
callout.swing  
callout.tada  
transition.fadeIn  
transition.fadeOut  
transition.flipXIn  
transition.flipXOut  
transition.flipYIn  
transition.flipYOut  
transition.flipBounceXIn  
transition.flipBounceXOut  
transition.flipBounceYIn  
transition.flipBounceYOut  
transition.swoopIn  
transition.swoopOut  
transition.whirlIn  
transition.whirlOut  
transition.shrinkIn  
transition.shrinkOut  
transition.expandIn  
transition.expandOut  
transition.bounceIn  
transition.bounceUpIn  
transition.bounceUpOut  
transition.bounceDownIn  
transition.bounceDownOut  
transition.bounceLeftIn  
transition.bounceLeftOut  
transition.bounceRightIn  
transition.bounceRightOut  
transition.slideUpIn  
transition.slideUpOut  
transition.slideDownIn  
transition.slideDownOut  
transition.slideLeftIn  
transition.slideLeftOut  
transition.slideRightIn  
transition.slideRightOut  
transition.slideUpBigIn  
transition.slideUpBigOut  
transition.slideDownBigIn  
transition.slideDownBigOut  
transition.slideLeftBigIn  
transition.slideLeftBigOut  
transition.slideRightBigIn  
transition.slideRightBigOut  
transition.perspectiveUpIn  
transition.perspectiveUpOut  
transition.perspectiveDownIn  
transition.perspectiveDownOut  
transition.perspectiveLeftIn  
transition.perspectiveLeftOut  
transition.perspectiveRightIn  
transition.perspectiveRightOut  

**配置项**  

stagger: 每个元素依次执行间的时间间隔。ms。  
drag: 只针对最后一个元素是否有缓冲效果。boolean.  
backwards: 从最后一个元素开始依次延迟执行动画。ms.  

**vmd**  

是jquery.js/velocity.js/velocity.ui.js的合并版本。  