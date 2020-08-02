# node-supervisor

## install

```
npm install supervisor -g
```

一个nodejs的督导脚本。它运行您的程序，并监视代码更改，因此您可以使用热代码重新加载行为，而无需担心内存泄漏，并确保清理所有模块间引用，而且无需一个全新的require系统。
当程序崩溃时，重启程序。也可以用于当某个文件被改变时重启程序。

## usage

```
supervisor [options] <program>
supervisor [options] -- <program> [args...]

supervisor myapp.js
supervisor myapp.coffee
supervisor -w scripts -e myext -x myrunner myapp
supervisor -w lib,server.js,config.js server.js
supervisor -- server.js -h host -p port
```

```
Required:
  <program>
    The program to run.

Options:
  -w|--watch <watchItems>
    A comma-delimited list of folders or js files to watch for changes.
    When a change to a js file occurs, reload the program
    Default is '.'

  -i|--ignore <ignoreItems>
    A comma-delimited list of folders to ignore for changes.
    No default

  --ignore-symlinks
    Ignore symlinks :)
    
  -s|--timestamp
    Log timestamp after each run.
    Make it easy to tell when the task last ran.
    
  -p|--poll-interval <milliseconds>
    How often to poll watched files for changes.
    Defaults to Node default.

  -e|--extensions <extensions>
    A comma-delimited list of file extensions to watch for changes.
    Default is 'node,js' (or when CoffeeScript, 'node,js,coffee,litcoffee').

  -x|--exec <executable>
    The executable that runs the specified program.
    Default is 'node'

  -pid|--save-pid <path>
    Save supervisor's process id to a file at the given path.

  --debug[=port]
    Start node with --debug flag.

  --debug-brk[=port]
    Start node with --debug-brk flag.

  --harmony
    Start node with --harmony flag.

  --inspect
    Start node with --inspect flag.

  -n|--no-restart-on error|exit|success
    Don't automatically restart the supervised program if it ends.
    Supervisor will wait for a change in the source files.
    If "error", an exit code of 0 will still restart.
    If "exit", no restart regardless of exit code.
    If "success", no restart only if exit code is 0.

-t|--non-interactive
    Dissable interactive capacity
    With this option, supervisor won't listen to stdin

  --force-watch
    Use fs.watch instead of fs.watchFile.
    This may be useful if you see a high cpu load on a windows machine.

  -k|--instant-kill
    Instantly kills the server process, instead of gracefully shutting down the server.
  This can be useful when the node app has events attached to SIGTERM or SIGINT so as to do a graceful shutdown before the process exits.
  
 -RV|--restart-verbose
    Logs the file(s) that caused supervisor to restart

  -h|--help|-?
    Display these usage instructions.

  -q|--quiet
    Suppress DEBUG messages


Options available after start:
  rs - restart process. Useful when you want to restart your program even
       if no file has changed.

```
## fancy install

`npm link`



