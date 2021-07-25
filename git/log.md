4 overview
显示提交日志
```
git log [<opitons>] [<revision range>] [[--] <path>...]
```

# options
||||||||
|-|-|-|-|-|-|-|
|-p|列出每次commit与上一次之间的差异。类似diff||||||
|--stat|列出每次commit的文件/行数。||||||
|--shortstat|列出修改的行数||||||
|--name-only|列出修改过的文件||||||
|--name-status|列出新增/修改/删除的文件清单||||||
|--abbrev-commit|列出commit id的前几个字符||||||
|--relative-date|列出短时间值||||||
|--graph|列出commit图||||||
|-n|列出n条log||||||
|--after|列出指定时刻以后的commit信息||||||
|--until|同--after||||||
|--before|列出指定时刻以前的commit信息||||||
|--since|同--before||||||
|--author|||||||
|-- <file.ext>|按文件列出commit||||||
|--<branch>|按分支列出commit||||||
|-S"<string>" / -G"<string>"|按文本列出commit||||||
|--no-merges|忽略merge commit||||||
|<tag>|列出指定tag前的commit||||||
|<commit>|列出指定commit之前的commit.||||||
|<commit1> <commit2>|列出2个commit之间的commit||||||
