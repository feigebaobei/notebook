#debounce throttle
##去抖，节流

##定义

    function debounce(fn, delay) {
        var timer
        return function () {
            var context = this
            var args = arguments
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    }

      function throttle(fn, threshhold) {
        var last
        var timer
        threshhold || (threshhold = 250)
        return function () {
          var context = this
          var args = arguments
          var now = +new Date()
          if (last && last + threshhold > now) {
            clearTimeout(timer)
            timer = setTimeout(function () {
              last = now
              fn.apply(context, args)
            }, threshhold)
          } else {
            last = now
            fn.apply(context, args)
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











