package com.recrutement.platforme.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recrutement.platforme.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long>{

}
