package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

	@Autowired
	private CandidateService candidateService;
	
	@GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return ResponseEntity.ok(candidateService.getAllCandidates());
    }
	
	@PostMapping
	public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate canditate){
		return ResponseEntity.ok(candidateService.createCandidate(canditate));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
		return ResponseEntity.ok(candidateService.getCandidateById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidateDetails) {
        return ResponseEntity.ok(candidateService.updateCandidate(id, candidateDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }
}
