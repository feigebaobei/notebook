# overview
[原文](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
esm（ES Module）是js进行了10年标准化的成果。
从2018年以后全部现代浏览器都支持esm。未来还可以把esm生成wasm（WebAssembly）。

# esm解决了什么问题

1. 创建 发现/下载/解析所有文件成为模块记录。
2. 实例 发现这些包的输出值。
3. 运行 使用变量的真实的值去运行代码。
这三个步骤可以异步运行。
在cjs（commonjs）模式下需要加载完成后要实例化再运行。
至少要等待加载完成，所以不是严格的遵守esm。实际上2种方式都会用到。
esm规则说明了如何解析模块记录，如何实例/运行模块。但是没有说首先得到文件。
在特定的环境有特定的加载器（loader）。如：在浏览器下。
loader可以精确控制模块。使用的方法有`ParseModule`/`Module.Instantiate`/`Module.Evaluate`

## construction
在创建阶段会对每个模块执行以下工作：
1. 决定在哪儿下载
2. 下载
3. 解析成为模块记录。

## 发现并下载文件
loader发现并开始下载文件。在html中，一般从`<script src="main.js" type="module">`开发下载。此文件有若干`import`。再从import引入下一个模块。
    

## parsing
## instantiation
## evaluation

# title
# title
# title
# title
# title
