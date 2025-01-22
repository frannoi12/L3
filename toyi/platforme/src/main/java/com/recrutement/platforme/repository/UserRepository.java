package com.recrutement.platforme.repository;

import java.util.Optional;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.recrutement.platforme.entity.User;

public interface UserRepository extends ElasticsearchRepository<User, String>{

    Optional<User> findByUsername(String username);
}
