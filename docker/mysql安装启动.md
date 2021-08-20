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

3. 注意我这边是在mac上的文件映射挂载

4. windows上在gitbash中我挂载到我的文件夹当中

   ```shell
    docker run -p 3306:3306 --name mysql -v ~/docker/mysql5.7/log:/var/log/mysql -v ~/docker/mysql5.7/data:/var/lib/mysql -v ~/docker/mysql5.7/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.31
   ```

   

   

