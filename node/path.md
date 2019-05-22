用来处理文件的目录。  

    const path = require('path')

区别2个平台： `windows`/`POSIX`(Portable operating system interface of UNIX 可移植操作系统接口)  

    // poxis
    ---------------------------------------
    |     dir              |      base    |
    --------               ----------------
    | root |               | name |  ext  |
    |  "/    home/user/dir / file   .txt" |
    ---------------------------------------
    // window
    ---------------------------------------
    |     dir              |      base    |
    --------               ----------------
    | root |               | name |  ext  |
    |  "C:\  home\user\dir \ file   .txt" |
    ---------------------------------------

||||||
|-|-|-|-|-|
|basename(path[, ext])|基本名字。若存在ext则返回filename.否则返回filename.ext|
|delimiter|返回平台的路径定界符||||
|dirname(path)|返回dir部分.string||||
|extname(path)|返回ext部分。string||||
|format(pathObject)|返回path。string||||
|parse(path)|返回pathObject.obj||||
|isAbsolute(path)|是否是绝对路径||||
|join([...path])|返回path。string.把path拼接起来。||||
|normalize(path)|返回规范化的path||||
|posix()|||||
|relative(from, to)|返回相对与from的to的相对路径。string||||
|resolve([...path])|从右向左依次解析为path.string||||
|sep|返回平台特定的分割符||||
|toNamespacedPath(path)||||||
|win32|||||
