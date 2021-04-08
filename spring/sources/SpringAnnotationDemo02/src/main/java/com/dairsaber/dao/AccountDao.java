package com.dairsaber.dao;

import com.dairsaber.domain.Account;

import java.util.List;

public interface AccountDao {
     Integer insert(Account account);
     List<Account> findAll();

}
