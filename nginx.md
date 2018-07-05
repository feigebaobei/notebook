#nginx

mac下
##nginx的启动

    cd usr/local/nginx/sbin
    sudo ./nginx

##Mac下判断配置文件是否正确

    cd  /usr/local/nginx/sbin
    sudo ./nginx -t


##Mac下重启Nginx

    cd /usr/local/nginx/sbin
    sudo ./nginx -s reload

##Mac下Nginx的关闭

查询nginx主进程号：ps -ef|grep nginx

    正常停止   sudo kill -QUIT 主进程号
     
    快速停止   sudo kill -TERM 主进程号
