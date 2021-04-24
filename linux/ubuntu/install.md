# 安装软件

## 在线安装
apt command
apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。
apt install       安装软件包
apt remove        移除软件包
apt purge         移除软件包及配置文件
apt upgrade       升级所有可升级的软件包
apt autoremove    自动删除不需要的包
apt full-upgrate  在升级软件包是自动处理依赖关系
apt search        搜索应用程序
apt show          显示安装细节
apt list          列出包含条件的包（已安装/可升级等）
apt edit-source   编辑源列表
sudo apt-get install <name>
sudo apt-get remove <name>
sudo apt-get update         // 更新软件列表
sudo apt-get clean          // 清理软件包
## snap
snap是在Ubuntu 16 新添加的一种软件包格式。这种格式把软件运行所需的依赖全部打包到软件包里面， 运行的时候持载到一个虚拟的环境里面运行。所有这种格式的软件包安装时不会破坏系统现有的软件包依赖。
snap find name-key
snap info name
snap install name
snap refresh name
snap refresh
snap remove name

## 使用dpkg命令安装deb包
sudo dpkg -i name.deb

## 源码安装
一般源码的根目录下会有intall文件/readme文件/configure文件。
install文件：     安装命令文件
reademe文件：     说明文档
configure配置文件：该软件安装在当前系统中需要配置的要系统环境等。
1. 配置 运行`./configure`
2. 编译 make
3. 安装 `sudo make install`

# 安装输入法
`sudo apt-get install fcitx-table-wubi`
点击屏幕右上角的输入法图标，选择“重新启动”。
再点击屏幕右上角的输入法图标，选择“配置”。
再添加/删除输入法。


# install quiterss
看名字应该是一个rss.
sudo apt-get install quiterss

# install nvm

整体安装思路在github上：https://github.com/nvm-sh/nvm#installing-and-updating

## run script

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
// or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
// 若其中一个不能正常运行，则使用另一个。
// 注意更新版本。
```
## check result of install
关闭terminal，再打开terminal。
```
nvm --version
```
若显示相应版本号，则安装成功。
## usage(example)
```
nvm ls-remote        // 查看可安装的版本
nvm install <number> // 安装指定版本的node
nvm ls               // 查看已安装的node
node -v              // 查看正在运行的node版本
```