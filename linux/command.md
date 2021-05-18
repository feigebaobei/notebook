linux下的命令

# rm

`rm <options> dir|file`

## options

|options|||||
|-|-|-|-|-|
|-f/--force|强制删除，不要求确认||||
|-i|每删除一个文件或一个子目录都要求确认||||
|-I|在删除超过三个文件或才递归删除前要求确认||||
|-r/-R|递归删除子目录||||
|-d/-dir|删除空目录||||
|-v/-verbose|显示删除结果||||

# cp
复制
```
cp dirSource/file.doc dirTarget
cp -r dirSource/. dirTarget
cp -r dirSource/. dirTarget
```

# mv
移动
```
mv source target
```
# scp

# touch
修改文件、目录的时间属性。若文件不存在，则创建文件。
```
touch [-acfm] [-d<日期时间>] [-r<参考文件或目录>] [-t<日期时间>] [--help] [--version] [文件或目录……]
```
a 改变档案的读取时间记录。
m 改变档案的修改时间记录。
c 假如目的档案不存在，不会建立新的档案。与 --no-create 的效果一样。
f 不使用，是为了与其他 unix 系统的相容性而保留。
r 使用参考档的时间记录，与 --file 的效果一样。
d 设定时间与日期，可以使用各种不同的格式。
t 设定档案的时间记录，格式与 date 指令相同。
--no-create 不会建立新档案。
--help 列出指令格式。
