#sublime plugin
##package control
包管理器  
view > show console  

import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

##emmet
html/css/js 提示关键字。

##markdownediting
markdown插件  
快捷键： 

- command + option + k 插入链接
- command + option + k 插入图片

##markdownpreview
markdown插件可以实现在浏览器中实时浏览。  

preference -> key binding-user
{
  { "keys": ["alt+m"], "command": "markdown_preview", "args": {"target": "browser", "parser":"markdown"} }
}

快捷键： 

- alt + m 在默认浏览器中打开

##omnimarkuppreviewer
可视化md文件。可实时更新。  

快捷键：  

- command + option + o 在浏览器中预览  
- command + option + x 导出html
- command + option + c html标记拷贝到剪贴板
- ctrl + alt + o 在浏览器中预览  
- ctrl + alt + x 导出html
- ctrl + alt + c html标记拷贝到剪贴板

##Imesupport
在使用sublime时输入法跟随光标。

## sidebarenhancements
增强右键菜单文件。  

##less
less语言高亮  

## less2css
监测less文件改动时编译为css文件。
建议使用koala、grunt。

## alignment 
=对齐
可设置更多的对齐方法
打开 preference -> package setting -> alignment -> setting user
输入 "alignment_chars": ["=", "//"]
默认是ctrl+alt+a。可设置为ctrl+shift+alt+a.重启sublime后可使用。  

##sublime-autoprefixer
为css添加私有前缀。  
使用方法：。。。。  

##Jimbly's clipboard history
粘贴板历史记录。  
ctrl+shift+v显示复制的记录。  

##bracket highlighter
代码匹配。  

##git

使用方法。。。。

##docblockr
生成优美注释。  

##colorpicker
调色板
ctrl+shift+c

##autofilename  
自动完成文件名的输入。  

##nodejs
提示node代码。

##trailing sapces
检测并去除多余空格  
(需要配置)ctrl+shift+t

##filediffs
文件对比工具。  

##gitgutter  
指示代码插入删除的位置。  

##chineslocalistion
当地汉化包。  

##latexBox

##html/css/js prettify
格式化html/css/js  
1. 在html/css/js文件中右击。  
2. html/css/js prettify -> set plugin options  
3. 在打开的文件中设置node的路径。  

    "node.path": {
      "windows": "D:/path/to/node",
      "linux": "D:/path/to/node",
      "osx": "D:/path/to/node"
    }
使用:ctrl+shift+h  
右击-html/css/js prettify - prettify code

F5  开始调试
Ctrl+F5 停止调试
F9  设置断点
F10 Step over，执行一步，不进入函数
F11 Step into，进入函数
Shift+F11 Step out，跳出函数

## gogdb

## gosublime
使用git下载后放在pakeage里。

## sublimegdb
可以调试代码

##删除插件
1. ctrl+shift+p  
2. remove package  
3. name // 输入插件的名称  

## typescript
Rename	^T ^M
Find references	^T ^R
Next reference	^T ^N
Prev reference	^T ^P
Format document	^T ^F
Format selection	^T ^F
Format line	^;
Format braces	^ Shift ]
Navigate to symbol	^ Alt R
Go to definition	^T^D or F12
Trigger completion	^Space
Trigger signature help	Alt+,
See previous signature in the tooltip	Alt + up
See next signature in the tooltip	Alt + down
Paste and format	^V or ⌘V
Quick info	^T ^Q
Build	(Win)^B or F7, (OSX) ⌘B or F7
Error list	(via Command Palette)

## 常见问题

### 问题
There are no packages available for installation
### 解决方案
sublime text -> Preference -> Package Settings -> Package Control -> Settings
在打开的文件中添加：
```
"channels": ["http://cst.stu.126.net/u/json/cms/channel_v3.json"],
```

### 问题
Unable to download Emmet. Please view the console for more details.
### 解决方案
sublime text -> Preference -> Package Settings -> Package Control -> Settings
在打开的文件中添加：
```
"debug": true,
"downloader_precedence": {
  "linux": ["curl", "urllib", "wget"],
  "osx": ["curl", "urllib"],
  "windows": ["wininet"],
},
```

### 问题
Error while loading PyV8 binary: exit code 1 
Try to manually install PyV8 from
https://github.com/emmetio/pyv8-binaries
### 解决方案（没解决）
把`https://github.com/feigebaobei/notebook/blob/master/plugin/editer/PyV8`复制到`/Users/cat/Library/Application Support/Sublime Text/Installed Packages/`


