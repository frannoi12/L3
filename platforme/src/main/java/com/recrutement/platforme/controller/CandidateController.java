package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.service.CandidateService;

@RestController
@RequestMapping("/api/candidates/")
public class CandidateController {

	@Autowired
	private CandidateService candidateService;
	
	@GetMapping
	public List<Candidate> getAllCandidates(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return candidateService.getAllCandidates(page, size);
	}
	
	@PostMapping
	public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate canditate){
		return ResponseEntity.ok(candidateService.createCandidate(canditate));
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Candidate> getCandidateById(@PathVariable String id) {
		return ResponseEntity.ok(candidateService.getCandidateById(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable String id, @RequestBody Candidate candidateDetails) {
        return ResponseEntity.ok(candidateService.updateCandidate(id, candidateDetails));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable String id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }
}
