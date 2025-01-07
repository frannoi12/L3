package com.recrutement.platforme.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recrutement.platforme.entity.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

}
