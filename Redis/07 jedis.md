# jedis

是java用来操控redis的工具包

## 简单的helloword程序

- 步骤

  1. 导包

  2. ```java
     package com.dairsaber;
     
     import redis.clients.jedis.Jedis;
     
     import java.util.List;
     
     public class JedisTest {
         public static void main(String[] args) {
             // 1. 连接Redis
             Jedis jedis = new Jedis("10.211.55.5",6379);
             // 2. 操作Redis
             // (1) 普通字符串操作
             jedis.set("test","1002");
             Long result = jedis.incrBy("test",33);
             System.out.println(result);
             // (2) list操作
             jedis.lpush("lpush","a","b","c","d");
             List<String> lpush = jedis.lrange("lpush", 0, -1);
             for (String s : lpush) {
                 System.out.println("result ==> "+ s);
             }
             // (3) set操作
             jedis.sadd("set","abdc","abdc","sdsa","ffff");
             Long setLen = jedis.scard("set");
             System.out.println("set length ==> " + setLen);
             // (4) 其他操作 ...
             // 3. 释放资源
             jedis.close();
         }
     }
     
     ```

## 利用jedis连接池来封装一个jedisUtils 工具类

1. 导包

   - commons-pool2-2.6.2
   - jedis-3.3.0
   - log4j-1.2.17
   - slf4j-api-1.7.30
   - slf4j-log4j12-1.7.30

2. 代码 JedisUtils.java

   ```java
   package com.dairsaber.util;
   
   import redis.clients.jedis.Jedis;
   import redis.clients.jedis.JedisPool;
   import redis.clients.jedis.JedisPoolConfig;
   
   import java.util.ResourceBundle;
   
   public class JedisUtils {
       private  static JedisPool jp;
       static {
           ResourceBundle bundle = ResourceBundle.getBundle("redis");
           int maxTotal = Integer.parseInt(bundle.getString("redis.maxTotal"));
           int maxIdel = Integer.parseInt(bundle.getString("redis.maxIdel"));
           String host = bundle.getString("redis.host");
           int port = Integer.parseInt(bundle.getString("redis.port"));
           
           // jedis连接池配置
           JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
           jedisPoolConfig.setMaxTotal(maxTotal);
           jedisPoolConfig.setMaxIdle(maxIdel);
   
           // 创建连接池对象
           jp = new JedisPool(jedisPoolConfig,host,port);
   
       }
       public static Jedis getJedis(){
           return jp.getResource();
       }
   }
   ```

3. redis.properties

   ```properties
   redis.maxTotal=50
   redis.maxIdel=10
   redis.host=10.211.55.5
   redis.port=6379
   ```

   