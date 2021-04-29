# 源
源,在Ubuntu下,它相当于软件库,
sudo apt-get install  软件名 // install soft
sudo apt-get remove 软件名   // remove soft
## handle resouce
sudo gedit /etc/apt/sources.list
编辑
	deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse
sudo apt-get update

# 快速打开终端
## alt+f2 + gnome-terminal
## ctrl+alt+t

# install ubuntu
## download
下载uitralios/ubuntu
清空一个较大的u盘。
使用uitralios把ubuntu安装到u盘中。
## install
重启电脑，进入bios系统。
选择使用u盘启动。
选择相应配置。
重启系统。
## set


ubuntu 应该 把软件安装在哪个目录下？
https://blog.51cto.com/u_8780862/2372399 Ubuntu 操作系统的文件系统目录结构


```
/bin
	这是存放常用的终端命令的目录，例如：ls、mount、rm 等等。
/boot
	存放系统启动所需的文件，包括 linux kernel，一个随机存储磁盘镜像和 Bootloader 的配置文件。
/dev
	这个目录存放所有的设备文件，这些不是常规文件，而是指系统上的各种硬件设备，包括硬盘驱动器。
/etc
	存放系统的全局配置文件，这里面的配置文件会影响系统所有用户的系统环境。
/home
	用户的家目录，每个用户都有自己的家目录。
/lib
	存放非常重要的动态库和内核模块。
/media
	作为外部设备的一个挂载点，比如硬盘或者可移动设备（U盘、DVD、CD）。
/mnt
	和 /media 一样，也是一个挂载点，但是专用于挂载临时的设备，例如网络文件系统。
/opt
	用于安装系统额外的软件，这里安装的软件是手动安装的，不受 Ubuntu 软件管理包的管理。
/proc
	一个虚拟文件系统，为内核提供向进程发送信息的机制。
/root
	root 用户的家目录，不在 /home/ 中，即使 /home/ 不可用，也允许引导系统。
/run
	在引导过程的早期可用的tmpfs（临时文件系统），其中存储了临时运行时数据。此目录下的文件将在引导过程开始时删除或截断。
/sbin
	包含通常只应由超级用户使用的重要管理命令。
/srv
	包含 HTTP（/srv/www/）或 FTP 等服务的数据目录。
/sys
	可以访问的虚拟文件系统，用于设置或获取有关内核系统视图的信息。
/tmp
	应用程序使用的临时文件的位置。
/usr
	包含大多数用户实用程序和应用程序，并部分复制根目录结构，包括例如 /usr/bin/ 和 /usr/lib。
	一般在*.deb（由apt下载）在/usr/share。自己下载的压缩包/编译的包一般在/usr/local可/opt。
/var
	致力于可变数据，例如日志，数据库，网站和临时脱机（电子邮件等）文件，这些文件从一次启动到下一次启动。它包含的一个值得注意的目录是 /var/log，其中保存了系统日志文件。
```

# vim
## command
:w            保存文件
:w!           强制保存文件
:wq           保存文件后关闭
:wq!          强制保存文件后关闭
zz            相当于:wq
:q            关闭
:q!           强制关闭
:w filename   保存并关闭到filename
:w! filename  强制保存到filename
:wq! filename 强制保存并关闭到filename
## issue
保存时报E212
w ! sudo tee %
w    写入
!    强制
sudo 超管
tee  读取输入文件，同时保存
%    当前编辑文件


deb http://archive.ubuntu.com/ubuntu/ trusty main universe restricted multiverse








install
	node
	git
	translate
	chrome


如何使用
	quiterss
	vscode
	https://webassembly.org/

snap是什么

command 命令
commend 表扬
comment 评论
commit  触发





