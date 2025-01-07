package com.recrutement.platforme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recrutement.platforme.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

	List<Application> findByCandidateId(Long candidateId);

}
