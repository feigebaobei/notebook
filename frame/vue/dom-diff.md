# dom-diff

1. 使用js对象模拟dom树（虚拟dom）
2. 渲染(render) 虚拟dom => dom
3. 若修改了虚拟dom.则比较2棵虚拟dom树的差异，得到差异对象（diff）
4. 把差异对象应用到dom树上。（patch）
