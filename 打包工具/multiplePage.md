#vue+webpack多页面应用
从git上初始化的vue项目框架是单页面的。单页面应用可以实现大部分页面web应用开发。若要用到多页面需要需要配置。这篇文章就说说怎么应用多页面应用。  
多页面应用就是几个单页面应用在一起。  
这篇文章使用的是vue2.+,webpack3.+
**总共有5步**  
我们从安装好一个单页面应用说起。  
1. **创建一个vue项目。**  
2. **创建模板html文件，入口文件，vue文件。**  
一般在根据目录下面有一个index.html文件。它是页面的html模板文件。一个模板文件就是一个单页面应用，按需创建模板。
在多页面应用中，因为有多个应用模板，所以建议把应用模板html放在一个文件夹里。不放也没关系。例如：  
![](./image/multiplePage0.png)  
创建每个单页面应用的入口文件。（*.js）  
![](./image/multiplePage1.png)  
每一个单页面的三个文件（*.js, *.vue, *.html）都得对应上。
![](./image/multiplePage2.png)  
3. **定义入口文件。**  
因为webpack有2个环境（1.开发环境。2.生产环境。）所以这2个环境都需要配置。这步是作用于开发环境的。  
![](./image/multiplePage3.png)  
打开webpack.base.conf.js文件。在入口选项中输入入口文件的路径及变量名。如：  
![](./image/multiplePage4.png)  
4. **配置开发环境。**  
打开webpack.dev.conf.js文件。在plugins选项中设置各单页面应用的htmlwebpackplugin配置。记得修改首页的配置。如：  
![](./image/multiplePage5.png)  
5. **配置生产环境。**  
在index.js文件中的build选项中设置模板路径。如：  
![](./image/multiplePage6.png)  
在webpack.prod.conf.js文件。在plugins选项中设置各单页面应用的htmlwebpackplugin配置。在首页的配置中添加了chunksSortMode,chunks选项。添加各页面的htmlwebpackplugin插件配置。如：  
![](./image/multiplePage7.png)  

**tip**  
能用单页面应用的，不使用多页面应用。基本上单页面都能解决问题。页面跳转可以使用this.$router.push(....)搞定。
---

2018/05/22 by stone
