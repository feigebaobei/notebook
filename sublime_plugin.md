#sublime plugin
##package control
包管理器  
view > show console  

import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

##markdownediting
markdown插件  
快捷键： 

- command + option + k 插入链接
- command + option + k 插入图片

##omnimarkuppreviewer
可视化md文件。可实时更新。  

快捷键：  

- command + option + o 在浏览器中预览  
- command + option + x 导出html
- command + option + c html标记拷贝到剪贴板
- ctrl + alt + o 在浏览器中预览  
- ctrl + alt + x 导出html
- ctrl + alt + c html标记拷贝到剪贴板