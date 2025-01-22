package com.recrutement.platforme.repository;


import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.recrutement.platforme.entity.Candidate;

public interface CandidateRepository extends ElasticsearchRepository<Candidate, String> {

	// Recherche de tous les candidats
    List<Candidate> findAll();
}
