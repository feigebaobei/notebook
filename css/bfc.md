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

---

2018/08/16 by stone
