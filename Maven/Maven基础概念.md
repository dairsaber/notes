## 仓库

- 用于存储资源, 包含各种jar包

- 仓库分类:

  - 本地仓库:
  - 远程仓库
    - 中央仓库
    - 私服

- 私服的作用

  - 保存具有版权的资源, 包含购买或自主研发的jar
    - 中央仓库中的jar都是开源的, 不能存储具有版权的资源
  - 一定范围内共享资源, 仅对内部开放, 不对外共享

  

## 坐标

## POM

The `pom.xml` file is the core of a project's configuration in Maven. It is a single configuration file that contains the majority of information required to build a project in just the way you want. The POM is huge and can be daunting in its complexity, but it is not necessary to understand all of the intricacies just yet to use it effectively. This project's POM is:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 <!--本项目配置-->
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
 <!--release,和snapshot:release是指生产环境版本,snapshot是指开发版本-->
  <version>1.0-SNAPSHOT</version>
  <!--jar,war-->
  <package>jar</package>
 
  <properties>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>
  
 <!--jar包依赖-->
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  
  <!--插件配置-->
   <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.8.1</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
  
</project>
```












