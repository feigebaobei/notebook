# linux命令
## tail

查看文件内容

`tail [params] [fileName]`

|||||
|-|-|-|-|
|-f|跟踪文件，若变化则更新后在终端输出。|||
|-q|不显示处理信息|||
|-v|详细的处理信息|||
|-c <数目>|显示文件的字节数|||
|-n <数目>|显示文件尾部n行|||
|--pid=PID|与-f一起使用，在ID,PID死掉后结束。|||
|-q, --quit, --silent|从不输出给定文件名的首部|||
|-s, --sleep-interval=S|与-f一起使用，每次反复的间隔休眠s秒。|||