# nvm

可以在同一台设备上安装node的多个版本，并实现各版本间的切换。  

## install

### win安装方法
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

### mac安装方法

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
// or
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
// tip
// 我在安装最新版时失败了。在安装0.33.8时成功了。
```

执行完安装语句后，不报错，则成功。
然后关闭terminal.
再打开terminal.输入：
```
nvm --version
```
若显示版本号，则安装成功。否则失败。

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


## 常见问题

### 问题
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
### 解决方法
在switchhost中添加
199.232.68.133      raw.githubusercontent.com

### 解决方法
把switchyomega的切换规则设置为`*.github.com`直接连接。点击应用选项。

### 问题
LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to raw.githubusercontent.com:443 
### 解决方法
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy

### 问题
ping githup.com超时
### 解决方法
进入这里https://github.com.ipaddress.com/，复制查询到的ip address。
在switchhost中添加`140.82.114.3        githum.com`

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

### 问题
刚安装了nvm后执行nvm,报：command not found: nvm
### 解决方法
在`/User/<userName>/.bash_profile`，若不存在则创建。再添加以下内容。
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

```

### 问题
zsh: command not found: nvm 解决方案
请确保是已经安装了。
如：再次安装时出现：nvm is already installed in /Users/cat/.nvm, trying to update using git
### 解决方法一

在`/User/<userName>/.bash_profile`，若不存在则创建。再添加以下内容。
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
然后执行：
```
source .base_profile
```
### 解决方法二
判断你使用的是`zsh`/`bash`
解决方法好像是（我没验证）：
若是zsh:
在`/User/<userName>/.zshrc`，若不存在则创建。再添加以下内容。
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
若是bash:
在`/User/<userName>/.bash_profile`，若不存在则创建。再添加以下内容。
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```










