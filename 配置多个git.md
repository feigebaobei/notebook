##生成一个ssh

  ssh-keygen -t rsa -C eamil@qq.com

第一次生成时默认名称为 `id_rsa` 你愿意改就改。  

##再生成一个ssh

1. 进入到 `.ssh` 目录下。若不做步需要在第二步时添加路径名。  
2. 第二次生成时的指纹文件名不能和已有的重名。这次必须改。比如改为 `id_rsa_` + companyname  

##在远程添加ssh文件

把前2步生成的ssh文件分别添加到相应的网站。  

##创建config文件

在.ssh文件夹下创建config文件（没有后缀名）。  
内容如下：  

  # 配置github.com
  Host github.com                 
      HostName github.com
      IdentityFile C:\\Users\\popfisher\\.ssh\\id_rsa_github
      PreferredAuthentications publickey
      User username1

  # 配置other.com
  Host other.com
      HostName other.com # 也可以是ip地址。
      IdentityFile C:\\Users\\popfisher\\.ssh\\id_rsa_oschina
      PreferredAuthentications publickey
      User username2

###解析config代码

`Host` 设置在使用 `git@`时后面的名字。 例： $ git clone git@other.com:repname/item.git  
`HostName` 设置域名地址或ip地址。  
`IdentityFile` 输入id_rsa的目录地址。  
`PreferrenAuthentications` 配置登录时使用什么仅限。可设为 `publickey` `password publickey` `keyboard-interactive`  
`User` 设置用户名。需要与远程的用户名一致。  

##设置giy配置

  $ git config --global user.name "常用name"
  $ git config --global user.email "常用email"
  $ git config --local user.name "当前目录使用的name"
  $ git config --local user.email "当前目录使用的email"

##查看配置

  $ git config --global --list
  $ git config --local --list // 查看当前目录的配置信息

##测试

  $ ssh -T git@github.com // 测试是否可以与github网站使用ssh交互。
  $ ssh -T git@other.com // 测试是否可以与other网站使用ssh交互。
  // 提示成功就是成功。提示失败就是失败。

##总结

整个配置过程就是使本地的用户名、用户邮箱、ssh与相应的远程用户名、用户邮箱、ssh相对应。  
若有任一不对应则不能正常运行。  

---

2018.09.18 by stone