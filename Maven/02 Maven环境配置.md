## 下载maven

[maven下载地址]:https://maven.apache.org/download.cgi

- mac,linux选择tar.gz archive

## 安装 这边主要讲mac,linux

- 解压下载的下载包到指定位置 maven 依赖java环境请先配好java环境 如JAVA_HONE

  ```shell
  tar xzvf apache-maven-3.6.3-bin.tar.gz
  ```

- 配置环境变量 将解压包中的bin目录配置到环境变量中

  ```zshrc
  export PATH=/自己的目录/apache-maven-3.6.3/bin:$PATH
  ```

  

## 配置本地仓储地址 

比如我这边要把maven本地仓储放在 ~/repository/maven下面

- 打开上述目录 创建repostory目录

  ```shell
  cd ~/repository/maven
  mkdir repository
  ```

- 修改安装目录下的conf文件夹下的setting.xml配置文件

  - 修改本地仓储的位置

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
      <!-- localRepository
       | The path to the local repository maven will use to store artifacts.
       |
       | Default: ${user.home}/.m2/repository
      <localRepository>/path/to/local/repo</localRepository>
      -->
      <localRepository>/Users/dairsaber/repository/maven</localRepository>
      
      <pluginGroups></pluginGroups>
      <proxies></proxies>
      <servers></servers>
    
      <mirrors></mirrors>
      <profiles></profiles>
    </settings>
    
    ```

- 将这个配置文件拷贝到仓储文件夹外面也就是` ~/repository/maven`  我这边是存在这个位置

    ```
    ~/repository/maven ⌚ 15:04:00
    $ tree
    .
    ├── repository
    └── settings.xml # 这边的配置文件 应该和 安装目录下面的配置文件保持一致
    
    1 directory, 1 file
    ```

    

- 修改阿里镜像 还是修改setting.xml 

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <!-- localRepository
     | The path to the local repository maven will use to store artifacts.
     |
     | Default: ${user.home}/.m2/repository
    <localRepository>/path/to/local/repo</localRepository>
    -->
    <localRepository>/Users/dairsaber/repository/maven</localRepository>
    
    <pluginGroups></pluginGroups>
    <proxies></proxies>
    <servers></servers>
  
    <mirrors>
      <!--添加阿里镜像-->
    	 <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>        
      </mirror>
    </mirrors>
    <profiles></profiles>
  </settings>
  
  
  ```

  

## IDEA 中maven配置 

preference中搜索maven 配置其安装目录和本地仓储地址

