and()                      是should()的别名。
as()                       定义一个别名，用于后面的cy.get()/cy.wait()
blur()                     xxxx
check()                    check checkbox/radio
children()                 获取子元素
clear()                    清空input/textarea
clearCookie(name, opt)     清空指定的cookie
clearCookies               清空所有cookie
clearLocalStorage          清空指定的ls
click                      单击该dom
clock                      不会
closet                     获取选中dom中的第一个
contains                   获取dom元素的包含的text
dblclick                   双击选中元素
debug                      在前一个命令后设置debug/log
document                   get window.document
each((value, index, collection) => {...})             像iterable一样迭代
end                        结束cy链
eq(n)                      取指定的第n个元素。从0开始
exec                       execute a system command
filter                     过滤dom元素
find                       获取派生的dom或获取符合指定选择器的元素
first                      get第一个dom
fixture                    加载本地数据
focus                      xxxx
focused                    获取聚焦的元素
get                        get dom
getCookie                  get指定的cookie
getCookies                 get所有cookie
go                         操作浏览历史
hash                       get url中的fragment。（为什么cypress的fragment叫做hash）
hover                      <被弃用>
intercept                  不会。好像是模拟一个请求
invoke                     执行前一个命令结果中的方法
its                        获取前一个命令的结果中的指定属性
last                       get最后一个dom
location                   get window.location
log                        xxxx
next                       get下一个dom
nextAll                    get同级的后面的dom
nextUntil                  get同级的后面的直到指定元素
not                        过滤掉不是指定选择器的dom
parent                     get dom parent
parents                    get parents
parentsUntil               xxxx
pause                      xxxx
prev                       get同级的前一个dom
prevAll                    xxxx
prevUntil                  xxxx
readFile                   读取文件的内容
reload                     重新加载页面
request                    make an http request
rightclick                 xxxx
root                       get root dom
route                      操作路由
screenshot                 截屏
scrollIntoView             把元素滚动到视窗内
scrollTo                   把视频滚动到指定位置
select                     选中select元素的option
server                     不会
setCookie                  xxxx
shadow                     遍历shadow元素
should                     执行一个断言
siblings                   get sibling dom
spread((arr) => {...})     对arr操作
spy(obj, fnString)         把方法包装到syp中，为了记录该函数的调用和参数
stub(obj, fnString)        替换一个函数，记录它的用法并控制它的行为。
submit                     xxxx
task                       xxxx
then                       xxxx
tick                       不会。好像是在cy.clock()后使用，覆盖当前时间。
title                      xxxx
trigger                    xxxx
type                       键入
uncheck                    xxxx
url                        get url
viewport                   操作视窗
visit                      xxxx
wait                       等待若干时间或等到别名指定的元素。会执行其后面的命令。
window                     xxxx
within                     将后续的命令作用域限定到引元素。
writeFile                  xxxx







获取dom
    children
    closest
    contains
    document
    eq
    filter
    find
    first
    get
    last
    location
    next
    nextAll
    nextUntil
    not
    parent
    parents
    parentsUntil
    prev
    prevAll
    prevUntil
    root
    siblings
    title
    window

操作dom
    blur
    check
    clear
    click
    dblclick
    focus
    rightclick
    select
    trigger
    type
    uncheck
    within

cookie/ls/ss
    clearCookie
    clearCookies
    clearLocalStorage
    getCookie
    getCookies
    setCookie

url/route/histore
    go
    hash
    route
    url

滚动
    scrollIntoView
    scrollTo
    
方法调用
    debug
    each
    end
    exec
    fixture
    intercept
    invoke
    its
    log
    pause
    readFile
    reload
    request
    screenshot
    shadow
    spread
    task
    then
    tick
    viewport
    visit
    wait
    writeFile

断言
    and
    should