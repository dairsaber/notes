## 1. 将conf配置文件 去注释去空行 拷贝到redis-6379.conf 中

```shell
cd ~/redis/conf
cat redis.conf | grep -v "#" | grep -v "^$" > redis-6379.conf
```

- redis-6319.conf

  ```conf
  #bind 127.0.0.1
  port 6379
  # 是否后台启动
  daemonize no
  # 日志文件名称
  logfile "log-6379.log"
  # 文件存储目录
  dir /root/redis/data
  ```

  

## 2. 根据配置启动

```shell
redis-server /root/redis/conf/redis-6379.conf 
```

