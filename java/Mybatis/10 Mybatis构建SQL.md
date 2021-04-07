# 构建SQL语句小结

- org.apache.ibatis.jdbc.SQL: 构建SQL语句的功能类. 通过一些方法来代替SQL语句的关键字

  - SELECT()
  - FROM()
  - WHERE()
  - INSERT_INTO()
  - VALUES()
  - UPDATE()
  - DELETE_FROM()

- @SelectProvider: 生成查询用的SQL语句注解.

- @InsertProvider: 生成新增用的SQL语句注解.

- @UpdateProvider: 生成修改用的SQL语句注解.

- @DeleteProvider: 生成删除用的SQL语句注解.

  - type属性: 生成SQL语句功能对象类
  - method属性: 指定调用方法

   

