# JDBC

```java
package com.dairsaber.JDBC01;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCDemo01 {
    public static void main(String[] args) throws  Exception{
        // 1. 导入jar包

        // 2. 注册驱动
        // 注意mysql5之后下面这段话可以省略
        // Class.forName("com.mysql.jdbc.Driver");

        /**
         * 3. 获取连接对象
         *  (1) 获取执行者对象
         *      获取普通的执行者对象: Statement createStatement()
         *      获取预编译执行者对象: PreparedStatement prepareStatement(String sql)
         *  (2) 管理事务
         *      开启事务: setAutoCommit(boolean autoCommit); 参数为false,则开启事务
         *      提交事务: commit();
         *      回滚事务: rollback();
         *  (3) 释放资源
         *      立即将数据库连接对象释放: void close();
         */
        Connection con = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db3", "root", "dairsaber");

        /**
         * 4. 获取执行者对象
         *  (1) 执行DML语句: int executeUpdate(String sql);
         *      返回值int: 返回影响的行数.
         *      参数sql: 可执行insert, update, delete语句.
         *  (2) 执行DQL语句: ResultSet executeQuery(String sql);
         *      返回值ResultSet: 封装查询的结果.
         *      参数sql: 可执行SELECT 语句.
         *  (3) 释放资源
         *      立即将执行者对象释放: void close();
         */
        Statement stat = con.createStatement();

        // 5. 执行sql语句
        String sql = "SELECT * FROM USER";
        /**
         * ResultSet 结果集对象
         *  (1) 判断结果集中是否还有数据: boolean next();
         *      有数据返回true, 并将索引向下移动一行.
         *      没有数据返回false
         *  (2) 获取结果集中的数据(需要获取某一列数据, 这一列数据的数据类型).
         *      例如: String getString("name"); int getInt("age"); ...
         */
        ResultSet res = stat.executeQuery(sql);
        // 6. 处理结果
        while(res.next()){
            System.out.println(res.getInt("id")+"\t"+res.getString("name"));
        }
        // 7. 释放资源
        con.close();
        stat.close();
        res.close();
    }
}

```

