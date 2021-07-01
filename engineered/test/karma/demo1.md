# overview
本示例展示了：
- 如何使用karma-coverage实现测试覆盖率

# init project
同`demo0.md`
```
npm i -D karma-coverage
```
修改`<root>/karma.conf.js`
```
module.exports = function(config) {
    config.set({
        ...
        // 这里配置哪些文件需要统计测试覆盖率，例如，如果你的所有代码文件都在 test文件夹中，你就需要如下配置。
        prepreocessors: {'test/*.js': 'coverage'}, // key应该从file字段里取。
        // 覆盖率报告者的配置。使用html格式，输出到coverage/。
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        reporters: ['progress', 'coverage'],
        ...
    })
}
```
覆盖率 = 测试文件 / 被测试文件
# usage
同`demo0.md`