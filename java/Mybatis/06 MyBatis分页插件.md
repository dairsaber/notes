## 分页插件的介绍

- 在企业级开发中, 分页是一种常见的技术, 而且使用的MyBatis是不带分页功能的, 如果想实现分页功能, 需要我们手动编写LIMIT语句. 但是不同的数据库实现分页的SQL语句也是不同的, 所以手写分页成本较高. 这个时候就可以借助分页插件来帮助我们实现分页功能.
- PageHelper: 第三方分页助手. 将复杂的分页操作进行封装, 从而人分页功能变得非常简单.

## 实现步骤

1. 导入jar包 (pageHelper 和 它的依赖 jsqlparser 包)
2. 在核心配置文件当中集成分页助手插件
3. 在测试类中使用分页组手相关API实现分页功能

- 导入jar包

  - pagehelper-5.2.0.jar
  - jsqlparser-3.2jar

- 核心配置文件

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE configuration
          PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-config.dtd">
  <!--核心根标签-->
  <configuration>
    ...
      <settings>
          <setting name="logImpl" value="log4j"/>
      </settings>
    	<!--引入分页插件-->
    	<plugins>
        	<plugin interceptor="com.github.pagehelper.PageInterceptor"/>
       </plugins>
    
      <environments default="mysql">
  				...
      </environments>
  	...
  </configuration>
  ```

- 映射文件

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  
  <!--使用接口的话这边导包应该和mapper中接口全类名一致-->
  <mapper namespace="com.dairsaber.mapper.StudentMapper">
      <!--
        select: 查询功能的标签
        id属性: 唯一标识
        resultType属性: 指定结果映射对象的类型
        parameterType属性: 指定参数映射对象类型
      -->
      <!--使用分页插件的时候 在下面这条sql语句下面就不要加分号了-->
      <select id="selectAll" resultType="student">
          SELECT * FROM student
      </select>
  </mapper>
  ```

- 写个测试类来实现简单的分页查询的功能

  ```java
  package com.dairsaber.pagination;
  
  import com.dairsaber.bean.Student;
  import com.dairsaber.mapper.StudentMapper;
  import com.github.pagehelper.PageHelper;
  import org.apache.ibatis.io.Resources;
  import org.apache.ibatis.session.SqlSession;
  import org.apache.ibatis.session.SqlSessionFactory;
  import org.apache.ibatis.session.SqlSessionFactoryBuilder;
  import org.junit.Test;
  
  import java.io.IOException;
  import java.io.InputStream;
  import java.util.List;
  
  public class Test01 {
      @Test
      public void paginate(){
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
              //要实现分页 就在执行结果前面进行对其分页设置
              // (1) 显示第1页 每页3条
              PageHelper.startPage(1,3);
              // 5. 实行并获取结果
              students = mapper.selectAll();
            	// 打印下结果看看
              for (Student student:students){
                  System.out.println(student);
              }
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
      }
  }
  ```

  

## 分页插件相关的参数

- PageInfo: 封装分页相关参数的功能类

- 核心方法

  | 返回值  | 方法名          | 说明               |
  | ------- | --------------- | ------------------ |
  | long    | getTotal()      | 获取总条数         |
  | int     | getPages()      | 获取总页数         |
  | int     | getPageNumber() | 获取当前页         |
  | int     | getPageSize()   | 获取每页显示条数   |
  | int     | getPrePage()    | 获取上一页         |
  | int     | getNextPage()   | 获取下一页         |
  | boolean | isIsFirstPage() | 获取是否是第一页   |
  | boolean | isISLastPage()  | 获取是否是最后一页 |

- 代码

  ```java
  package com.dairsaber.pagination;
  
  import com.dairsaber.bean.Student;
  import com.dairsaber.mapper.StudentMapper;
  import com.github.pagehelper.PageHelper;
  import com.github.pagehelper.PageInfo;
  import org.apache.ibatis.io.Resources;
  import org.apache.ibatis.session.SqlSession;
  import org.apache.ibatis.session.SqlSessionFactory;
  import org.apache.ibatis.session.SqlSessionFactoryBuilder;
  import org.junit.Test;
  
  import java.io.IOException;
  import java.io.InputStream;
  import java.util.List;
  
  public class Test01 {
      @Test
      public void paginate(){
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
              //要实现分页 就在执行结果前面进行对其分页设置
              // (1) 显示第一页 每页3条
              PageHelper.startPage(1,3);
              // 5. 实行并获取结果
              students = mapper.selectAll();
              for (Student student:students){
                  System.out.println(student);
              }
              // 分页相关参数          <------------------------
              PageInfo<Student> pageInfo = new PageInfo<>(students);
              long total = pageInfo.getTotal();
              System.out.println("总条数 ==>" + total);
              int pagesNumber = pageInfo.getPages();
              System.out.println("总页数 ==>" + pagesNumber);
              boolean isFirstPage = pageInfo.isIsFirstPage();
              System.out.println("是第一页 ==>"+isFirstPage);
              boolean isLastPage = pageInfo.isIsLastPage();
              System.out.println("是最后一页 ==>"+isLastPage);
              int pageNum = pageInfo.getPageNum();
              System.out.println("当前页 ==>"+pageNum);
  
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
      }
  }
  
  ```

  