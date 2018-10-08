#css的长度单位
![](./image/csslengthunit0.png)  

##rem  
作者很讨厌这个单位。用起来不好用，旧代码非要这么用。  

    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return
        docEl.sytle.fontSize = 20 * (clientWidth / 750) + 'px'
      }
      if (!doc.addEvnetListener) return
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)