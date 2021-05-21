# import
总是运行在`strict mode`中。
动态导入时不需要在`<script>`上设置`type="module"`。
`<script>`上设置`nomodule`可实现向后兼容。
使用静态`import`可更方便实现代码静态分析、tree shaking。
## 常用语法
```
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name"; // 仅为副作用而导入一个模块
var promise = import("module-name");//这是一个处于第三阶段的提案。
```
## 动态导入
- 减少初始化时代码加载量。
- 按需加载
- 异步获取模块
- 需要动态构建
- 被导入的模块有副作用
- 方便tree shaking
- 返回一个promise对象
```
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", e => {
    e.preventDefault();

    import('/modules/my-module.js')
      .then(module => {
        module.loadPageInto(main);
      })
      .catch(err => {
        main.textContent = err.message;
      });
  });
}
```