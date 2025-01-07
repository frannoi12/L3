package com.recrutement.platforme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.repository.CandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candidateRepository;
	
	public List<Candidate> getAllCandidates() {
	    return candidateRepository.findAll();
	}
	
	public Candidate createCandidate(Candidate candidate) {
		return candidateRepository.save(candidate);
	}
	
	public Candidate updateCandidate(Long id, Candidate candidateDetails) {
        Candidate candidate = getCandidateById(id);
        candidate.setName(candidateDetails.getName());
        candidate.setEmail(candidateDetails.getEmail());
        candidate.setResume(candidateDetails.getResume());
        candidate.setSkills(candidateDetails.getSkills());
        return candidateRepository.save(candidate);
    }
	
	public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
	
	public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }
}
