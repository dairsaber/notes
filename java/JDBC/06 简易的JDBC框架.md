# 简易的JDBC框架封装

-  观察以前写的代码发现很多重复逻辑

  ```java
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
    /**
     			Connection conn = null;
          PreparedStatement stat = null;
          ResultSet resultSet = null;
          ...
            while (resultSet.next()) {
                  int sid = resultSet.getInt("sid");
                  String name = resultSet.getString("NAME");
                  int age = resultSet.getInt("age");
                  Date birthday = resultSet.getDate("birthday");
                  Student student = new Student(sid, name, age, birthday);
                  stuList.add(student);
              }
              以上很多地方都是重复的
    */
  ```

  

- 封装一个JDBCTemplate 这边只实现了一个 findOne 和一个updae

- 另外还需要封装 find 多结果查询,和 聚合函数查询 因为逻辑基本差不多就不写了

  ```java
  package com.dairsaber2;
  
  import com.dairsaber.utils.DataSourceUtils;
  import com.dairsaber2.handler.ResultSetHandler;
  
  import javax.sql.DataSource;
  import java.sql.*;
  
  public class JDBCTemplate {
      private Connection conn;
      private DataSource dataSource;
      private PreparedStatement pst;
      private ResultSet rs;
  
      public JDBCTemplate(DataSource dataSource) {
          this.dataSource = dataSource;
      }
  
      public int update(String sql, Object...params){
          int result = 0;
          try {
              conn = dataSource.getConnection();
              pst = conn.prepareStatement(sql);
              ParameterMetaData parameterMetaData = pst.getParameterMetaData();
              int parameterCount = parameterMetaData.getParameterCount();
              // 判断参数个数是否匹配
              if(parameterCount< params.length){
                  for (int i = 0; i < parameterCount; i++) {
                      pst.setObject(i+1,params[i]);
                  }
                  result = pst.executeUpdate();
              }else {
                  throw new RuntimeException("参数不匹配");
              }
          } catch (SQLException throwables) {
              throwables.printStackTrace();
          }finally {
              DataSourceUtils.close(this.conn,this.pst);
          }
          return result;
      }
  
      /**
       * 查询一个结果
       * @param sql
       * @param rsh
       * @param params
       * @param <T>
       * @return
       */
      public <T> T findOne(String sql, ResultSetHandler<T> rsh, Object...params){
          T result = null;
          try {
              conn = dataSource.getConnection();
              pst = conn.prepareStatement(sql);
              ParameterMetaData parameterMetaData = pst.getParameterMetaData();
              int parameterCount = parameterMetaData.getParameterCount();
              // 判断参数个数是否匹配
              if(parameterCount< params.length){
                  for (int i = 0; i < parameterCount; i++) {
                      pst.setObject(i+1,params[i]);
                  }
                  rs = pst.executeQuery();
                  result = rsh.handler(rs);
              }else {
                  throw new RuntimeException("参数不匹配");
              }
          } catch (SQLException throwables) {
              throwables.printStackTrace();
          }finally {
              DataSourceUtils.close(this.conn,this.pst,this.rs);
          }
          return result;
  
      }
  }
  ```

- findOne中的ResultSetHandler实现

  - 定义一个接口 ResultSetHandler

  ```java
  package com.dairsaber2.handler;
  
  import java.sql.ResultSet;
  
  public interface ResultSetHandler<T> {
      <T> T handler(ResultSet rs);
  }
  ```

  - 实现findOne 的结果集输出到实体类的类 BeanHandler

  ```java
  package com.dairsaber2.handler;
  
  import java.beans.PropertyDescriptor;
  import java.lang.reflect.Method;
  import java.sql.ResultSet;
  import java.sql.ResultSetMetaData;
  import java.util.Locale;
  
  /**
   * 保存一条数据的处理类
   * @param <T>
   */
  public class BeanHandler<T> implements ResultSetHandler<T>{
      private Class<T> beanClass;
  
      public BeanHandler(Class<T> beanClass) {
          this.beanClass = beanClass;
      }
  
      /**
       *
       * @param rs
       * @param <T>
       * @return
       */
      @Override
      public <T> T handler(ResultSet rs) {
          T result = null;
          try {
              ResultSetMetaData metaData = rs.getMetaData();
              int columnCount = metaData.getColumnCount();
              if(rs.next()){
                  // 创建对象
                  result = (T) beanClass.newInstance();
                  for (int i = 0; i < columnCount; i++) {
                      // 获取列名
                      String columnName = metaData.getColumnName(i);
                      Object value = rs.getObject(i);
                      // 利用反射给对象赋值
                      PropertyDescriptor pd = new PropertyDescriptor(columnName.toLowerCase(), beanClass);
                      // 获取写入方法
                      Method writeMethod = pd.getWriteMethod();
                      writeMethod.invoke(result,value);
                  }
              }
          } catch (Exception throwables) {
              throwables.printStackTrace();
          }
  
          return result;
      }
  }
  ```

  