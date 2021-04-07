package com.dairsaber.service.impl;

import com.dairsaber.dao.AccountDao;
import com.dairsaber.domain.Account;
import com.dairsaber.service.AccountService;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.List;

@Service("AccountService")
public class AccountServiceImpl implements AccountService {
    private static ClassPathXmlApplicationContext ctx;
    private static AccountDao accountDao;

    static {
        ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        accountDao = (AccountDao) ctx.getBean("AccountDao");
    }

    @Override
    public void insert(Account account) {
        Integer insert = accountDao.insert(account);
        System.out.println("insert ===> " + insert);
    }

    @Override
    public void findAll() {
        List<Account> all = accountDao.findAll();
        for (Account account : all) {
            System.out.println(account);
        }
    }

    // 当是单例模式下此方法执行以下 在类被加载时就执行, prototype模式下创建一次 init一下,执行时机在创建实例
    @PostConstruct
    void init() {
        System.out.println("init ...");
    }

    @PreDestroy
    void destroy() {
        System.out.println("destroy ...");
    }
}
