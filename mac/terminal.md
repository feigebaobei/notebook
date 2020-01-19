|curl|wget|
|可以自定义各种参数，方便模拟web请求。|支持ftp/recursive。所以在下载方面更好。|
|||

打开finder command+shift+G /usr/local

# mac terminal 基本指令

## 1. cd

```
cd . // 切换到当前目录
cd .. // 切换到上一级目录
cd Desktop // 进入当前目录的指定子目录
cd / // 切换到系统根目录
cd ~ // 切换到当前用户的根目录
```

## 2. ls -l 详细信息 -a 包括隐藏文件
## 3. mkdir 新建文件夹
## 4. touch 新建文件
## 5. cp (拷贝文件)

```
cp originFile targetFile // 复制
cp rf originDir tragetDir // 深层复制
```

## 6. rmdir / rm

```
rm file // 删除文件。
rmdir emptyDirName // 删除空目录
rm -r dirName // 删除目录及内部文件
rm -rf dirName
rm -i fileName // 删除文件前提示
```

cp 参数 源文件 目标路径

  -a: <=> -dpR
  -d: 
## 6. mv 移动文件(可以用于重命名)
## 7. chmod 参数 权限 文件 (更改文件权限)
## 8. man 命令 查看命令的帮助
## 9. clear 清楚屏幕的内容

command + k

## 10. pwd 显示当前目录的路径
## 11. file fileName 显示文件类型
## 12. ps 参数 显示进程当前状态
## 13. kill 进程号 终止进程
## 14. date 显示系统的当前时期和时间
## 15. telnet 主机地址 远程登录
## 16. ping 主机地址 给一个网络主机发送回应请求
## 17. history 列出最近执行过的几条命令及编号
## 18. ifconfig 查看本机IP等配置信息
## 19. unrar rar文件 解压rar unzip zip文件 解压zip
## 20. mv oldName newName 重命名
## 21. which 命令 查看命令所有目录
## 22. whoami 查看当前用户
## 23. nano 文本编辑器
## 24. cat

```
cat filename // 打印文件内容
cat file0 file2
cat -n file // 显示行数
cat fileA > fileB // 使用fileA里的内容覆盖fileB里的内容。
cat fileA >> fileB // 在fileB里追加fileA里的内容。
```

## find 查找

```
find . -name "*.txt" -print
find *.txt
```

## open

```
open .
open dirName
open fileName
open /Application/Calculator.app
```

## man
## file 查看文件类型

```
file fileName
stat fileName
```
## exit 退出
## diff

```
# 指定两个文本文件进行
$ diff fileNameA fileNameB
# 并排格式输出更直观
$ diff fileNameA fileNameB -y -W 50

符号 | 表示该行内容不同
符号 < 表示后面文件比前面文件少一行
符号 > 表示后面文件比前面文件多一行
```

## echo 输出
## sudo
```
sudo shutdown -h how
sudo shutdown -h +10
sudo shutdown -h 20:00
```
## purge // 释放内存及硬盘、类似重启
## passwd 修改密码
## env
·```
env 查看全部环境变量
env $SSHELL 查看当前终端环境变量
env $PATH 查看当前用户环境变量
·```
## chmod 文件权限
