[源码](./sources/SpringDemo)

## 目录

```
.
├── SpringDemo.iml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── dairsaber
    │   │           ├── config
    │   │           │   ├── JDBCConfig.java
    │   │           │   ├── MybatisConfig.java
    │   │           │   └── SpringConfig.java
    │   │           ├── dao
    │   │           │   └── AccountDao.java
    │   │           ├── domain
    │   │           │   └── Account.java
    │   │           └── service
    │   │               ├── AccountService.java
    │   │               └── impl
    │   │                   └── AccountServiceImpl.java
    │   └── resources
    │       └── jdbc.properties
    └── test
        └── java
            └── com
                └── dairsaber
                    └── service
                        └── AccountServiceTest.java

```



## 工程文件

### `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>SpringDemo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--spring-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.9.RELEASE</version>
        </dependency>
        <!--jdbc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.2.9.RELEASE</version>
        </dependency>
        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.3</version>
        </dependency>
        <!--mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <!--阿里巴巴的datasource-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.5</version>
        </dependency>
        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.0</version>
        </dependency>
        <!--集成junit测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.13.RELEASE</version>
            <scope>test</scope>
        </dependency>
        <!--end-->
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>80</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### `jdbc.properties`

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://10.211.55.5:3306/spring_db?useSSL=false
jdbc.username=root
jdbc.password=dairsaber
```



## 配置类

### Spring配置

- `SpringConfig.java`

```java
package com.dairsaber.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.dairsaber")
@PropertySource("classpath:jdbc.properties")
@Import({JDBCConfig.class, MybatisConfig.class})
public class SpringConfig {
}

```

- `Mybatis.config`

```java
package com.dairsaber.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

// 作为一个被主配置导入的配置类 我们不需要用@Component 注解修饰 用脑子想想就知道为什么 人家都手动导入 你要扫描个鸡儿.
public class MybatisConfig {

    @Value("com.dairsaber.domain")
    private String typeAliasesPackage;

    @Bean
    // 注意这边的get方法是需要一个参数的 我们用Autowired注入 提供给spring使用
    public SqlSessionFactoryBean getSqlSessionFactory(@Autowired DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setTypeAliasesPackage(typeAliasesPackage);
        return sqlSessionFactoryBean;
    }

    @Bean
    public MapperScannerConfigurer getMapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("com.dairsaber.dao");
        return mapperScannerConfigurer;
    }
}

```

- `JDBCConfig.java`

```java
package com.dairsaber.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class JDBCConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    //datasource bean
    @Bean("dataSource")
    public DruidDataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        return ds;
    }
}
```

## 数据层文件

- `AccountDao.java`

```java
package com.dairsaber.dao;

import com.dairsaber.domain.Account;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface AccountDao {
    @Insert("INSERT INTO account VALUES (#{id},#{name},#{money})")
    Integer insert(Account account);
    @Delete("DELETE FROM account WHERE id=#{id}")
    Integer delete(Integer id);
    @Select("SELECT * FROM account")
    List<Account> findAll();
    @Update("UPDATE account SET name=#{name} money=#{money}")
    Integer update(Account account);
    @Select("SELECT * FROM account WHERE id=${id}")
    Account findById(Integer id);
}
```

## 测试代码

- `AccountServiceTest.java`

```java
package com.dairsaber.service;

import com.dairsaber.config.SpringConfig;
import com.dairsaber.domain.Account;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * 测试类的配置
 */
@RunWith(SpringJUnit4ClassRunner.class) // junit 要用spring测试的类加载器
@ContextConfiguration(classes = SpringConfig.class) //spring 配置类
public class AccountServiceTest {
    private AccountService accountService;

    @Autowired
    public void setAccountService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Test
    public void insert(){
        Account account = new Account();
        account.setMoney(333.33);
        account.setName("dairsaber");
        List<Account> all01 = accountService.findAll();
        int oldSize = all01.size();
        accountService.insert(account);
        List<Account> all02 = accountService.findAll();
        int newSize = all02.size();
        Assert.assertEquals(oldSize+1,newSize);
    }
}
```



## 其他文件(略)

