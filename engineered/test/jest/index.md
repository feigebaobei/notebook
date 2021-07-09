# `jest`

## overview
js测试框架

### feature
- 可以不配置
- 支持快照
- 隔离的
- 支持代码覆盖
- 支持模拟函数
- 支持错误溯源
- 支持测试异步代码
- 支持only
- 自带断言
- 自带测试覆盖率工具
- ……

## install
`npm i jest -D`

## usage
同`./demo0.md`
以`test('desc', fn)`为测试项，类如：`it('desc', fn)`。
以`describe('desc', fn)`为测试集合。
```
jest                   // 运行所有测试文件
jest testDir           // 运行指定目录下的所有测试文件
jest testDir/spec.js   // 运行指定目录下的指定测试文件。可指定多个。
jest --onlyChanged     // 只运行被修改的测试文件
jest -o                // 只运行被修改的测试文件
jest --watch
jest --watchAll
```

### 断言
此包对不同类型的数据有不同的断言关键字。下面分别说明：

#### 真值
|||||||
|-|-|-|-|-|-|
|toBeNull||||||
|toBeUndefined||||||
|toBeDefined||||||
|toBeTruthy||||||
|toBeFalsy||||||

#### 数字
|||||||
|-|-|-|-|-|-|
|toBeGreaterThan||||||
|toBeGreaterThanOrEqual||||||
|toBeLessThan||||||
|toBeLessThanOrEqual||||||

#### 字符串
|||||||
|-|-|-|-|-|-|
|toMatch||||||

#### array & iterables
|||||||
|-|-|-|-|-|-|
|boContain||||||

#### 例外
|||||||
|-|-|-|-|-|-|
|toThrow||||||

### 测试异步
```
// 回调
test('the data is peanut butter', done => {
  function callback(data) {
    try {
        // expect 在try里才能知道为何失败。
        // 这种处理方法不如jasmine/mocha好用。
      expect(data).toBe('peanut butter');
      // 若expect失败则不会执行done()
      // 执行done()则结束测试。
      done();
    } catch (error) {
      done(error);
    }
  }
    // fetchData是被测试的异步方法.
  fetchData(callback);
});

// promise
test('the data is peanut butter', () => {
    // 一定要使用return。与jasmine/mocha一样。
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
  // 当rejected时自动报错。
});
test('the fetch fails with an error', () => {
  expect.assertions(1); // 设置一定数量的断言被调用。
  // 默认rejected状态时报错。
  return fetchData().catch(e => expect(e).toMatch('error'));
});
test('the data is peanut butter', () => {
    // 检查fulfilled状态的简写形式。
  return expect(fetchData()).resolves.toBe('peanut butter');
});
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});

// async / await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

### 前置准备 & 后置整理
`beforeEach(fn) / afterEach(fn) / beforeAll(fn) / afterAll(fn)`
与jasmine/mocha时的hooks相同作用。

### mock
- 在测试代码中创建一个 mock 函数
- 编写一个手动 mock来覆盖模块依赖。

### 子包
jest-changed-files
jest-diff
jest-docblock
jest-get-type
jest-validate
jest-worker
pretty-format







## configuration
默认配置文件：`path/to/file.json`。

### 项目项
|key|describe|type|default||
|-|-|-|-|-|
|testMatch|匹配测试文件的（正则）表态式|string[]|`[ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]`||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||
|key|describe||||

## cli
```
jest <regexForTestFiles>
--bail
--cache
--changedFilesWithAncestor
--changedSince
--ci
--clearCache
--collectCoverageFrom=<glob>
--colors
--config=<path>
--coverage[=<boolean>]
--coverageProvider=<provider>
--debug
--detectOpenHandles
--env=<environment>
--errorOnDeprecated
--expand
--filter=<file>
--findRelatedTests <spaceSeparatedListOfSourceFiles>
--forceExit
--help
--init                                              // 生成配置文件 jest.config.js
--injectGlobals
--json
--outputFile=<filename>
--lastCommit
--listTests
--logHeapUsage
--maxConcurrency=<num>
--maxWorkers=<num>|<string>
--noStackTrace
--notify
--onlyChanged
--passWithNoTests
--projects <path1> ... <pathN>
--reporters
--roots
--runInBand
--selectProjects <project1> ... <projectN>
--runTestsByPath
--setupTestFrameworkScriptFile=<file>
--showConfig
--silent
--testNamePattern=<regex>
--testLocationInResults
--testPathPattern=<regex>
--testPathIgnorePatterns=<regex>|[array]
--testRunner=<path>
--testSequencer=<path>
--testTimeout=<number>
--updateSnapshot
--useStderr
--verbose
--version
--watch
--watchAll
--watchman
```

## api

jest.fn(param, first: string, second: boolean = true) => void
description

jest.fn(param, [options: {a: string, b?: number}])
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。