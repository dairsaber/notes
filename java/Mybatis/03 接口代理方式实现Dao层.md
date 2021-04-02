## 接口代理方式小结

- 接口代理方式可以让我们只编写接口即可, 而实现类对象由MyBatis生成

- 实现规则

  1. 映射配置文件中的名称空间必须和Dao层中的全类名相同
  2. 映射配置文件中的增删改查标签id属性必须和Dao层接口的方法名相同
  3. 映射配置文件中的增删改查标签parameterType属性必须和Dao层接口的方法参数相同
  4. 映射配置文件中的增删改查标签resultType属性必须和Dao层接口的返回值相同

- 获取动态代理对象

  - SqlSession功能类中的getMapper() 方法.

  

## 实现步骤

基本和传统差不多 下面只说一下不同的地方

- 映射配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!--我是变化的地方-->
<!--使用接口的话这边导包应该和mapper中接口全类名一致-->
<mapper namespace="com.dairsaber.mapper.StudentMapper">
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

- 删除mapper文件夹中impl文件夹 因为我们不需要手动创建实现类了
- 改造service中实现类的各个方法实现 (这边由很多重复的代码但是不要紧,这不是我们现在的重心)

```java
package com.dairsaber.service.impl;

import com.dairsaber.bean.Student;
import com.dairsaber.mapper.StudentMapper;
import com.dairsaber.service.StudentService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class StudentServiceImpl implements StudentService {
    @Override
    public List<Student> selectAll() {
        List<Student> students = null;
        InputStream is = null;
        SqlSession sqlSession = null;
        try {
            // 1. 读入核心配置文件
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取 Factory
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开回话 事务设置为自动提交
            sqlSession = build.openSession(true);
            // 4. 通过MyBaits反射机制根据接口生成实体类
            StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
            // 5. 实行并获取结果
            students = mapper.selectAll();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 6. 释放资源
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
            // 1. 读入核心配置文件
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取 Factory
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开回话 事务设置为自动提交
            sqlSession = build.openSession(true);
            // 4. 通过MyBaits反射机制根据接口生成实体类
            StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
            // 5. 实行并获取结果
            student = mapper.selectById(sid);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 6. 释放资源
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
            // 1. 读入核心配置文件
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取 Factory
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开回话 事务设置为自动提交
            sqlSession = build.openSession(true);
            // 4. 通过MyBaits反射机制根据接口生成实体类
            StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
            // 5. 实行并获取结果
            result = mapper.insert(student);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 6. 释放资源
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
            // 1. 读入核心配置文件
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取 Factory
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开回话 事务设置为自动提交
            sqlSession = build.openSession(true);
            // 4. 通过MyBaits反射机制根据接口生成实体类
            StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
            // 5. 实行并获取结果
            result = mapper.update(student);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 6. 释放资源
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
            // 1. 读入核心配置文件
            is = Resources.getResourceAsStream("MyBatisConfig.xml");
            // 2. 获取 Factory
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(is);
            // 3. 打开回话 事务设置为自动提交
            sqlSession = build.openSession(true);
            // 4. 通过MyBaits反射机制根据接口生成实体类
            StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);
            // 5. 实行并获取结果
            result = mapper.delete(sid);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 6. 释放资源
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

