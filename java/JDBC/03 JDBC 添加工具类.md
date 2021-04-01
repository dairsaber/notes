# JDBC 工具类添加

我们发现上面的代码有很多重复的地方

```
# 需求实现

1. 需求一: 查询所有学生信息
2. 需求二: 根据id 查询学生信息
3. 需求三: 新增学生信息
4. 需求四: 修改学生信息
5. 需求五: 删除学生信息

# 使用JDBC 工具类抽取通用方法
1. 编写配置文件
    在src目录下面创建 `config.properties` 配置文件
    ```properties
        driverClass=com.mysql.jdbc.Driver
        url=jdbc:mysql://10.211.55.5:3306/db14
        username=root
        password=dairsaber
    ```
   
# 注意这边的案例还没解决sql注入

```

## 目录

```
.
└── src
    ├── com
   	...
    │   └── dairsaber03
    │       ├── README.MD
    │       ├── controller
    │       │   └── StudentController.java
    │       ├── dao
    │       │   ├── StudentDao.java
    │       │   └── StudentDaoImpl.java
    │       ├── domain
    │       │   └── Student.java
    │       ├── service
    │       │   ├── StudentService.java
    │       │   └── StudentServiceImpl.java
    │       └── utils
    │           └── JDBCUtils.java
    └── config.properties

```

- 基本上代码和上一章一样 主要是dao实现类改动比较大

- src/config.properties

```properties
driverClass=com.mysql.jdbc.Driver
url=jdbc:mysql://10.211.55.5:3306/db14
username=root
password=dairsaber
```

- dao/StudentDaoImpl.java

```java
package com.dairsaber03.dao;

import com.dairsaber03.domain.Student;
import com.dairsaber03.utils.JDBCUtils;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

/**
 * 这边有sql注入风险
 */
public class StudentDaoImpl implements StudentDao {
    @Override
    public ArrayList<Student> findAll() {
        ArrayList<Student> stuList = new ArrayList<>();
        Connection conn = null;
        Statement stat = null;
        ResultSet resultSet = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            stat = conn.createStatement();
            String sql = "SELECT * FROM student";
            resultSet = stat.executeQuery(sql);
            while (resultSet.next()) {
                int sid = resultSet.getInt("sid");
                String name = resultSet.getString("NAME");
                int age = resultSet.getInt("age");
                Date birthday = resultSet.getDate("birthday");
                Student student = new Student(sid, name, age, birthday);
                stuList.add(student);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(conn, stat, resultSet);
        }
        return stuList;
    }

    @Override
    public Student findById(Integer id) {
        Student stu = new Student();
        Connection conn = null;
        Statement stat = null;
        ResultSet resultSet = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            stat = conn.createStatement();
            /**
             * 危险
             */
            String sql = "SELECT * FROM student WHERE sid ='" + id + "'";
            resultSet = stat.executeQuery(sql);
            while (resultSet.next()) {
                int sid = resultSet.getInt("sid");
                String name = resultSet.getString("NAME");
                int age = resultSet.getInt("age");
                Date birthday = resultSet.getDate("birthday");
                stu = new Student(sid, name, age, birthday);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.close(conn, stat, resultSet);
        }
        return stu;
    }

    @Override
    public int insert(Student stu) {
        int result = 0;
        Connection conn = null;
        Statement stat = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            stat = conn.createStatement();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date birthday = stu.getBirthday();
            String formatBirth = sdf.format(birthday);
            String sql = "INSERT INTO student VALUES ('" + stu.getSid() + "','" + stu.getName() + "','" + stu.getAge() + "','" + formatBirth + "')";
            result = stat.executeUpdate(sql);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
           JDBCUtils.close(conn,stat);
        }
        return result;
    }

    @Override
    public int update(Student stu) {
        int result = 0;
        Connection conn = null;
        Statement stat = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            stat = conn.createStatement();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date birthday = stu.getBirthday();
            String formatBirth = sdf.format(birthday);
            String sql = "UPDATE student SET sid='" + stu.getSid() + "',name='" + stu.getName() + "',age='" + stu.getAge() + "',birthday='" + formatBirth + "' WHERE sid='" + stu.getSid() + "'";
            result = stat.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
           JDBCUtils.close(conn,stat);
        }
        return result;
    }

    @Override
    public int delete(Integer id) {
        int result = 0;
        Connection conn = null;
        Statement stat = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            stat = conn.createStatement();

            String sql = "DELETE FROM student WHERE sid='" + id + "'";
            result = stat.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
           JDBCUtils.close(conn,stat);
        }
        return result;
    }
}

```

- utils/JDBCUtils.java

```java
package com.dairsaber03.utils;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

/**
 * JDBC 工具类
 */
public class JDBCUtils {
    // 1. 私有构造方法
    private JDBCUtils() {
    }

    // 2. 声明所需要的配置变量
    private static String driveClass;
    private static String url;
    private static String username;
    private static String password;
    private static Connection conn;

    // 3. 提供静态代码块. 读取配置文件信息为变量赋值, 注册驱动.
    static {
        // (1) 通过本类的加载器获取资源流
        InputStream is = JDBCUtils.class.getClassLoader().getResourceAsStream("config.properties");
        // (2) 创建操作properties的操作对象
        Properties prop = new Properties();
        try {
            prop.load(is);
            driveClass = prop.getProperty("driveClass");
            url = prop.getProperty("url");
            username = prop.getProperty("username");
            password = prop.getProperty("password");

            // 注册驱动
            // Class.forName(driveClass);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 4. 提供获取数据库连接的方法
    public static Connection getConnection() {
        try {
            conn = DriverManager.getConnection(url,username,password);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return conn;
    }
    // 5. 提供释放资源的方法
    public static void  close(Connection conn, Statement stat, ResultSet rs){
        if(conn!=null){
            try {
                conn.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        if(stat!=null){
            try {
                stat.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        if(rs!=null){
            try {
                rs.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }
    public static void  close(Connection conn, Statement stat){
        if(conn!=null){
            try {
                conn.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        if(stat!=null){
            try {
                stat.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }
}

```

