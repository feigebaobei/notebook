# nvm

可以在同一台设备上安装node的多个版本，并实现各版本间的切换。  

## install

去[官网](https://github.com/coreybutler/nvm-windows/releases)下载再安装。  

|版本|说明|-|
|-|-|-|
|nvm-noinstall.zip|免安装版本（绿色版本）。需要设计配置。||
|nvm-noinstall.zip.checksum.txt|||
|nvm-setup.zip|安装版本。不需要设计配置。||
|nvm-setup.zip.checksum.txt|||
|source code(zip)|源码||
|source code(tar.gz)|源码。一般用于*nix系统||

我使用的nvm-setup.zip.  

## setting

nvm提示安装的目录不要有空格。我使用的`D:\softtool\nvm`。  
环境变量使用的默认路径。`C:\Program Files\nodejs`  

    nvm -v // 验证是否安装成功。

## usage

    nvm install x.x.x // 安装 x.x.x (版本) node
    nvm use x.x.x // 使用 x.x.x (版本) node

## api

||||
|-|-|-|
|`nvm arch `|显示当前node是32或64位|
|`nvm install <version> [arch]`|安装相应版本、位长的node|
|`nvm list [available]`|列出已经安装的node.|
|`nvm on`|打开node.js的版本管理|
|`nvm off`|关闭node.js的版本管理|
|`nvm proxy [url]`|设置下载node的代理url|
|`nvm node_mirror [url]`|设置node的镜向。默认是`https://nodejs.org/dist/`|
|`nvm npm_mirror [url]`|设置npm的镜向。默认是`https://github.com/npm/cli/archive/`|
|`nvm uninstall <version>`|卸载相应版本node|
|`nvm use [version] <arch>`|切换到指定版本、位长的node.|
|`nvm root [path]`|设置在哪个目录下保存不同版本的node.|
|`nvm version`|显示nvm的版本号。在window环境下可以使用v.|
