package com.dairsaber;

import com.alibaba.druid.pool.DruidDataSource;
import com.dairsaber.domain.Account;
import com.dairsaber.service.AccountService;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    // 这边用来测试spring容器提供的这些类能不能用
    public static void main(String[] args) {
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService accountService = (AccountService) ctx.getBean("AccountService");
        accountService.findAll();
        accountService.insert(new Account());
        DruidDataSource dataSource = (DruidDataSource) ctx.getBean("dataSource");
        System.out.println(dataSource);
    }
}
