#  SQL片段抽取

- 我们可以将一些重复性的sql语句进行抽取,已达到复用效果.

- <sql>: 抽取sql语句标签

  ```xml
  <sql id="片段唯一标识"> 抽取的sql语句 </sql> 
  ```

- <include>: 引入sql片段标签

  ```xml
  <include refid="片段唯一标识"/>
  ```

- 原来映射配置

  ```xml
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

- 我们将SELECT * FROM 抽取出来

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="StudentMapper">
  	  <!-- -->
    	<sql id="select">SELECT * FROM </sql>
    
      <select id="selectAll" resultType="student">
        	<!-- -->
          <include refid="select"/> student;
      </select>
    
      <select id="selectById" resultType="student" parameterType="int">
        	<!-- -->
          <include refid="select"/> student WHERE sid = #{sid};
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

  