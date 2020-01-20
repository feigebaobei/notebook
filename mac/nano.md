一个在终端运行的文本编辑器。
```
nano [fileName]
```

## shortcut key

保存 control + o
剪切行 control + k
粘贴 control + u
搜索 control + w
上翻页 control + y
下翻页 control + v
退出 control + x

## command

```
-h, -?               --help                             显示帮助信息 
+行,列                                                 从所指列数与行数开始     
-A                   --smarthome                        启用智能 HOME 键 
-B                   --backup                         储存既有文件的备份 
-C <目录>             --backupdir=<目录>                用以储存独一备份文件的目录 
-D                   --boldtext                         用粗体替代颜色反转 
-E                   --tabstospaces                     将已输入的制表符转换为空白 
-F                   --multibuffer                   启用多重文件缓冲区功能 
-H                   --historylog                     记录与读取搜索/替换的历史字符串 
-I                   --ignorercfiles                   不要参考nanorc 文件 
-K                   --rebindkeypad                     修正数字键区按键混淆问题 
-L                   --nonewlines                     不要将换行加到文件末端 
-N                   --noconvert                       不要从 DOS/Mac 格式转换 
-O                   --morespace                        编辑时多使用一行
-Q <字符串>         --quotestr=<字符串>                引用代表字符串 
-R                   --restricted                     限制模式 
-S                   --smooth                          按行滚动而不是半屏 
-T <#列数>         --tabsize=<#列数>                    设定制表符宽度为#列数 
-U                   --quickblank                     状态行快速闪动 
-V                   --version                      显示版本资讯并离开 
-W                   --wordbounds                    更正确地侦测单字边界 
-Y <字符串>         --syntax=<字符串>                   用于加亮的语法定义 
-c                   --const                          持续显示游标位置 
-d                   --rebinddelete                    修正退格键/删除键混淆问题 
-i                   --autoindent                     自动缩进新行 
-k                   --cut                          从游标剪切至行尾 
-l                   --nofollow                        不要依照符号连结，而是覆盖 
-m                   --mouse                          启用鼠标功能 
-o <目录>          --operatingdir=<目录>               设定操作目录 
-p                   --preserve                        保留XON (^Q) 和XOFF (^S) 按键 
-q                   --quiet                          沉默忽略启动问题, 比如rc 文件错误 
-r<#列数>      --fill=<#列数>                      设定折行宽度为 #列数 
-s<程序>       --speller=<程序>                      启用替代的拼写检查程序 
-t                   --tempfile                        离开时自动储存，不要提示 
-u                   --undo                            允许通用撤销[试验性特性] 
-v                   --view                            查看(只读)模式 
-w                   --nowrap                        不要自动换行 
-x                   --nohelp                        不要显示辅助区 
-z                   --suspend                      启用暂停功能 
-$                   --softwrap                        启用软换行 
-a, -b, -e, -f, -g, -j                              (忽略，为与pico 相容)
```