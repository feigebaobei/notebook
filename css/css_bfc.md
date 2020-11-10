#bfc

块级格式化上下文 block fromatting context  

使用bfc的条件。  

1. float不是none.  
2. position不是static/relative.  
3. display的值是inline-block, table-cell, flex, table-caption, inline-flex.  
4. overflow不是visible.  

解决高度坍塌问题

1. clear:both;
2. `<br>`
3. overflow: hidden
4. overflow: auto
5. 父元素float
6. display: table
7. :after
8. :before :after
(block formatting context 块格式化上下文)  
bfc的特性就是包裹浮动元素。  

##功能

2. 阻止内部元素逃离盒子。  
3. 阻止内部元素从盒子里伸出来。  
4. 阻止内部元素与外界联系。（自己的理解）

##如何创建bfc
`float: xxx;`  
`position: absolute, fixed`  
`display: inline-block, table-cell, table-caption, table-cell`  

---

2018/08/16 by stone





包裹浮动元素的方法有2种。  

1. clearfix  
2. bfc  


