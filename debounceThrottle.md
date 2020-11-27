#debounce throttle
##去抖，节流

##定义

多次触发间隔若小于指定时间，则在最后一次触发后的指定时间执行指定方法。

    function debounce(fn, delay) {
        var timer
        return () => {
            var self = this
            var args = arguments
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(self, args)
            }, delay)
        }
    }

若一段时间内频繁触发指定事件，则在该时间内每过指定时间就执行一次指定方法。

      function throttle(fn, threshhold = 250) {
        var last
        var timer
        // threshhold || (threshhold = 250)
        return () => {
          var self = this
          var args = arguments
          var now = +new Date()
          if (last && last + threshhold > now) {
            clearTimeout(timer)
            timer = setTimeout(function () {
              last = now
              fn.apply(self, args)
            }, threshhold)
          } else {
            last = now
            fn.apply(self, args)
          }
        }
      }

##使用

    var timer2
    $('#input').on('input', 
        debounce(function () {
          console.log('ajax')
        }, 1000)
    )

    var last
    var timer3
    $('body').on('mousemove', 
        throttle(function (argument) {
          console.log('mousemove')
        }, 300)
    )











