使用 ts 开发一个项目。
## overview
展示如何使用ts写项目。

## init
```
npm i typescript -g
mkdir initTs
cd initTs
```

## 创建配置文件
`tsc`命令编译项目时需要按照配置文件去编译。
`tsconfig.json`
```
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "lib": ["ES2016"],
    }
}
```

## 编写项目
创建`first.ts`
```
function sn(s: string): number {
    return Number(s)
}
```
创建`second.ts`
```
function ns(s: string): number {
    return Number(s)
}
```

## 编译
```
tsc
```
编译结果
```
<root>
|-- tsconfig.ts
|-- first.ts
|-- second.ts
|-- first.js
|-- second.js
```
