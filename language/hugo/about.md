# about hugo

hugo不是一般的静态网站生成器。

## Hugo's security model
hugo的安全模块的概要。

### runtime security

hugo是输出静态文件的，所以一旦在项目的构建，则运行时浏览器会与创建的任意的api一起运行。
但是在开发、构建网站时，运行hugo是一个挑战。

#### hugo's main approach is that of sandboxing

- hugo有一个虚拟文件系统并且只能在项目文件的根目录里。
只有主项目可以使用符号链接。
文件系统对于用户自定义的组件只能读取。
我们可以使用有ascii码和一个内置的标致库。生成函数可以运行在任意的OS commands.

### dependency security

hugo使用go modules创建静态库。go modules有几个保护措施。其中之一是go.sum文件。它是一个你的全部的依赖的期待的加密检验和的数据集，including any transitive.
hugo modules是基于go modules的创建的。hugo项目使用hugo mudules将有一个go.sum文件。我们推荐你托管你的版本管理系统。若没有匹配检验和，则会在显示依赖干预。

### web application security

owasp (open web application security project)
有一些安全威胁被定义为owasp.
对于html输出有一些核心的[安全模块](https://golang.org/pkg/html/template/#hdr-Security_Model)
大概内容如下：
模板可以被信任（因为是你做的），但是数据不能被信任。这就是为什么有时候需要使用安全方法。如`safeHTML`，来避免一些你认为是安全的，但实际是不安全的数据。在这个文档里有一个例外：如果您启用了内联短代码，您还会说内容文件中的短代码和数据处理是受信任的，因为这些宏被视为纯文本。值得补充的是，Hugo是一个静态站点生成器，没有动态用户输入的概念。