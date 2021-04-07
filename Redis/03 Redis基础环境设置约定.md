# Redis基础环境设置约定

- 创建配置文件存储目录 (这边是在redis目录下创建)

  ```shell
  mkdir conf
  ```

- 创建服务器文件存储目录(包含日志,数据,临时配置文件等)  (这边是在redis目录下创建)

  ```shell
  mkdir data
  ```

- 创建快捷访问链接

  ```shell
  ln -s redis-5.x.x redis
  ```

- 将redis.conf移动到conf文件夹下

  ```shell
  cp redis.conf ./conf
  ```

  

