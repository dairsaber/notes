package com.dairsaber.dao.impl;

import com.dairsaber.dao.AccountDao;
import com.dairsaber.domain.Account;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository("AccountDao")
public class AccountDaoImpl implements AccountDao {
    @Override
    public Integer insert(Account account) {
        return 1;
    }

    @Override
    public List<Account> findAll() {
        List<Account> accounts =new ArrayList<>();
        accounts.add(new Account("hello the world"));
        return accounts;
    }
}
