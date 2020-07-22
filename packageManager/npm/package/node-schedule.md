# node-schedule

可以定时执行方法。比`setInterval`强大。

## install

`npm i node-schedule`

## usage

### jobs & scheduling

可以使用`scheduleJob()`创建job.

### cron-style scheduling

```
 *   *   *   *   *   *
 second 0 - 59
    minute 0 - 59
        hour 0 - 23
            day of month 1 - 31
                  month 1 - 12
                      day of week 0 - 7 (0/7都是sun)
```
### demo
```
var schedule = require('node-schedule')
var j = schedule.scheduleJob('42 * * * *', function () {
  console.log('string')
})
// 每分钟的第42s都会执行function

var j = schedule.scheduleJob('0 17 ? * 0,4-6', function () {
  console.log('string')
  })
//

// 也可以使用每5min执行一次 '* /5 * * * *'

var date = new Date(2012, 11, 21, 5, 30, 0)
var j = schedule.scheduleJob(date, function () {
  console.log('string')
})
// 指定时刻执行fn

var rule = new schedule.RecurrenceRule()
rule.minute = 42
var j = schedule.scheduleJob(rule, function () {...})
// 每小时的第42分钟会执行fn.

var rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, new schedule.Range(4, 6)]
rule.hour = 17
rule.minute = 0
var j = schedule.scheduleJob(rule, function () {...})
// this will print a message on Thursday, Friday, Saturday, and Sunday at 5pm.

var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function () {...})
// every Sunday at 2:30pm

var startTime = new Date(Date.now() + 5000)
var endTime = new Date(startTime.getTime() + 5000)
var j = schedule.scheduleJob({start: startTime, end: endTime, rule: '*/1 * * * * *'}, function () {...})
// 设置开始时间、结束时间。
```

### recurrenceRule properties

seconde 0 - 59
minute 0 - 59
hour 0 - 23
date 1 - 31
month 0 - 11
year
dayOfWeek 0 - 6 // 从sun开始。

### cancel

```
j.cancel()
```

### invocations

我不会这三个方法。

```
job.cancelNext(reschedule)
job.reschecule(spec)
job.nextInvocation()
```
