package com.recrutement.platforme.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import com.recrutement.platforme.entity.Job;

public interface JobRepository extends ElasticsearchRepository<Job, String> {
    Page<Job> findByTitleContaining(String keyword, Pageable pageable);
    List<Job> findByTitleContaining(String title);
}
