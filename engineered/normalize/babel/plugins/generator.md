# `babel-generator`

## overview
此包把`ast`转换为`code`。

### feature
- feature0
- feature1
- feature2

## install
`npm i babel-generator`

## usage
```
import generate from "@babel/generator";
let {code, map, rawMappings } = generate(ast, generatorOpts, code);
```

## configuration
默认配置文件：`path/to/file.json`。

## api
`babel-generator.fn(param, first: string, second: boolean = true) => void`
description

`babel-generator.fn(param, [options: {a: string, b?: number}])`
description

## principle
**经过方法多次调用后返回{code, map}**
定义了`Generator`类，继承于`Printer`类。使用`Generator`类的generator().
 return gen.generate();  // {code, map}
```
class Generator extends Printer {
  constructor(ast: t.Node, opts: { sourceMaps?: boolean } = {}, code) {
    const format = normalizeOptions(code, opts);
    const map = opts.sourceMaps ? new SourceMap(opts, code) : null;
    // 这里是map变量的起点。
    // 处理逻辑中用到了`source-map`包。该包不属于babel.此包的核心就在此。
    super(format, map);

    this.ast = ast;
  }

  ast: t.Node;

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  generate() {
    return super.generate(this.ast);
  }
}
```
`Printer class`:
```
class Printer {
  constructor(format: Format, map: SourceMap) {
    this.format = format;
    this._buf = new Buffer(map);
  }

// other code

  generate(ast) {  // return {code, map}
    this.print(ast);
    this._maybeAddAuxComment();

    return this._buf.get();  // {code, map}
  }
```
`butter.ts`
```
export default class Buffer {
  constructor(map?: SourceMap | null) {
    this._map = map;
  }

// other code

  /**
   * Get the final string output from the buffer, along with the sourcemap if one exists.
   */

  get(): any {  // return {code, map}
    this._flush();
    const map = this._map;
    const result = {
      // Whatever trim is used here should not execute a regex against the
      // source string since it may be arbitrarily large after all transformations
      code: this._buf.trimRight(),
      map: null,
      rawMappings: map?.getRawMappings(),
    };

    if (map) {
      // The `.map` property is lazy to allow callers to use the raw mappings
      // without any overhead
      Object.defineProperty(result, "map", {
        configurable: true,
        enumerable: true,
        get() {
          return (this.map = map.get());    // 我可以学习在get做计算的方法
        },
        set(value) {
          Object.defineProperty(this, "map", { value, writable: true });
        },
      });
    }

    return result; // {code, map}
  }
```
再看核心逻辑：`source-map.ts`
```
export default class SourceMap {
    // other code
  constructor(opts, code) {
    this._cachedMap = null;
    this._code = code;
    this._opts = opts;
    this._rawMappings = [];
  }

  /**
   * Get the sourcemap.
   */

  get() {
    if (!this._cachedMap) {
        // sourceMap类是来自`source-map`包
      const map = (this._cachedMap = new sourceMap.SourceMapGenerator({
        sourceRoot: this._opts.sourceRoot,
      }));

      const code = this._code;
      if (typeof code === "string") {
        map.setSourceContent(
          this._opts.sourceFileName.replace(/\\/g, "/"),
          code,
        );
      } else if (typeof code === "object") {
        Object.keys(code).forEach(sourceFileName => {
          map.setSourceContent(
            sourceFileName.replace(/\\/g, "/"),
            code[sourceFileName],
          );
        });
      }

      this._rawMappings.forEach(mapping => map.addMapping(mapping), map);
    }

    return this._cachedMap.toJSON();
  }
}
```

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。