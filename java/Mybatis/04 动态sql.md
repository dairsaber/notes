## 动态sql介绍

-  MyBatis映射配置文件中,前面我们的sql都是比较简单的, 有些时候业务逻辑比较复杂是, 我们的sql就是动态变化的, 此时在前面学习sql 就不能满足需求了.
- 多条件查询, 

##  动态标签

- <if> 标签
- <where> 标签 替换WHERE关键字的

```xml-dtd
...
<mapper>
  <select id="selectCondition" resultType="student" parameterType="student">
    SELECT * FROM student
    <where>
      <if test="id != null">
      	id = #{id}
      </if>
      <if test="name != null">
      	AND name = #{name}
      </if>
      <if test="age != null">
      	AND age = #{age}
      </if>
    </where>
  </select>
</mapper>
```

- <foreach> 标签

  ```xml
  <foreach collection="" open="" close="" item="" separator="">
    获取参数
  </foreach>
  ```

  - collection: 参数容器类型, list-> 集合, array ->数组
  - open: 开始的sql语句
  - close: 结束的sql语句
  - item: 参数变量名
  - separator: 分隔符

```xml-dtd

  ...
<mapper>
  <select id="selectByIds" resultType="student" parameterType="list">
<!--SELECT * FROM student WHERE id IN (1,2,3)-->
    SELECT * FROM student 
  	<where>
      <foreach collection="list" open="id IN (" close=")" item="id" separator=",">
        #{id}
      </foreach>
    </where>
  </select>
</mapper>
</mapper>
```





