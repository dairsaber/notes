# nas docker 安装 clash步骤

## 1. 准备配置文件

- 去机场拷贝订阅的配置文件->> config.yaml
- 将准备好的配置文件copy到nas中的docker/clash/config.yaml中
- 注意配置中的controller地址配置 如果是127.0.0.1:9090 改为0.0.0.0:9000

## 2. 安装clash镜像 

- 搜索 clash 安装 dreamacro/clash

- 配置本地和容器的映射

  ```
  //文件映射 本地  ---》 container
  docker/clash/config.yaml --> /root/.config/clash/config.yaml
  dorker/clash/ui --> /ui
  
  //端口映射
  本地 --》 container
  7890  ---> 7890  tcp
  7891  ---> 7891  tcp
  9090  ---> 9090  tcp
  ```

## 3. 创建UI容器

- 安装haishanh/yacd容器

- 添加映射

  ```
  //端口映射
  8080 --> 80 tcp
  ```

## 4. 启动容器 clash和yacd

## 5. 登录dashboard

- 就是服务器的基地址比如我这边是192.168.3.2再加上上面映射的端口号8080
- 添加hostname：服务器基地址+controller port 也就是 http://192.168.3.2:9090

