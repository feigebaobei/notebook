# 前端项目的工程化和自动化

grunt gulp browserify webpack
Grunt，Gulp 和 Webpack 的地位，我是这么认为的：
Grunt 是开创者 Grunt 的出现是前端构建工具从0到1的变革，是具有开创意义的。在它之前我们经常都是通过 bash 或者 make 调用 closure-compiler 之类的工具。前端并不存在一个统一的构建工具和标准，甚至我们自己写过一些简单的构建工具。Grunt的出现终结了这种混乱的局面，前端领域有了自己的构建工具，和大部分人都差不多采用的构建流程。
Grunt 虽然是开创者的地位，但是，他仅仅是把混乱的构建过程统一化了，用起来方便了，其实本质上没有变。本质上我们依然是把 CSS, JS, HTML，图片等 各自打包，一个JS模块依赖的 CSS 等外部资源依然没有任何语法上的声明，我们甚至需要在组件说明中强调这个组件依赖哪个CSS，依赖那几张图片。也就是说，模块依赖的问题依然没有解决。
另外 Grunt 是直接面向文件操作的，每一个任务都是输入一个文件，然后输出一个文件。这样导致如果一个文件需要经过多次处理，在中间每一步都会写文件，这些文件其实并没有必要写。这样就导致Grunt的效率比较低。 比如我编译JS的时候，可能需要先 CoffeeScript 编译一下，然后 Uglify 一下，那么很多时候 Coffee 编译的文件我并不需要，我只要 Uglify 之后的文件，而写文件是很耗时的。
Gulp 只是做了改良 Gulp 基于Stream 就明显比 Grunt要更高效，且更任务组合灵活。我可以读入一个文件，然后进行多个操作，最终直接输出我要的结果，不存在中间的临时文件。 然而 Gulp 只是一个量变，它依然没能解决模块依赖的问题。
Webpack 划时代的解决了模块依赖的问题 Webpack 的出现比较完美解决了前端模块依赖的问题，任何资源都是JS，任何资源都可以在JS中声明依赖。这是具有划时代意义的。甚至我是这样认为的，在webpack之前前端是没有真正的通用的模块化开发的（特定框架的不算）。 那么Webpack 是如何做到的呢？

## browserify

缺点：只能转化js.

## webpack

功能
项目管理、打包、模块管理（依赖管理）、加载资源（js/css/html/png/woff/data/vue/...）、加载器（loader）
前身：grunt/gulp/browserify->webpack->pratcle




# 提取公共代码

webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  minChunks: 2,
  chunks: ['subPageA', 'subPageB']
})

# title
# title
# title
# title