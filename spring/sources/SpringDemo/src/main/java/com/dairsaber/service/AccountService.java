package com.dairsaber.service;

import com.dairsaber.domain.Account;

import java.util.List;

public interface AccountService {
    void insert(Account account);
    void delete(Integer id);
    List<Account> findAll();
    void update(Account account);
    Account findById(Integer id);
}
