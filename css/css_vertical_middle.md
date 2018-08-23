css_vertical_middle.md

## 1.table-cell

    .ele {
        display: table-cell;
        vertical-align: middle;
    }

## 2.display:flex

    .ele {
        display: flex;
        justify-content: center;
        align-items: center;
    }

## 3.绝对定位和负边距

    .parent {
        position: relative;
    }
    .child {
        position: absolute;
        width: 100px;
        height: 50px;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -25px;
        text-align: center;
    }
    // 父元素使用相对定位。需要垂直居中的元素使用绝对定位到上下左右各50%的位置再用margin定位到50%的位置。

## 4.绝对定位和0

    // 不会

## 5.tanslate

    .parent {
        position: relative;
    }
    .child {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    // 绝对定位到中点这起点，再使用transform变换到中间的位置。

## 6.display:inline-block

    // 不会

## 7.display:flex,margin:auto

    .parent {
        display: flex;
    }
    .child {
        margin: auto
    }

## 8.display:-webkit-box;

    .parent {
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        -webkit-box-orient: vertical;
    }

## 9.display:-webkit-box;

    <div class="floater"></div>  
    <div class="content"> Content here </div>  
    .floater {
        float:left; 
        height:50%; 
        margin-bottom:-120px;
    }
    .content {
        clear:both; 
        height:240px; 
        position:relative;
    }

--- 

2018/08/02 by stone