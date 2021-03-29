

### 1. 添加MySQL存储库

禁用MySQL默认的AppStream存储库：

```shell
sudo dnf remove @mysql
sudo dnf module reset mysql && sudo dnf module disable mysql
```



####  centos8没有MySQL存储库，因此我们将使用centos 7存储库。创建一个新的存储库文件。

```shell
sudo vim /etc/yum.repos.d/mysql-community.repo
```

#### 将以下数据插入上面的存储库中

```shell
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1
gpgcheck=0

[mysql-connectors-community]
name=MySQL Connectors Community
baseurl=http://repo.mysql.com/yum/mysql-connectors-community/el/7/$basearch/
enabled=1
gpgcheck=0

[mysql-tools-community]
name=MySQL Tools Community
baseurl=http://repo.mysql.com/yum/mysql-tools-community/el/7/$basearch/
enabled=1
gpgcheck=0
```

### 2. 安装MySQL(这里我选择MySQL5.7)

```shell
sudo dnf --enablerepo=mysql57-community install mysql-community-server
```

### 3. 如果安装失败,使用以下方法进行安装

#### 先下载rpm包

```shell
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-common-5.7.27-1.el6.x86_64.rpm
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-libs-5.7.27-1.el6.x86_64.rpm
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-client-5.7.27-1.el6.x86_64.rpm
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-server-5.7.27-1.el6.x86_64.rpm
```

#### 再安装

```shell
yum install -y mysql-community-common-5.7.27-1.el6.x86_64.rpm
yum install -y mysql-community-libs-5.7.27-1.el6.x86_64.rpm
yum install -y mysql-community-client-5.7.27-1.el6.x86_64.rpm
yum install -y mysql-community-server-5.7.27-1.el6.x86_64.rpm
```

### 4. 下载完成后检查版本

```shell
[root@test ~]# rpm -qi mysql-community-server
```

会显示这样的

```shell
 Name        : mysql-community-server
 Version     : 5.7.29
 Release     : 1.el7
 Architecture: x86_64
 Install Date: Sat 22 Feb 2020 11:04:07 AM CST
 Group       : Applications/Databases
 Size        : 801919839
 License     : Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved. Under GPLv2   license as shown in the Description field.
 Signature   : DSA/SHA1, Thu 19 Dec 2019 04:12:40 PM CST, Key ID 8c718d3b5072e1f5
 Source RPM  : mysql-community-5.7.29-1.el7.src.rpm
 Build Date  : Wed 18 Dec 2019 09:31:48 PM CST
 Build Host  : loki02.no.oracle.com
 Relocations : (not relocatable)
 Packager    : MySQL Release Engineering <mysql-build@oss.oracle.com>
 Vendor      : Oracle and/or its affiliates
 URL         : http://www.mysql.com/
 Summary     : A very fast and reliable SQL database server
```

### 5. 检查 mysql 源是否安装成功

```shell
yum repolist enabled | grep "mysql.*-community.*"
```

#### 会显示以下内容

```shell
mysql-connectors-community MySQL Connectors Community                       141
mysql-tools-community      MySQL Tools Community                            105
mysql57-community          MySQL 5.7 Community Server
```

### 6. 添加字符集

```shell
vi /etc/my.cnf
```

#### 添加 

```shell
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
# 这边是新增的
character-set-server=utf8
collation-server=utf8_general_ci
# 新增结束
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

# 这边是新增的
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

```

### 7. 启动MySql

```shell
systemctl start mysqld
```

### 8. 查看启动状态

```shell
systemctl status mysqld
```

#### 出现以下信息

```shell
Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
   Active: active (running) since Sat 2020-02-22 11:14:47 CST; 2h 19min ago
     Docs: man:mysqld(8)
           http://dev.mysql.com/doc/refman/en/using-systemd.html
  Process: 21345 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)
  Process: 21323 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
 Main PID: 21349 (mysqld)
    Tasks: 30 (limit: 11516)
   Memory: 209.1M
   CGroup: /system.slice/mysqld.service
           ?..21349 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid
```

### 9. 设置开机启动

```shell
systemctl enable mysqld
```

### 10. 获取安装mysql后生成的临时密码，用于登录

```shell
grep 'temporary password' /var/log/mysqld.log
```

#### 如果出现如下列信息，密码为: BL=azx(1u;Br

```shell
2020-02-22T03:05:17.741049Z 1 [Note] A temporary password is generated for root@localhost: BL=azx(1u;Br
```

### 11. 登录MySql

```shell
mysql -uroot -p
```

### 12. 修改登录密码

#### 正常情况下

```shell
//（修改后的密码，注意必须包含大小写字母数字以及特殊字符并且长度不能少于8位,否则会报错）
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
//或者通过：
mysql> set password for 'root'@'localhost'=password('MyNewPass4!');
//或者通过：
mysql> use mysql;
mysql> update user set password=PASSWORD('MyNewPass5!') where user='root';
mysql> flush privileges;
```

#### 可以忽略密码验证设置比较简单的密码

```shell
set global validate_password_policy=0;
set global validate_password_length=1;

// 在此之后设置密码就随便了

set password=password('dairsaber');// 我这边设置了dairsaber
```

### 13. 授予远程连接权限

```shell
grant all privileges on *.* to 'root' @'%' identified by 'dairsaber'; // 最后这个dairsaber 是自己修改的密码

// 刷新授权
flush privileges
```

### 14. 关闭linux的防火墙

```shell
systemctl stop firewalld
```

### 15. 重启MySql服务

```shell
systemctl stop firewalld
```



