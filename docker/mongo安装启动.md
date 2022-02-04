```shell
# 拉
docker pull mongo:latest
# 运行
docker run -itd --name mongo -p 27017:27017 mongo --auth

docker exec -it mongo mongo admin

#  创建一个名为 admin，密码为 123456 的用户。

db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});


# 尝试使用上面创建的用户信息进行连接。
db.auth('admin', '123456')

```

