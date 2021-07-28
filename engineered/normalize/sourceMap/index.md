## overview
> TODO: description

## source map的格式
```
{
    version: 3                    // source map的版本.
    file: 'out.js'                // 转换后的文件名
    sourceRoot: ''                // 转换前的文件所在目录。若转换前的文件在同一目录，则该项为''
    sources: ['foo.js', 'bar.js'] // 转换前的文件。
    names: [...]                  // 转换前的所有变量名和属性名。
    mappings: ''                  // 记录位置信息的字符串。
}
```

### mappings属性
分为三层:
`<>,<>;<>`
每个分号表示转换后的一行。
每个逗号对应转换后的源码的一个位置．
以vlq编码表示转换前的位置．
`<此位置在指定行的列号><sources属性中的文件下标><源码的行号><源码的列号><names属性的哪个变量>`

## api
`{{packageName}}.fn(param, first: string, second: boolean = true) => void`
description

`{{packageName}}.fn(param, [options: {a: string, b?: number}])`
description

## principle
1. 使用转换工具把源码转换
2. 在轮换后的文件的最后一行添加`//@ sourceMappingURL=${sourceMap文件的位置}`
3. 浏览器根据sourceMap的信息把到对应源码。
