# introduction

可以表格化显示数据。  
一般用于前后端不分离。  

# basis

    <head>
        <!-- 可能需要它们 start -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <!-- 可能需要它们 end -->
        <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.14.2/dist/bootstrap-table.min.css">
        <!-- 可能需要它们 start -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
        <!-- 可能需要它们 end -->
        <script src="https://unpkg.com/bootstrap-table@1.14.2/dist/bootstrap-table.min.js"></script>
    </head>

#install

    link 如上
    npm i bootstrap-table

# usage

    no.1
    // html
    <table id="mytab"></table>
    // js
    $('#mytab').bootstrapTable({
        // 各配置项
    })
    no.2
    <table data-toggle="table" data-url="data1.json">
        <thead>
            <tr>
                <th data-field="fid"></th>
                <th data-field="fname"></th>
                <th data-field="fvalue"></th>
            </tr>
        </thead>
    </table>

# api

表格的默认属性： `jQuery.fn.bootstrapTable.defaults`  

no.1 : 不用js 就激活bootstrapTable  
    使用`data-toggle`属性。  
    所有的属性都可以使用`data-`+属性名定义属性及值。（如：`data-height='100'`）  

no.2 使用js设置bootstrapTable (推荐使用这个方法。)  

|table options|||||
|-|-|-|-|-|
|height
|classes
|theadClasses
|rowStyle
|rowAttributes
|undefinedText
|locale
|sortable
|sortClass
|silentSort
|sortName
|sortOrder
|sortStable
|rememberOrder
|customSort
|customSort
|columns
|data
|url
|method
|cache
|contentType
|dataType
|ajax
|ajaxOptions
|queryParams
|queryParamsType
|responseHandler
|totalField
|totalField
dataField
pagination
onlyInfoPagination
paginationLoop
sidePagination
totalRow
pageNumber
pageSize

|column options|||||
|-|-|-|-|-|
||||||

|events|||||
|-|-|-|-|-|
||||||

|methods|||||
|-|-|-|-|-|
||||||

|localizations|||||
|-|-|-|-|-|
||||||
