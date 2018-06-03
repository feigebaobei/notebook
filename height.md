#头尾固定高度中间高度自  

下面说下要求：  
1. 头部固定高度，宽度100%自适应父容器；  
2. 底部固定高度，宽度100%自适应父容器；  
3. 中间是主体部分，自动填满，浏览器可视区域剩余部分，内容超出则中间部分出现流动条；  
4. 整个内容填满浏览器可视区域，并且不超出此区域！  

##方法一  

**html:**  

	<div id="dHead">100%</div>
	<div id="dBody"></div>
	<div id="dFoot">100%</div>

**css**  

	html, body {
		height: 100%;
		margin: 0;
		padding: 0;
	}
	#dHead {
		height: 100px;
		background: #690;
		width: 100%;
		position: absolute;
		top: 0;
		text-align: center;
	}
	#dBody {
		width: 100%;
		background: #fc0;
		overflow: auto;
		position: absolute;
		top: 100px;
		bottom: 100px;
		z-index: 10;
	}
	.mycontent {
		padding: 20px;
	}
	#dFoot {
		width: 100%;
		height: 100px;
		background: #709;
		position: absolute;
		bottom: 0;
		z-index: 200;
	}

**效果图**  

![asdsd](image/1.png)  


##方法二  

**html**

	<div class="top"></div>
	<div class="side"></div>
	<div class="main"></div>
	<div class="bottom"></div>

**css**  

	* {
		margin: 0;
		padding: 0;
	}
	html {
		box-sizing: border-box;
		padding: 100px 0;
		overflow: hidden;
	}
	html, body {
		height: 100%;
	}
	.top {
		position: relative;
		top: -100px;
		height: 100px;
		background: #f60;
	}
	.side {
		top: -100px;
		position: relative;
		height: 100%;
		background: #fc0;
		overflow: auto;
		width: 200px;
		float: left;
		overflow: auto;
	}
	.main {
		top: -100px;
		position: relative;
		overflow: auto;
		height: 100%;
		background: #f38;
	}
	.bottom {
		top: -100px;
		position: relative;
		height: 100px;
		background: #f80;
		clear: both;
	}

**效果图**  

![asdsd](image/2.png)  


##方法三  

**html**  

	<div class="top"></div>
	<div class="wrap"></div>
	<div class="footer"></div>

**css**  

	* {
		margin: 0;
		padding: 0;
	}
	html {
		_padding: 100px 0 100px 0;
		_overflow: hidden;
	}
	html, body {
		width: 100%;
		height: 100%;
	}
	.wrap {
		background: #f80;
		width: 100%;
		overflow: auto;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 100px;
		bottom: 100px;
		_height: 100%;
	}
	.top {
		height: 100px;
		width: 100%;
		left: 0;
		top: 0px;
		background: #683;
		position: absolute;
		z-index: 100;
	}
	.footer {
		width: 100%;
		height: 100px;
		background: #d39;
		position: absolute;
		bottom: 0;
		left: 0;
	}

**效果图**  

![asdsd](image/3.png)  


##方法四  

使用js的方法。

---

1/9/2018 1:56:36 PM 