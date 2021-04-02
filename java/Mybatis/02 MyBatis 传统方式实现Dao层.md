# Dao 层传统实现方式

- 分层思想: 控制层(controller), 业务层(service), 持久层(dao) mybatis中我们用mapper代表持久层 只是名字不一样不要在意
- 调用流程
- `控制层` -> `业务层` -> `持久层` -> `DB`



## 目录

```
.
├── src
│   ├── MyBatisConfig.xml                  -- mybatis核心配置文件
│   ├── StudentMapper.xml									 -- 映射配置文件	
│   ├── com
│   │   └── dairsaber
│   │       ├── bean                       -- model
│   │       │   └── Student.java           -- 实体类 student
│   │       ├── controller                 -- 控制层
│   │       │   └── StudentController.java
│   │       ├── mapper                     -- 持久层
│   │       │   ├── StudentMapper.java     -- 接口 
│   │       │   └── impl                   -- 实现类文件夹
│   │       │       └── StudentMapperImpl.java
│   │       └── service                    -- 业务层    
│   │           ├── StudentService.java    -- 接口
│   │           └── impl                   --实现类
│   │               └── StudentServiceImpl.java
│   ├── jdbc.properties                    -- 数据库通用配置
│   └── log4j.properties                   -- 日志配置

```

### MyBatisConfig.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--核心根标签-->
<configuration>
    
    <!--引入数据库配置文件-->
    <properties resource="jdbc.properties"/>
    <!--配置数据库环境的, 环境可以有多个, default指定默认使用的环境, 下面的 environment id属性可以配置多个环境-->
    <settings>
        <setting name="logImpl" value="log4j"/>
    </settings>
    <typeAliases>
        <typeAlias type="com.dairsaber.bean.Student" alias="student"/>
    </typeAliases>
    <environments default="mysql">
        <!--配置环境的 id唯一标识 -->
        <environment id="mysql">
            <!--事务类型. type属性, 采用JDBC默认事务-->
            <transactionManager type="JDBC" />
            <!--dataSource 数据源信息 	type 属性 连接池-->
            <dataSource type="POOLED">
                <!--property 获取数据库连接的配置信息-->
                <property name="driver" value="${driver}" />
                <property name="url"
                          value="${url}" />
                <property name="username" value="${username}" />
                <property name="password" value="${password}" />
            </dataSource>
        </environment>
    </environments>
    <!--mappers引入映射配置文件-->
    <mappers>
        <!--mapper 引入指定的映射配置 resource属性 配置名称-->
        <mapper resource="StudentMapper.xml" />
    </mappers>
</configuration>
```

### StudentMapper.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="StudentMapper">
    <!--
      select: 查询功能的标签
      id属性: 唯一标识
      resultType属性: 指定结果映射对象的类型
      parameterType属性: 指定参数映射对象类型
    -->
    <select id="selectAll" resultType="student">
        SELECT * FROM student;
    </select>
    <select id="selectById" resultType="student" parameterType="int">
        SELECT * FROM student WHERE sid = #{sid};
    </select>
    <!-- 新增操作 -->
    <insert id="insert" parameterType="student">
        INSERT INTO student VALUES (#{sid},#{name},#{age},#{birthday});
    </insert>
    <!-- 更新操作 -->
    <update id="update" parameterType="student">
        UPDATE student SET name=#{name}, age=#{age}, birthday=#{birthday} WHERE sid=${sid};
    </update>
    <!-- 删除操作 -->
    <delete id="delete" parameterType="int">
        DELETE FROM student WHERE sid=#{sid};
    </delete>
</mapper>
```

### jdbc.properties

```properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://10.211.55.5:3306/db14
username=root
password=dairsaber
```

### log4j.properties (此文件名成固定的)

```properties
log4j.rootLogger=DEBUG, stdout

# console output
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] -%m%n
```

### bean/Student.java

```java
package com.dairsaber.bean;

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

### mapper/StudentMapper.java (interface)

```java
package com.dairsaber.mapper;

import com.dairsaber.bean.Student;

import java.util.List;

public interface StudentMapper {
    public List<Student> selectAll();
    public Student selectById(Integer sid);
    public Integer insert(Student student);
    public Integer update(Student student);
    public Integer delete(Integer sid);
}

```

### mapper/impl/StudentMapperImpl.java

```java
package com.dairsaber.mapper.impl;

import com.dairsaber.bean.Student;
import com.dairsaber.mapper.StudentMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class StudentMapperImpl implements StudentMapper {

    @Override
    public List<Student> selectAll() {
        List<Student> students = null;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            //1.加载核心配置项
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取工厂对象
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开会话 返回会话对象
            sqlSession = build.openSession(true);//这边参数为true代表自动开启事务
            // 4. 执行查找操作
            students = sqlSession.selectList("StudentMapper.selectAll");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }

        return students;
    }

    @Override
    public Student selectById(Integer sid) {
        Student student = null;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            //1.加载核心配置项
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取工厂对象
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开会话 返回会话对象
            sqlSession = build.openSession(true);//这边参数为true代表自动开启事务
            // 4. 执行查找操作
            student = sqlSession.selectOne("StudentMapper.selectById",sid);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }

        return student;
    }

    @Override
    public Integer insert(Student student) {
        Integer result = 0;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            //1.加载核心配置项
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取工厂对象
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开会话 返回会话对象
            sqlSession = build.openSession(true);//这边参数为true代表自动开启事务
            // 4. 执行查找操作
            result = sqlSession.insert("StudentMapper.insert",student);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }

        return result;
    }

    @Override
    public Integer update(Student student) {
        Integer result = 0;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            //1.加载核心配置项
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取工厂对象
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开会话 返回会话对象
            sqlSession = build.openSession(true);//这边参数为true代表自动开启事务
            // 4. 执行查找操作
            result = sqlSession.update("StudentMapper.update",student);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }

        return result;
    }

    @Override
    public Integer delete(Integer sid) {
        Integer result = 0;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            //1.加载核心配置项
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取工厂对象
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开会话 返回会话对象
            sqlSession = build.openSession(true);//这边参数为true代表自动开启事务
            // 4. 执行查找操作
            result = sqlSession.delete("StudentMapper.delete",sid);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }

        return result;
    }
}

```

### service/StudentService.java (interface)

```java
package com.dairsaber.service;

import com.dairsaber.bean.Student;

import java.util.List;

/**
 * 因为这边没有什么复杂的业务逻辑 所以基本上和dao中一样 只是个简单的demo
 */
public interface StudentService {
    public List<Student> selectAll();
    public Student selectById(Integer sid);
    public Integer insert(Student student);
    public Integer update(Student student);
    public Integer delete(Integer sid);
}

```

### service/impl/StudentServiceImpl.java

```java
package com.dairsaber.service.impl;

import com.dairsaber.bean.Student;
import com.dairsaber.mapper.StudentMapper;
import com.dairsaber.mapper.impl.StudentMapperImpl;
import com.dairsaber.service.StudentService;

import java.util.List;

public class StudentServiceImpl implements StudentService {
    private StudentMapper studentMapper = new StudentMapperImpl();
    @Override
    public List<Student> selectAll() {
        return studentMapper.selectAll();
    }

    @Override
    public Student selectById(Integer sid) {
        return studentMapper.selectById(sid);
    }

    @Override
    public Integer insert(Student student) {
        return studentMapper.insert(student);
    }

    @Override
    public Integer update(Student student) {
        return studentMapper.update(student);
    }

    @Override
    public Integer delete(Integer sid) {
        return studentMapper.delete(sid);
    }
}
```

### controller/StudentController.java

```java
package com.dairsaber.controller;

import com.dairsaber.bean.Student;
import com.dairsaber.service.StudentService;
import com.dairsaber.service.impl.StudentServiceImpl;
import org.junit.Test;

import java.util.Date;
import java.util.List;

/**
 * 这边用测试类模拟controller功能
 */
public class StudentController {
    private StudentService service = new StudentServiceImpl();
    @Test
    public void findAll(){
        List<Student> students = service.selectAll();
        System.out.println(students);
    }

    @Test
    public void update(){
        Integer row = service.update(new Student(1, "dashabi", 12, new Date()));
        if(row>0){
            System.out.println("更新成功");
        }else{
            System.out.println("更新失败");
        }
    }

    @Test
    public void insert(){
        Integer row = service.insert(new Student(null, "zhouqi", 13, new Date()));
        if(row>0){
            System.out.println("插入成功");
        }else{
            System.out.println("插入失败");
        }
    }

    @Test
    public void delete(){
        Integer row = service.delete(6);
        if(row>0){
            System.out.println("删除成功");
        }else{
            System.out.println("删除失败");
        }
    }

}

```



