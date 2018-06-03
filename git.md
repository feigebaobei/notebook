#Git  

Git是目前世界上最先进的分布式版本控制系统（没有之一）。 
版本管理效果如下图。 
![gitVersions](./image/gitVersions.png)  

##install Git  

**linux**  

	sudo apt-get install git

**Mac OS**  

1. 一是安装homebrew，然后通过homebrew安装Git，具体方法请参考homebrew的文档：http://brew.sh/。
2. 第二种方法更简单，也是推荐的方法，就是直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode”->“Preferences”，在弹出窗口中找到“Downloads”，选择“Command Line Tools”，点“Install”就可以完成安装了。

**Windows**  

在Git官网直接下载安装程序

	$ git config --global user.name "Your Name"
	$ git config --global user.name "email@example.com"

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。  
也可以下载git for windows

##reate repository  

	$ mkdir learngit
	$ cd learngit
	$ pwd 
	/Users/michael/learngit
pwd命令用于显示当前目录。
	$ git init
在learngit文件夹下会创建一个叫.git的文件夹。  
git只能跟踪文本文件的改动  
*tip:*不要使用记事本写代码。请使用notepad++/sublime/...  
	$ git add <file>
	$ git commit

**修改、提交文件**  

当用户在修改过文档后  

	$ git status// 查看当前库的状态
	$ git diff// 查看被修改的地方
	$ git add readme.txt// 在提交前添加需要提交的文件
	$ git status
	$ git commit -m "message of resolve"//提交

##版本回退  
当反修改过的文本提交后都会有一个相应的版本号生成。如下图

	$ git log // 查看提交的日志
![git log](./image/gitLog.png)  

	$ git reset --hard HEAD^
`HEAD`表示当前版本  
`HEAD^`表示上一个版本  
`HEAD^^`表示上上个版本  
`HEAD~100`表示上100个版本  
`git reset`表示把版本重新设置为……版本  
`HEAD`是指向版本的指针  
![head](./image/gitHead.jpg)
![head](./image/gitHead1.jpg)

##版本前进  
在不关闭命令行窗口的情况下。我们还可以看到在执行`git log`时输出的各版本信息。  

	$ git reset --hard 2bee9c89
在`--hard`后写下版本号（可以不写全，git会帮我们找到，要从开头写，也叫做commit id）。  

	$ git reflot// 查看命令历史  

##工作区(working directory)  
工作区就是.git文件夹在的文件夹  

##版本库  
.git就是版本库  
Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区。在我们第一次创建仓库时会自动创建一个分支`master`。有一个`HEAR`指针指向`master`  
![](./image/gitwork2.jpg)  
从修改文件到提交文件需要做
1. 把修改过的文件添加到舞台。（添加到舞台后再修改文件还需要添加到舞台）
2. 把舞台内的文件提交。  

	$ git add <file> <file>
![](./image/gitwork0.jpg)

	$ git commit -m 'message'
![](./image/gitwork1.jpg)  
现在暂存区就没有任何东西了。  

##撤销修改
- 把修改过的文件没有添加到暂存区

	$ git checkout -- <file\> 
- 把修改过的文件已经添加到暂存区  

		$ git reset HEAD <file>
		$ git checkout -- <file>
##删除文件  
	$ rm <file>//git知道删除了文件，但是工作区和版本库不一致。这时需要下面这一步。
	$ git rm <file>
	$ git commit -m "message"
如果在`$ rm <file>`误删了。需要恢复回来。

	$ git checkout -- <file>
##远程仓库
