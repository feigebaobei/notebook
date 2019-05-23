建议使用 gitbook + typora + git  
gitbook 是一个构建文本工具。听说它处理百数量级以上时会慢。  
typora 是文本编辑器。  
git 是版本管理工具。  

## install

    // gitbooke
    npm i -g gitbook-cli
    gitbook -V
    // ...
    // typora
    https://typora.io/
    // git
    // ...

## usage

    mkdir mybook
    cd mybook
    gitbook init
    // 生成README.md(介绍) SUMMARY.md（目录结构）
    // SUMMARY.md
    # 目录
    * [前言]（README.md）
    *[第一章](chapter1/README.md)
        *[第一节：衣](chapter1/README.md)
    gitbook init // 需要翻墙
    // 根据目录生成文档
    gitbook serve
    // 预览本书
    gitbook build // 构建。默认生成到_book目录

    // gitbook build [bookpath] [outputpath]
    // gitbook serve --port 3333
    // gitbook pdf ./ ./mybook.pdf
    // gitbook epub ./ ./mybook.epub
    // gitbook mobi ./ ./mybook.mobi