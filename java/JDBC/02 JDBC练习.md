```
# 需求实现

1. 需求一: 查询所有学生信息
2. 需求二: 根据id 查询学生信息
3. 需求三: 新增学生信息
4. 需求四: 修改学生信息
5. 需求五: 删除学生信息
```



```
.
├── README.MD														-- 需求文档
├── controller                          -- 控制器
│   └── StudentController.java
├── dao
│   ├── StudentDao.java                 -- student接口
│   └── StudentDaoImpl.java             -- student接口实现
├── domain                              -- 模型
│   └── Student.java
└── service
    ├── StudentService.java             -- service 接口
    └── StudentServiceImpl.java         -- service 接口实现  

```

- controller/Student.java

```java
package com.dairsaber02.controller;

import com.dairsaber02.domain.Student;
import com.dairsaber02.service.StudentService;
import com.dairsaber02.service.StudentServiceImpl;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;

public class StudentController {
    private StudentService service = new StudentServiceImpl();

    /**
     * 查询所有学生信息
     */
    @Test
    public void findAll() {
        ArrayList<Student> list = service.findAll();
        for (Student stu : list) {
            System.out.println(stu);
        }
    }

    /**
     * 条件查询,根据id查询学生信息
     */
    @Test
    public void findById() {
        Student stu = service.findById(1);
        System.out.println("row ==>"+stu);
    }

    /**
     * 新增学生
     */
    @Test
    public void insert() {
        int result = service.insert(new Student(5, "周七", 26, new Date()));
        if(result!=0){
            System.out.println("添加成功");
        }else{
            System.out.println("添加失败");
        }
    }

    /**
     * 修改学生信息
     */
    @Test
    public void update() {
        int result = service.update(new Student(5, "周八", 24, new Date()));
        if(result!=0){
            System.out.println("更新成功");
        }else{
            System.out.println("更新失败");
        }
    }

    /**
     * 删除学生信息
     */
    @Test
    public void delete() {
        int result = service.delete(5);
        if(result!=0){
            System.out.println("删除成功");
        }else{
            System.out.println("删除失败");
        }
    }
}
```

- dao/StudentDao

```java
package com.dairsaber02.dao;

import com.dairsaber02.domain.Student;

import java.util.ArrayList;

/**
 * Dao 层接口
 */
public interface StudentDao {
    // 查询所有学生信息
    public abstract ArrayList<Student> findAll();

    // 条件查询,根据id获取学生信息
    public abstract Student findById(Integer id);

    // 新增学生信息
    public abstract int insert(Student stu);

    // 修改学生信息
    public abstract int update(Student stu);

    // 删除学生信息
    public abstract int delete(Integer id);
}
```

- dao/StudentDaoImpl

```java
package com.dairsaber02.dao;

import com.dairsaber02.domain.Student;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class StudentDaoImpl implements StudentDao {
    @Override
    public ArrayList<Student> findAll() {
        ArrayList<Student> stuList = new ArrayList<>();
        Connection conn = null;
        Statement stat = null;
        ResultSet resultSet = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db14", "root", "dairsaber");
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
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (stat != null) {
                try {
                    stat.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
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
            conn = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db14", "root", "dairsaber");
            stat = conn.createStatement();
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
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (stat != null) {
                try {
                    stat.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
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
            conn = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db14", "root", "dairsaber");
            stat = conn.createStatement();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date birthday = stu.getBirthday();
            String formatBirth = sdf.format(birthday);
            String sql = "INSERT INTO student VALUES ('" + stu.getSid() + "','" + stu.getName() + "','" + stu.getAge() + "','" + formatBirth + "')";
            result = stat.executeUpdate(sql);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (stat != null) {
                try {
                    stat.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
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
            conn = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db14", "root", "dairsaber");
            stat = conn.createStatement();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date birthday = stu.getBirthday();
            String formatBirth = sdf.format(birthday);
            String sql = "UPDATE student SET sid='" + stu.getSid() + "',name='" + stu.getName() + "',age='" + stu.getAge() + "',birthday='" + formatBirth + "' WHERE sid='" + stu.getSid() + "'";
            result = stat.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (stat != null) {
                try {
                    stat.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
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
            conn = DriverManager.getConnection("jdbc:mysql://10.211.55.5:3306/db14", "root", "dairsaber");
            stat = conn.createStatement();

            String sql = "DELETE FROM student WHERE sid='" + id + "'";
            result = stat.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if (stat != null) {
                try {
                    stat.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }
        return result;
    }
}

```

- domain/Student

```java
package com.dairsaber02.domain;

import java.util.Date;

/**
 *  先准备个数据
    CREATE DATABASE db14;
    USE db14;
    CREATE TABLE student(
        sid INT PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(20),
        age INT,
        birthday DATE
    );
    -- 添加数据
    INSERT INTO student VALUES
    (NULL, '张三', 23, '1999-09-23'),
    (NULL, '李四', 24, '1998-09-23'),
    (NULL, '王五', 25, '1997-09-23'),
    (NULL, '赵六', 26, '1996-09-23');
 *
 *  注意: 自定义功能类 是为了封装表中每列数据,成员变量和列保持一致
 *  所有基本数据类型需要使用对应的包装类, 以免表中null值无法赋值
 */
public class Student {
    private Integer sid;
    private String name;
    private Integer age;
    private Date birthday;

    public Student() {
    }

    public Student(Integer sid, String name, Integer age, Date birthday) {
        this.sid = sid;
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "Student{" +
                "sid=" + sid +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday +
                '}';
    }
}
```

- service/StudentService

```java
package com.dairsaber02.service;

import com.dairsaber02.domain.Student;

import java.util.ArrayList;

/**
 * service 层接口
 */
public interface StudentService {
    // 查询所有学生信息
    public abstract ArrayList<Student> findAll();

    // 条件查询,根据id获取学生信息
    public abstract Student findById(Integer id);

    // 新增学生信息
    public abstract int insert(Student stu);

    // 修改学生信息
    public abstract int update(Student stu);

    // 删除学生信息
    public abstract int delete(Integer id);
}
```

- service/StudentServiceImpl

```java
package com.dairsaber02.service;

import com.dairsaber02.dao.StudentDao;
import com.dairsaber02.dao.StudentDaoImpl;
import com.dairsaber02.domain.Student;

import java.util.ArrayList;

public class StudentServiceImpl implements StudentService{
    private StudentDao dao = new StudentDaoImpl();
    @Override
    public ArrayList<Student> findAll() {
        return dao.findAll();
    }

    @Override
    public Student findById(Integer id) {
        return  dao.findById(id);
    }

    @Override
    public int insert(Student stu) {
        return dao.insert(stu);
    }

    @Override
    public int update(Student stu) {
        return dao.update(stu);
    }

    @Override
    public int delete(Integer id) {
        return dao.delete(id);
    }
}
```

