## 1. h5标签兼容性  

    <script src="http://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>

## 2. 元素浮动之后，能设置宽度就设置宽度。若要使用内容撑开宽度，需要使这里边的块级元素加上浮动。  

## 3. 第一块元素浮动后，第二块元素使用margin-left值第一个元素宽度后，在ie6下会有间隙问题。  

    不用margin-left,使用float:left;

## 4. ie6下子元素的高度超出父元素时，会把父元素宽高撑开。  

不要让子元素的高度超出父元素的高度。  

## 5. p、h标签不能嵌套块级元素。  

## 6. 子元素的margin-top属性会有对祖先元素有作用。  

使用bfc可以解决。  

## 7. 同级元素的margin会叠加。  

同级元素分别设置margin。尽量使用同一方法。（margin-left, margin-top）  
也可使用伪类`.class::last {...}`  

## 8. ie6最小高度是19px.  

    overflow: hidden;

## 9. 在ie6/7下，当元素浮动后，再设置margin.那么就会产生双倍边距。  

添加 display:inline;

## 10. 在ie6/7下，li元素浮动后会有4px的间距。  

vertical-align: top;

## 11. 在ie6下，两个浮动元素之间有注释或者内联元素并且和父级宽度相差不超过3px,会导致多得到一些文字问题。  

1. 2个浮动元素之间不用使用注释、内联元素。  
2. 与父级元素相差3px以上。  

## 12. 在ie6/7下，父元素使用overflow: hidden，子元素使用position: relative后，就包不住子元素了。  

给父元素设置position: relative;  

## 13. 在ie6下，绝对定位的元素的宽高是奇数时，绝对定位的元素的right/bottom会有1px的偏差。  

不使用奇数。  

## 14. 在ie6下，绝对定位元素和浮动元素同级时，绝对定位会消失。  

不要在同级出现。  

## 15. 在ie6下，input的空隙。  

给input使用float: left;

## 16. 在ie6下，输入类型表单控件背景问题，背景不固定，滚动了。  

background-attachment: fixed;  

## 17. 在ie6下，line-height会有几个像素的偏差。  

使用vertical-align: middle;  

## 18. 在ie6下，a标签的手形光标。  

在ie6下，a{cursor: pointer;}

## 19. 在ie6下，text-decoration: none;  

一般使用： a { text-decoration: none; }  
ie6下： a { text-decoration: none; } a:hover { text-decoration: none; }  
