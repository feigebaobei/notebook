## nginx: [alert] kill(23050, 3) failed (3: No such process)

通过在nginx/sbin,目录下 运行命令 ./nginx ,可看到如下错误：
说明nginx的监听端口：8090被占用了。那么再使用命令lsof -i 8090查看什么应用占用了端口。如果是无关紧要的应用，便可Kill -9 强制杀掉相关应用，以便nginx的使用。

