##1. 介绍
brew是一个软件包管理工具,类似于centos下的yum或者ubuntu下的apt-get,非常方便,免去了自己手动编译安装的不便  
brew 安装目录 /usr/local/Cellar  
brew 配置目录 /usr/local/etc  
brew 命令目录 /usr/local/bin   注:homebrew在安装完成后自动在/usr/local/bin加个软连接，所以平常都是用这个路径  

##2. 安装和基本使用
安装方法:ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  
常用命令:  
brew update                        　　#更新brew可安装包，建议每次执行一下  
brew search php55                   #搜索php5.5  
brew tap josegonzalez/php        #安装扩展<gihhub_user/repo>   ,可以获得更多的资源  
brew tap                            #查看安装的扩展列表  
brew install php55                 #安装php5.5  
brew remove  php55                 #卸载php5.5  
brew upgrade php55                 #升级php5.5  
brew options php55                 #查看php5.5安装选项  
brew info    php55                 #查看php5.5相关信息  
brew home    php55                  #访问php5.5官方网站  
brew services list                  #查看系统通过 brew 安装的服务  
brew services cleanup               #清除已卸载无用的启动配置文件  
brew services restart php55       #重启php-fpm  

##3. 替换homebrew镜像源(自己选择)
由于homebrew上面的东西 很多要么被墙,要么死慢,需要换brew源(分为两部分)  
 
替换homebrew默认源  
　　cd "$(brew --repo)" 　　//这个命令会进入到相应目录,可以pwd查看下  
　　cd "$(brew --repo)" git remote set-url origin git://mirrors.ustc.edu.cn/brew.git  
Homebrew Bottles源(二进制代码包)  
　　echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile  
　　source ~/.bash_profile  
更新  
　　brew update  

##4. brew被墙的另一种解决
因为 brew 是支持全局代理的，我们只需要在当前环境当中加入代理配置即可。我跳出去的软件是shadowsocks(不懂得自行百度即可),当然,如果你选择了上面的换源操作,可以忽略这里  
 
只需在命令行中输入 export ALL_PROXY=socks5://127.0.0.1:1080  
 
如果你想一劳永逸,就将其写在配置文件中,  
如果你的终端是默认的bash就写在~/.bash+profile中,  
echo export ALL_PROXY=socks5://127.0.0.1:1080 >> ~/.bash_profile  
如果你的终端是zsh,那就写在~/.zshrc中  
echo export ALL_PROXY=socks5://127.0.0.1:1080 >> ~/.zsh_profil  
不过以上的弊端就是,可能你大部分终端的命令都会使用代理了  