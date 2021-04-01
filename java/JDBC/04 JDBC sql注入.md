# sql 注入 直接看代码

```java
package com.dairsaber03.dao;

import com.dairsaber03.domain.Student;
import com.dairsaber03.utils.JDBCUtils;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

/**
 * 这边解决sql注入风险
 */
public class StudentDao2Impl implements StudentDao {
    @Override
    public ArrayList<Student> findAll() {
        ArrayList<Student> stuList = new ArrayList<>();
        Connection conn = null;
        PreparedStatement stat = null;
        ResultSet resultSet = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            String sql = "SELECT * FROM student";
            stat = conn.prepareStatement(sql);
            resultSet = stat.executeQuery();
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
        PreparedStatement stat = null;
        ResultSet resultSet = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            String sql = "SELECT * FROM student WHERE sid =?";
            stat = conn.prepareStatement(sql);
            stat.setInt(1,id);
            resultSet = stat.executeQuery();
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

    /**
     * 这边只修改了这个方法的sql注入
     * 以后在写类似操作的时候 注意都要用预编译的Statement => PreparedStatement 代替之前的 createStatement
     * @param stu
     * @return
     */
    @Override
    public int insert(Student stu) {
        int result = 0;
        Connection conn = null;
        PreparedStatement stat = null;
        try {
            // Class.forName("com.mysql.jdbc.Driver");
            conn = JDBCUtils.getConnection();
            String sql = "INSERT INTO student VALUES (NULL,?,?,?)";
            stat = conn.prepareStatement(sql);
            stat.setString(1, stu.getName());
            stat.setInt(2,stu.getAge());
            stat.setDate(3,new Date(stu.getBirthday().getTime()));
            result = stat.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
           JDBCUtils.close(conn,stat);
        }
        return result;
    }

  ...
}

```



