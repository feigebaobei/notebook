# plugins
## using a plugins
在配置文件中设置
```
{
    "plugins": ["babel-plugin-myPlugin", "@babel/plugin-transform-runtime"]
    // 也可使用相对、绝对路径。
}
```
## feature
在转译代码时使用。

## syntax plugins
一般一个解析语法的插件只解析一种语法。如`@babel/plugin-syntax-bigint`只解析bigint。可以为控件插件设置参数，在配置文件中设置：
```
{
    "parserOpts": {
        "plugins": ["jsx", "flow"]
    }
}
```

## 可选插件
在配置文件中写：
```
{
    "plugins": ["pa", ["pa"], ["pa", {}]]
    // or
    "plugins": [
        [
        "transform-async-to-module-method",
        {
            "module": "bluebird",
            "method": "coroutine"
        }
        ]
    ]
    // or
    "presets": [
        [
        "env",
        {
            "loose": true,
            "modules": false
        }
        ]
    ]
}
```

## 开发插件
### babel-handhook
### demo
```
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```