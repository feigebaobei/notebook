## git tag

git中的tag指向一个commit id.通常用它来做标记，如标记一个版本号。有commit id就可以进行回滚、比较等操作。

git tag // 列出标签
git tag tagName // 新建轻量级的标签
git tag -a tagName -m 'message' // 新建含附注的标签
git tag -s tagName -m 'message' // 新建签署标签
git show tagName // 查看标签。会看到commit id及修改的内容。
git push origin tagName // 把标签推到远端
git push origin --tags // 把本地所有没有推到远程的标签推到远程
git tag -d tagName // 删除指定标签