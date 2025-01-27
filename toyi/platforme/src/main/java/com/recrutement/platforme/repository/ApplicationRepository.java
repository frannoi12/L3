package com.recrutement.platforme.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.recrutement.platforme.entity.Application;

public interface ApplicationRepository extends ElasticsearchRepository<Application, String> {


}
