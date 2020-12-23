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

## lsof

输出各列信息的意义如下：
COMMAND：进程的名称 PID：进程标识符
USER：进程所有者
FD：文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等 TYPE：文件类型，如DIR、REG等
DEVICE：指定磁盘的名称
SIZE：文件的大小
NODE：索引节点（文件在磁盘上的标识）
NAME：打开文件的确切名称

```
lsof -i
lsof -i<port>
```

## ps

`ps [-aefFly] [-p pid] [-u userid]`

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

## source

也称为点命令，常用于执行`.文件`。它是bash内部命令。
功能：使shell读入指定的shell文件。依次执行文件中的所有语句。
source命令通常用于重新执行刚修改的初始化文件。使之立即生效。不必注销并重新登录。

### usage

```
source .filename
// or
source filename
```

| sh filename | source filename |
|-|-|
|新建一个shell文件，再执行脚本文件，该子shell继承父shell的环境变量，但子shell新建的、修改的变量不会带加到父shell中，除非使用export|使用当前shell执行该脚本文件。新建、修改的变量都会作用于当前shell.|
