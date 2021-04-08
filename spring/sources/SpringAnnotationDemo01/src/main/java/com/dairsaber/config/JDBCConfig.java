package com.dairsaber.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

// 标志他呗spring扫描到
@Component
public class JDBCConfig {
    // 加载第三方资源
    @Bean("dataSource")
    DruidDataSource getDataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://10.211.55.5/spring_db");
        ds.setUsername("root");
        ds.setPassword("dairsaber");
        return ds;
    }
}
