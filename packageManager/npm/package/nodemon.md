# nodemon.md

nodemon是一个开发node时的一个工具。它可以在文件被修改、删除时自动重启应用。
nodemon可以代替node.nodemon = node command line


## install

`npm i -g nodemon`

## usage

```
nodemon [app]
nodemon -h
nodemon ./server.js localhost 8080
nodemon --inspect ./server.js 80
```

## config file

```
nodemon.json
可以指定配置文件
nodemon --config <file>
{
  "verbose": true,
  "ignore": ["*.test.js", "fixture/*"],
  "execMap": { // 指定可以执行的文件后缀
    "rb": "ruby",
    "pl": "perl",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
// 也可以在package.json里设计配置项
{
  "name": "nodemon",
  "homepage": "http://nodemon.io",
  ...
  "nodemonConfig": {
    "ignore": ["test/*", "desc/*"],
    "delay": "2500"
  }
}
```

## running non-node script

可以运行非node脚本语言。

```
nodemon --exec "python -v" ./app.py
nodemon script.pl
nodemon pn.py
```

## monitoring multpile directories

```
nodemon --watch app --watch libs app/server.js // 监视app/ libs/ 目录
```

## specifying extension watch list

默认监听`.js .mjs .coffee .litcoffee .json`。也可以使用`--exec`监听`app.py`.
`nodemon -e js,pug`

## ignoring file

```
nodemon --ignore lib/ --ignore tests/
nodemon --ignore lib/app.js
nodemon --ignore 'lib/*.js'
```

## applicatrion isnot restarting

```
nodemon -L
nodemon --legacy
```

## delaying restarting

```
nodemon --delay 10 server.js
nodemon --delay 2.5 server.js
nodemon --delay 2500ms server.js
```

## install
## install
## install
## 配置nodemon.json文件

在根目录下创建nodemon.json文件

```
{
  "watch": ["src"], // 监听src目录下的文件变化
  "ext": "ts", // 监控指定后缀名的文件
  "ignore": ["src/**/*.spec.ts"], // 忽略文件名后缀、文件夹
  "exec": "node" // 当监控到变化时，自动执行的命令。
}
```

## 停止

`ctrl + c`