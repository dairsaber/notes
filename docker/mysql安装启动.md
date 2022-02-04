1. ``` shell
   docker pull mysql:5.7.31
   ```

2. ```shell
   # --name指定容器名字 -v目录挂载 -p指定端口映射  -e设置mysql参数 -d后台运行
   sudo docker run -p 3306:3306 --name mysql \
   -v /Users/dairsaber/docker/mysql5.7/log:/var/log/mysql \
   -v /Users/dairsaber/docker/mysql5.7/data:/var/lib/mysql \
   -v /Users/dairsaber/docker/mysql5.7/conf:/etc/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   -d mysql:5.7.31
   
   ```

   ```shell
   # mysql8.0 的安装
   
   docker pull mysql:8.0
   
   mkdir -p /Users/dairsaber/docker/mysql8.0/conf
   mkdir -p /Users/dairsaber/docker/mysql8.0/data
   
   vim Users/dairsaber/docker/mysql8.0/conf/my.cnf
   
   # 粘贴下面内容
   ```
   
   ```
   [client]
   
   #socket = /usr/mysql/mysqld.sock
   
   default-character-set = utf8mb4
   
   [mysqld]
   
   #pid-file = /var/run/mysqld/mysqld.pid
   #socket = /var/run/mysqld/mysqld.sock
   #datadir = /var/lib/mysql
   #socket = /usr/mysql/mysqld.sock
   #pid-file = /usr/mysql/mysqld.pid
   
   datadir = /opt/datas/docker/mysql/data
   character_set_server = utf8mb4
   collation_server = utf8mb4_bin
   secure-file-priv= NULL
   
   # Disabling symbolic-links is recommended to prevent assorted security risks
   
   symbolic-links=0
   
   # Custom config should go here
   
   !includedir /etc/mysql/conf.d/
   ```
   
   ```shell
   docker run \
   --name mysql8 \
   --restart=unless-stopped \
   -it -p 3306:3306 \
   -v /Users/dairsaber/docker/mysql8.0/conf/my.cnf:/etc/mysql/my.cnf \
   -v /Users/dairsaber/docker/mysql8.0/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   -d mysql:8.0
   ```
   
   > 参数说明：
   > –restart=unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器
   > -p 3306:3306：映射容器服务的 3306 端口到宿主机的 3306 端口，外部主机可以直接通过 宿主机ip:3306 访问到 MySQL 的服务。
   > -e 环境参数，MYSQL_ROOT_PASSWORD设置root用户的密码
   > -d 后台运行
   
   
   
3. 注意我这边是在mac上的文件映射挂载

4. windows上在gitbash中我挂载到我的文件夹当中

   ```shell
    docker run -p 3306:3306 --name mysql -v ~/docker/mysql5.7/log:/var/log/mysql -v ~/docker/mysql5.7/data:/var/lib/mysql -v ~/docker/mysql5.7/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.31
   ```

   

   ```shell
   # mysql8.0 的安装
   
   docker pull mysql:8.0
   
   mkdir -p ~/docker/mysql8.0/conf
   mkdir -p ~/docker/mysql8.0/data
   
   vim Users/dairsaber/docker/mysql8.0/conf/my.cnf
   
   # 粘贴上面mac的配置内容
   ```
   
   
   
   
   
   ```shell
   docker run \
   --name mysql8 \
   --restart=unless-stopped \
   -it -p 3306:3306 \
   -v ~/docker/mysql8.0/conf/my.cnf:/etc/mysql/my.cnf \
   -v ~/docker/mysql8.0/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   -d mysql:8.0
   ```
   
   
   
   

