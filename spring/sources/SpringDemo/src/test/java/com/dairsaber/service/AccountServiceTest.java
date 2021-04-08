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
