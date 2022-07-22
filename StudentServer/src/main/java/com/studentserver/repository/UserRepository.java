package com.studentserver.repository;

import org.springframework.data.repository.CrudRepository;

import com.studentserver.model.UserDao;
public interface UserRepository extends CrudRepository<UserDao, Integer> {
    UserDao findByUsername(String username);
}