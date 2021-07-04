# `mocha`

## overview
这是一个测试框架。

### feature
- 支持异步测试，包括promise
- 捕获测试异常
- 支持测试覆盖率报告
- 支持js api运行测试。
- 支持桌面toush提示。
- 高亮显示较慢测试
- 支持监听测试文件变化
- 支持全局变量
- 支持source-map
- 支持esm
- 支持node debug
- 支持自选断言库
- ……还有好多不值得一提的功能。

## install
`npm i mocha -D`

## usage
见`./demo0.md`

### 运行周期
在浏览器中，使用`<script>`引入测试文件然后执行`mocha.run()`

#### serial mode
1. 使用`mocha`执行。
2. 从配置文件的中读取配置。
3. 处理cli opt
4. 若发现是node的可执行文件，则创建一个子进程运行此文件。否则不创建子进程。
5. 使用`--require`加载模块。若被加载的模块是mocha-specific，则注册他们。否则忽略。
6. 当使用`--require`时，验证所有自定义报告/接口。
7. 若没有指定测试文件，则执行当前cli所在目录的test内的直接的`*.js/` `*.mjs/` `*.cjs`。
8. 没有特定顺序加载测试文件。
9. 若有global setup fixture，则执行。
10. 从根测试集合开始。
11. 若存在beforeAll hooks，则运行。
12. 执行每个测试文件。1. beforeEach 2. describe 3. afterEach
13. 若有嵌套的测试集合，则从no.10开始执行。每个测试集合都会执行父测试集合的hooks。
14. 若存在afterAll hooks，则运行。
15. 打印最后的summary/epilog
16. 若存在global teardown fixtures，则执行。

#### parallel mode
1. 重复执行serial mode的no.1-no.6，路过报告验证。
2. 找到所有的测试文件，并推入队列。
3. 若有global setup fixture，则执行。
4. 创建一个子进程池。
5. 立刻执行接收到的测试文件。使用以下引导程序执行：1. 加载`--require`指定的模块。 2.注册root hooks 3. 忽略global fixture和reporters 4. 声名内置/自定义接口是合法的。
6. 当一个测试文件开始被执行时，再为其他测试文件创建Mocha实例。
7. 重复以上步骤，不报告结果。把报告缓存起来。
8. 当执行完测试文件时，把报告给主进程，再使用指定的reporter。
9. 若还有未执行的测试文件，则在子进程池中的子进程处理。
10. 打印最后的summary/epilog
11. 若存在global teardown fixtures，则执行。

### detects multiple calls to `done()`
done是回调方法，只会被执行一次。若执行多次会报错。

### assertions
可以使用自定义的断言库。
- should.js       bdd
- chai            expect()/assert()/should
- expect.js       expect()
- better-assert   c-style assert()
- unexpected      extensible bdd

### asynchronous code
为`it(str, fn)`的第二个参数设置参数。一般使用`down`。当此方法执行完it时执行`down`.

#### working with promises
#### using async/await
#### synchronous code

### arrow functions
方法体中this指向父级。

### hooks
默认使用bdd-style接口。
before(fn) / after(fn) / beforeEach(fn) / afterEach(fn)
常用于预处理测试项的环境配置，测试结束后的整理工作。

#### describing hooks
若钩子的回调方法是具名的，则在没有`description`时使用。

#### asynchronous hooks
所有的hooks的回调方法都可以是同步或异步。
#### root-level hooks
#### delayed root suite
在parallel mode时不能使用。
```
setTimeout(function () {
    describe('str', () => {...})
    run()
}, 500)
```

### pending tests
`it()`中没有回调方法时会被pending.

### exclusive tests
若设置了`only()`，则只执行设置了only的测试用例。

### inclusive tests
若设置了`skip()`，则只执行设置了skip的测试用例。

### entry tests
设置重试的次数。
```
describe('retries', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);
  beforeEach(function() {
    browser.get('http://www.yahoo.com');
  });
  it('should succeed on the 3rd try', function() {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```

### dynamically generating tests
用js代码生成`descipbe`/`it`。

### test duration
使用`slow(number)`设置slow阈值。
- fast    < (slow / 2)
- normal  < slow
- slow    > slow

### timeout
使用`this.timeout`设置describe/it超时时间。

#### suite-level
describe级别的超时时间作用于该descirbe.

#### test-level
与suite-level同理。作用于该it.

### diffs
mocha可以支持显示期望值与实际值的不同。
也可以被设置为`--inline-diffs`。

### command-line usage
基本上看看help就明白。
```
mocha [spec..]

Run tests with Mocha

Commands
  mocha inspect [spec..]  Run tests with Mocha                         [default]
  mocha init <path>       create a client-side Mocha setup at <path>

Rules & Behavior
      --allow-uncaught       Allow uncaught errors to propagate        [boolean]
  -A, --async-only           Require all tests to use a callback (async) or
                             return a Promise                          [boolean]
  -b, --bail                 Abort ("bail") after first test failure   [boolean]
      --check-leaks          Check for global variable leaks           [boolean]
      --delay                Delay initial execution of root suite     [boolean]
      --dry-run              Report tests without executing them       [boolean]
      --exit                 Force Mocha to quit after tests complete  [boolean]
      --forbid-only          Fail if exclusive test(s) encountered     [boolean]
      --forbid-pending       Fail if pending test(s) encountered       [boolean]
      --global, --globals    List of allowed global variables            [array]
  -j, --jobs                 Number of concurrent jobs for --parallel; use 1 to
                             run in serial
                                   [number] [default: (number of CPU cores - 1)]
  -p, --parallel             Run tests in parallel                     [boolean]
      --retries              Retry failed tests this many times         [number]
  -s, --slow                 Specify "slow" test threshold (in milliseconds)
                                                          [string] [default: 75]
  -t, --timeout, --timeouts  Specify test timeout threshold (in milliseconds)
                                                        [string] [default: 2000]
  -u, --ui                   Specify user interface    [string] [default: "bdd"]

Reporting & Output
  -c, --color, --colors                     Force-enable color output  [boolean]
      --diff                                Show diff on failure
                                                       [boolean] [default: true]
      --full-trace                          Display full stack traces  [boolean]
  -G, --growl                               Enable Growl notifications [boolean]
      --inline-diffs                        Display actual/expected differences
                                            inline within each string  [boolean]
  -R, --reporter                            Specify reporter to use
                                                      [string] [default: "spec"]
  -O, --reporter-option,                    Reporter-specific options
  --reporter-options                        (<k=v,[k1=v1,..]>)           [array]

Configuration
      --config   Path to config file       [string] [default: (nearest rc file)]
      --package  Path to package.json for config                        [string]

File Handling
      --extension          File extension(s) to load
                                           [array] [default: ["js","cjs","mjs"]]
      --file               Specify file(s) to be loaded prior to root suite
                           execution                   [array] [default: (none)]
      --ignore, --exclude  Ignore file(s) or glob pattern(s)
                                                       [array] [default: (none)]
      --recursive          Look for tests in subdirectories            [boolean]
  -r, --require            Require module              [array] [default: (none)]
  -S, --sort               Sort test files                             [boolean]
  -w, --watch              Watch files in the current working directory for
                           changes                                     [boolean]
      --watch-files        List of paths or globs to watch               [array]
      --watch-ignore       List of paths or globs to exclude from watching
                                      [array] [default: ["node_modules",".git"]]

Test Filters
  -f, --fgrep   Only run tests containing this string                   [string]
  -g, --grep    Only run tests matching this string or regexp           [string]
  -i, --invert  Inverts --grep and --fgrep matches                     [boolean]

Positional Arguments
  spec  One or more files, directories, or globs to test
                                                     [array] [default: ["test"]]

Other Options
  -h, --help             Show usage information & exit                 [boolean]
  -V, --version          Show version number & exit                    [boolean]
      --list-interfaces  List built-in user interfaces & exit          [boolean]
      --list-reporters   List built-in reporters & exit                [boolean]

Mocha Resources
    Chat: https://gitter.im/mochajs/mocha
  GitHub: https://github.com/mochajs/mocha.git
    Docs: https://mochajs.org/
```

### parallel tests
并行运行测试文件。
#### reporter limitations
不能在并行运行测试中工作
- markdown
- progress
- json-stream

#### exclusive tests are disallowed
不能使用`it.only / discribe.only / this.only`

#### file order is non-deterministic
因parallel mode不能保证运行顺序。所以不能运行以下方法：
- --file
- --sort
- --delay

#### test duration variability
#### "bail" is "best effort"
#### root hooks are not global
#### no browser support
#### limit reporter api for third-party reporters
#### troubleshooting parallel mode
#### caveats about testing in parallel

### root hook plugins
支持所有测试文件被运行前的hook。
使用`--file`安装hook file。mocha会使用`--require`处理。
不参运行在parallel mode。

#### defining a root hook plugin
使用`mochaHooks`属性暴露。
使用`--require <file>`加载
```
// with cjs
// test/hooks.js
exports.mochaHooks = {
    beforeEach(done) {
        ...
        done()
    }
}
// with esm
// test/hooks.mjs
export const mochaHooks = {
    beforeEach(done) {
        ...
        done()
    }
}
```

#### available root hooks
根钩子可以使用任何接口，但是属性名不会改变。换句话说，如果您使用tdd接口，suiteSetup映射到beforeAll，而setup映射到beforeEach。
|root hooks|serial mode|parallel mode|
|-|-|-|
|beforeAll|在所有测试集合前执行，只执行一次。|在所有测试集合前执行，执行每个测试文件前都执行一次。|
|beforeEach|在执行每个测试项前执行|同左|
|afterAll|在所有测试集合后执行，只执行一次。|在所有测试集合后执行，执行每个测试文件后都执行一次。|
|afterEach|在执行每个测试项后执行|同左|
钩子方法中的`this`指向当前context object.

#### multiple root hooks in a single plugin
#### root hook plugins can export a function
#### multiple root hook plugins
可以注册多个钩子插件。如：`--require hooks-a.js --require hooks-b.js`

#### migrating tests to use root hook plugins
把测试文件与钩子文件合并在一起。
1. 确定需要哪些root hooks.
2. 创建一个钩子文件。eg: `test/hooks.js`。并写入no.1的钩子。使用`mochaHooks`属性暴露hooks。
3. 在运行测试文件是使用`--require test/hooks.js`。也可以写入配置文件。
```
// test/hooks.js
exports.mochaHooks = {
  beforeEach: function() {
    // global setup for all tests
  },
  afterAll: function() {
    // one-time final cleanup
  }
};

// test/test.spec.js
describe('my test suite', function() {
  it('should have run my global setup', function() {
    // make assertion
  });
});
```

#### migrating a library to use root hook plugins

### global fixture
像root hooks，但不是。
1. 保证只执行一次。
2. 在paralle mode / watch mode / serial mode下工作相同。
3. 在测试时不共享上下文。

#### global setup fixture
#### global teardown fixture
#### when to use global fixture
#### when not to use global fixture

### test fixture decision-tree wizard thing
```
            my tests need setup
                    |
                    |
                    V
                setup must run
                once add only once
                    |
                yes |-----------------| no
                    V                 V
            sutup must share        should setup affect
            state with test         test across all files?
            |                               |
        yes |--------------|            yes |----------------|
            V              |                V                |
    use root hooks and     |           Use root hooks        |
    avoid parallel mode    | no                              | no
                           |                                 |
                           V                                 V
                    use global fixture              use plain hooks
```
### interfaces
bdd / tdd / exports / qunit / require
默认是bdd
都是一种dsl.每个接口都有特有的方法。

#### bdd
describe(), context(), it(), specify(), before(), after(), beforeEach(), afterEach().

#### tdd
suite(), test(), suiteSetup(), suiteTeardown(), setup(), teardown():

#### exports
#### qunit
#### require

### reporters
默认值为spec

#### spec
#### dot matrix
#### nyan
#### tap
#### loading strip
#### list
#### progress
#### json
#### json stream
#### min
#### doc
#### markdown
#### xunit
#### third-pardy reporters
#### html reporter
### node.js native esm support
支持esm，不支持cjs.

### running mocha in the browser
需要引入`./mocha.js`/`./mocha.css`
1. 指定接口`mocha.setup('bdd')`
2. 加载测试文件。
3. 运行`mocha.run()` // 此方法用于指定使用哪种接口。

#### grep
可以处理queryString

#### browser configuration
```
mocha.setup('tdd') // 设置接口
// or
mocha.setup({
    ui: 'tdd'
})
// or
mocha.setup({
  allowUncaught: true,
  asyncOnly: true,
  bail: true,
  checkLeaks: true,
  dryRun: true,
  forbidOnly: true,
  forbidPending: true,
  global: ['MyLib'],
  retries: 3,
  slow: '100',
  timeout: '2000',
  ui: 'bdd'
});
```

#### browser-specific option(s)
把cli中的`-`改为驼峰命名。

#### reporting
mochawesome可生成在html reporter

### desktop notification support

#### node-based notifications
`mocha --growl`

#### browser-based notifications
```
mocha.setup('bdd')
mocha.growl()
```
```
mocha.run()
```

#### configuration mocha (node.js)
mocha的配置文件。支持以下格式：
- js            .mocharc.js / .mocharc.cjs
- yaml          .mocharc.yaml / .mocharc.yml
- json          .mocharc.json / .mocharc.jsonc
- package.json  设置mocha属性
  
#### custom locations
`--config <path>`

#### ignoring config files
`--no-config`    不使用配置文件
`--no-package`   不使用package.json中的mocha属性。

#### priorities
1. .mocharc.js
2. .mocharc.yaml
3. .mocharc.yml
4. .mocharc.jsonc
5. .mocharc.json

#### merging
优先级依次递减：
1. cli
2. 配置文件
3. package.json里的mocha

#### extending configuration
#### configuration format

### the `test/` directory
默认： `./test/*.{js,cjs,mjs}`
```
mocha --recursive "./spec/*.js"
// or
mocha "./spec/**/*.js"
```

### error codes
|Code	                            |Description|
|-	                                |-|
|ERR_MOCHA_INVALID_ARG_TYPE	        |wrong type was passed for a given argument|
|ERR_MOCHA_INVALID_ARG_VALUE	    |invalid or unsupported value was passed for a given argument|
|ERR_MOCHA_INVALID_EXCEPTION	    |a falsy or otherwise underspecified exception was thrown|
|ERR_MOCHA_INVALID_INTERFACE	    |interface specified in options not found|
|ERR_MOCHA_INVALID_REPORTER	        |reporter specified in options not found|
|ERR_MOCHA_NO_FILES_MATCH_PATTERN	|test file(s) could not be found|
|ERR_MOCHA_UNSUPPORTED	            |requested behavior, option, or parameter is unsupported|

### editor plugins

#### textmate
#### jetbrains
#### wallaby.js
#### emacs
#### mocha siderbar (vs code)

## configuration
默认配置文件：`path/to/file.json`。

## api

mocha.fn(param, first: string, second: boolean = true) => void
description

mocha.fn(param, [options: {a: string, b?: number}])
description

## principle
看不懂。

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。