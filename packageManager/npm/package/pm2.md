# pm2

process manager 2

## describe

它是为node.js管理项目的应该。它有内置的平衡器，可以让应用一直工作。使用很方便：
`pm2 start app.js`
一般用在服务器端，在本地开发、调试时使用nodemon.

## install

`npm i -g pm2`

## usage

```
pm2 start app.js // 启动
pm2 list // 显示pm2管理的应用

pm2 stop <app_name|namespace|id|'all'|json_conf>
pm2 restart <app_name|namespace|id|'all'|json_conf>
pm2 delete <app_name|namespace|id|'all'|json_conf>

pm2 describe <id|app_name> // 查看详情

pm2 monit // 管理

pm2 start api.js -i <process> // 我不会

pm2 reload all // 热更新所有的应用

pm2 logs // 输出
  ctrl + c// 退出
pm2 logs APP-NAME
pm2 logs --json
pm2 logs --format
pm2 flush
pm2 reloadLogs

pm2 startup
pm2 save
pm2 unstartup

pm2 install <module_name> // 安装pm2的模块

pm2 update // 保存进程，杀死pm2和保存的进程。

pm2 reset <app_name|id> // 重置启动次数。
pm2 scale <app_name|id> 10 // 把指定应用扩展到10个实例。
pm2 save // 保存当前应用列表
pm2 resurrect 重新加载保存在应用列表
pm2 generate // 生成一个简单的json配置文件。
```
