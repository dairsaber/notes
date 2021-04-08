package com.dairsaber.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan("com.dairsaber")
@Import(JDBCConfig.class)
public class SpringConfig {
}
