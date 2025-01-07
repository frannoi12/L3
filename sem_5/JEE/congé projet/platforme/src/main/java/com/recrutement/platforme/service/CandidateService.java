package com.recrutement.platforme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.repository.CandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candidateRepository;
	
	// Méthode pour obtenir les candidats avec pagination
    public List<Candidate> getAllCandidates(int page, int size) {
        Page<Candidate> candidatePage = candidateRepository.findAll(PageRequest.of(page, size));
        return candidatePage.getContent(); // Récupérer la liste des candidats de la page
    }
	
	public Candidate createCandidate(Candidate candidate) {
		return candidateRepository.save(candidate);
	}
	
	public Candidate updateCandidate(String id, Candidate candidateDetails) {
        Candidate candidate = getCandidateById(id);
        candidate.setName(candidateDetails.getName());
        candidate.setEmail(candidateDetails.getEmail());
        candidate.setResume(candidateDetails.getResume());
        candidate.setSkills(candidateDetails.getSkills());
        return candidateRepository.save(candidate);
    }
	
	public Candidate getCandidateById(String id) {
        return candidateRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
	
	public void deleteCandidate(String id) {
        candidateRepository.deleteById(id);
    }
}
