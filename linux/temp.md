# linux

它是开源的，主要运用在服务器上。
主要运维人员使用。

## install

### 1. 先安装虚拟机。

[教程](https://blog.csdn.net/poppy_rain/article/details/98681531)
[下载网站](http://www.pc6.com/pc/Macvirt/)

### 2. 下载contos

  http://isoredirect.centos.org/centos/8/isos/x86_64/CentOS-8.1.1911-x86_64-dvd1.iso （推荐）
  http://mirrors.aliyun.com/centos/7/isos/x86_64/
  http://mirrors.aliyun.com/centos/8/isos/x86_64/
    *-DVD-1908.iso // 标准版 （推荐）
    *-Everything-1908.iso // 完整版
    *-Minimal-1908.iso // 精简版



tar [-ABcdgGhiklmMoOpPrRsStuUvwWxzZ][-b <区块数目>][-C <目的目录>][-f <备份文件>][-F <Script文件>][-K <文件>][-L <媒体容量>][-N <日期时间>][-T <范本文件>][-V <卷册名称>][-X <范本文件>][-<设备编号><存储密度>][--after-date=<日期时间>][--atime-preserve][--backuup=<备份方式>][--checkpoint][--concatenate][--confirmation][--delete][--exclude=<范本样式>][--force-local][--group=<群组名称>][--help][--ignore-failed-read][--new-volume-script=<Script文件>][--newer-mtime][--no-recursion][--null][--numeric-owner][--owner=<用户名称>][--posix][--erve][--preserve-order][--preserve-permissions][--record-size=<区块数目>][--recursive-unlink][--remove-files][--rsh-command=<执行指令>][--same-owner][--suffix=<备份字尾字符串>][--totals][--use-compress-program=<执行指令>][--version][--volno-file=<编号文件>][文件或目录...]

|dir|subdir|describe|||
|-|-|-|-|-|
|bin||bin是Binary的缩写。这个目录存放着最经常使用的命令。|||
|boot||存放的是启动Linux时使用的一些核心文件，包括一些链接文件以及镜像文件。 |||
|dev||dev是Device(设备)的缩写。该目录下存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。|||
|etc||这个目录用来存放所有的系统管理所需要的配置文件和子目录。 |||
|home||用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。 |||
|lib||这个目录里存放着系统最基本的动态链接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。 |||
|lost|+found|一般情况下是空的，当系统非法关机后，这里就存放了一些文件。 |||
|mnt||这里面中有四个目录，系统提供这些目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/cdrom上，然后进入该目录就可以查看光驱里的内容了。 |||
|proc||是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器： `echo 1 >; /proc/sys/net/ipv4/icmp_echo_ignore_all`|||
|root||该目录为系统管理员，也称作超级权限者的用户主目录。|||
|sbin||s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。|||
|tmp||这个目录是用来存放一些临时文件的。|||
|usr||很多应用程序和文件几乎都存放在usr目录下||
|usr|X11R6|存放X-Windows的目录||
|usr|games|存放着XteamLinux自带的小游戏||
|usr|bin|存放着许多应用程序||
|usr|sbin|存放root超级用户使用的管理程序||
|usr|doc|Linux技术文档||
|usr|include|用来存放Linux下开发和编译应用程序所需要的头文件||
|usr|lib|存放一些常用的动态链接共享库和静态档案库||
|usr|local|这是提供给一般用户的/usr目录，在这里安装一般的应用软件；||
|usr|man|帮助文档所在的目录||
|usr|src|Linux开放的源代码，就存在这个目录，爱好者们别放过哦；||
|var||这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。如果你想做一个网站，你也会用到/var/www这个目录||

## scp

scp [可选参数] file_source file_target

scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
[-l limit] [-o ssh_option] [-P port] [-S program]
[[user@]host1:]file1 [...] [[user@]host2:]file2

- 1： 强制scp命令使用协议ssh1
- 2： 强制scp命令使用协议ssh2
- 4： 强制scp命令只使用IPv4寻址
- 6： 强制scp命令只使用IPv6寻址
- B： 使用批处理模式（传输过程中不询问传输口令或短语）
- C： 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
- p：保留原文件的修改时间，访问时间和访问权限。
- q： 不显示传输进度条。
- r： 递归复制整个目录。
- v：详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
- c cipher： 以cipher将数据传输进行加密，这个选项将直接传递给ssh。
- F ssh_config： 指定一个替代的ssh配置文件，此参数直接传递给ssh。
- i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。
- l limit： 限定用户所能使用的带宽，以Kbit/s为单位。
- o ssh_option： 如果习惯于使用ssh_config(5)中的参数传递方式，
- P port：注意是大写的P, port是指定数据传输用到的端口号
- S program： 指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。

从本地复制到远程
scp local_file remote_username@remote_ip:remote:folder
scp -r /Users/feige/Documents/code/github/mockvue/dist root@47.93.62.0:/var/www
从远程复制到本地
scp remote_username@remote_ip:remote:folder local_file
scp -r root@47.93.62.0:/var/www /Users/feige/Documents/code/github/mockvue/dist



var `ls`
adm    crash  empty  gopher    lib    lock  mail  opt       run    tmp  yp
cache  db     games  kerberos  local  log   nis   preserve  spool  www