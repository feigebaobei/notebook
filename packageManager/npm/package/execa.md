# overview
使用下面方法提高`child_process`：
- promise interface
- 输出时去掉最后一行的空格
- 支持跨平台
- 提高windows支持
- 最多缓存100m
- 执行下载到本地二进制可执行文件。
- 在父线程死掉是杀死其子线程
- 使用`stdout/stderr`与外界交流。只支持异步
- 不使用shell也能指定file/arguments。
- ……

# install
`npm i execa`

# usage
```
const execa = require('execa')
(asycn () => {
    const {stdout} = await execa('echo', ['string'])
    console.log(stdout)
    })()
```

# api
||||||
|-|-|-|-|-|
|execa(file, arguments, options?)|执行指定文件。相当于执行`child_process.execFile() / child_process.spawn()`||||
|kill(signal?, options?)|与`child_process#kill()`功能相同||||
||options.forceKillAfterTimeout||default: 5000||
|cancel()|childProcess.kill()||||
|all|||||
|execa.sync(file, arguments?, options?)|同步执行文件||||
|execa.command(command, options?)|与execa()功能相同。只是命令与参数在一个字符串中。|`execa('echo', ['string'])` => `execa.commad('echo string')`|||
|execa.commandSync(command, options?)|execa.command()的同步方法||||
|execa.node(scriptPath, arguments?, options?)|以子线程执行node.js脚本|类化child_process#fork()|||

|childProcessResult|||||
|command|||||
|exitCode|||||
|stdout|||||
|stderr|||||
|all|||||
|failed|||||
|timeOut|||||
|isCanceled|||||
|killed|||||
|signal|||||
|signalDescription|||||
|message|||||
|shortMessage|||||
|originalMessage|||||
|options|||||
|cleanup|||||
|perferLocal|||||
|localDir|||||
|execPath|||||
|buffer|||||
|input|||||
|stdin|||||
|stdout|||||
|all|||||
|reject|||||
|stripFinalNewline|||||
|extendEnv|||||
|cwd|||||
|env|||||
|argv0|||||
|stdio|||||
|serialization|||||
|detached|||||
|uid|||||
|gid|||||
|shell|||||
|encoding|||||
|timeout|||||
|maxBuffer|||||
|killSignal|||||
|windowsVerbatimArguments|||||
|windowsHide|||||
|nodePath|只用于.node()||||
|nodeOptions|只用于.node()||||

# principle
此包与child_process相关很多。
