1. macOS (linux) 缺乏的软件包的管理器。
可以安装apply没有以预装的软件。`brew install wget`
将软件安装到独立目录，并将其文件软链接到/usr/local
homebrew不会把文件安装到本身目录之外，所以您可以将它安装在任意位置。
可以创建homebrew包。
可以完全基于git/ruby开发。
homebrew的配方都是ruby的脚本。
使用gem安装rubygems，使用brew安装依赖包。
使用`brew cask`安装macOS应用程序、字体、插件及其他非开源软件。
可以创建一个cask。`brew cask create foo`

## install
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## create homebrew package

```
brew create https://foo.com/bar-1.0.tgz
Created /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/bar.rb
```

# mac install brew

## 方法一
略
## 方法二
略
## 方法三

在![https://github.com/feigebaobei/notebook/blob/master/packageManager/brew/brew_install.rb](https://github.com/feigebaobei/notebook/blob/master/packageManager/brew/brew_install.rb)下载brew_install.rb
```
cd ~
vim brew_install.rb
把下载的内容复制到这个文件中。保存并退出文件。
ruby brew_install.rb
```
等待若干时间。
安装完成。
完成后就可以删除brew_install.rb了。
