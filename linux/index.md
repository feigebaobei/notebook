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

```
lsof -i:<port> // 无返回信息，则未开启该端口。
COMMAND: 进程名称
PID:     进程标识
TYPE:    文件类型
USER:    所属用户
FD:      文件描述
DEVICE:  指定磁盘的名称
SIZE:    文件的大小
NODE:    索引节点
NAME:    打开文件的确切名称
```
## netstat

|options|||
|-|-|-|
|-a|all|所有连接|
|-t|tcp|所有tcp连接|
|-u|udp|所有udp连接|
|-l|listening|监听的服务|
|-p|program(pid)|程序的pid|

## 杀死进程

```
kill -9 <pid>
```

## ps

## 常用命令
cat
date 显示系统时间
cd
pwd
ls
mkdir
rm -f fileName
rmdir dir
cp f1 f2
mv dir newDir