package com.recrutement.platforme.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.repository.CandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candidateRepository;
	
	@Autowired
	private RestTemplate restTemplate;
	
	
	private final String API_BASE_URL = "http://localhost:8082/api/candidates/";

    // Obtenir tous les candidats
    public List<Candidate> getAllApiCandidates() {
        Candidate[] candidates = restTemplate.getForObject(API_BASE_URL, Candidate[].class);
        return Arrays.asList(candidates);
    }
    
    // Obtenir un candidat par ID
    public Candidate getApiCandidatesById(String id) {
        String url = API_BASE_URL + id;
        return restTemplate.getForObject(url, Candidate.class);
    }
    
    // Créer un candidat
    public Candidate createApiCandidate(Candidate candidate) {
        return restTemplate.postForObject(API_BASE_URL, candidate, Candidate.class);
    }
    
    // Mettre à jour un candidat
    public Candidate updateApiCandidate(String id, Candidate candidate) {
        String url = API_BASE_URL + id;
        restTemplate.put(url, candidate);
        return candidate; // Retourne le candidat mis à jour
    }
    
 // Supprimer un candidat
    public void deleteApiCandidate(String id) {
        String url = API_BASE_URL + id;
        restTemplate.delete(url);
    }
	
	
	
	
	
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
