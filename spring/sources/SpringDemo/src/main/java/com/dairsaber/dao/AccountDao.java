package com.dairsaber.dao;

import com.dairsaber.domain.Account;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface AccountDao {
    @Insert("INSERT INTO account VALUES (#{id},#{name},#{money})")
    Integer insert(Account account);
    @Delete("DELETE FROM account WHERE id=#{id}")
    Integer delete(Integer id);
    @Select("SELECT * FROM account")
    List<Account> findAll();
    @Update("UPDATE account SET name=#{name} money=#{money}")
    Integer update(Account account);
    @Select("SELECT * FROM account WHERE id=${id}")
    Account findById(Integer id);
}
