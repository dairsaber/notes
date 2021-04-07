# redis环境配置

## 1. 下载安装redis

- 下载 redis 5.0.12 版本

  ```shell
  wget https://download.redis.io/releases/redis-5.0.12.tar.gz
  ```

- 解压

  ```shell
  tar -xvf redis-5.0.12.tar.gz
  ```

- 编译

  ```shell
  make
  ```

- 安装

  ```shell
  make install
  ```

- 进到src下 查询以下

  ```shell
  ll # 此时发现这里面的命令比较多
  # 过滤以下
  ll | grep redis
  ```

  ```shell
  # 查询结果
  -rw-rw-r--. 1 root root     2418 Mar  2 14:11 redisassert.h
  -rwxr-xr-x. 1 root root  6010072 Apr  3 19:23 redis-benchmark
  -rw-rw-r--. 1 root root    29605 Mar  2 14:11 redis-benchmark.c
  -rw-r--r--. 1 root root   110368 Apr  3 19:23 redis-benchmark.o
  -rwxr-xr-x. 1 root root 10474656 Apr  3 19:23 redis-check-aof
  -rw-rw-r--. 1 root root     7175 Mar  2 14:11 redis-check-aof.c
  -rw-r--r--. 1 root root    67992 Apr  3 19:23 redis-check-aof.o
  -rwxr-xr-x. 1 root root 10474656 Apr  3 19:23 redis-check-rdb
  -rw-rw-r--. 1 root root    14323 Mar  2 14:11 redis-check-rdb.c
  -rw-r--r--. 1 root root    77112 Apr  3 19:23 redis-check-rdb.o
  -rwxr-xr-x. 1 root root  6533880 Apr  3 19:23 redis-cli
  -rw-rw-r--. 1 root root   267274 Mar  2 14:11 redis-cli.c
  -rw-r--r--. 1 root root  1015760 Apr  3 19:23 redis-cli.o
  -rw-rw-r--. 1 root root    32590 Mar  2 14:11 redismodule.h
  -rwxr-xr-x. 1 root root 10474656 Apr  3 19:23 redis-sentinel
  -rwxr-xr-x. 1 root root 10474656 Apr  3 19:23 redis-server
  -rwxrwxr-x. 1 root root     3600 Mar  2 14:11 redis-trib.rb
  ```

- 由于redis-5.0.12 这个文件夹名称比较长 我们建立一个软连接

  ```shell
  # 推倒安装目录上层
  cd ~
  # 建立软连接
  ln -s redis-5.0.12 redis
  ```



## 2. 常见指令/文件

ˇ

| 文件             | 描述                            |
| ---------------- | ------------------------------- |
| redis-cli        | 客户端启动命令                  |
| redis.conf       | redis 核心配置文件              |
| redis-server     | 服务器启动命令                  |
| redis-check-dump | RDB文件检查工具(快照持久化文件) |
| redis-check-aof  | AOF文件修复工具                 |
| ...              |                                 |

