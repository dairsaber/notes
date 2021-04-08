package com.dairsaber.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;

// 加载properties属性
@PropertySource("classpath:jdbc.properties")
public class JDBCConfig {
    //注入properties值
    @Value("jdbc.driverClassName")
    private String driverClassName;
    @Value("jdbc.url")
    private String url;
    @Value("jdbc.url")
    private String username;
    @Value("jdbc.password")
    private String password;
    // 加载第三方资源
    @Bean("dataSource")
    DruidDataSource getDataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driverClassName);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        return ds;
    }
}
