package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	//Récupérer tous les jobs 
	@GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
		List<Job> jobs = jobService.getAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
	
	// Rechercher des jobs par titre
    @GetMapping("/search")
    public List<Job> searchJobs(@RequestParam String title) {
        return jobService.searchJobsByTitle(title);
    }
    
	
    // Créer un nouveau job
	@PostMapping
	public ResponseEntity<Job> createJob(@RequestBody Job job){
		return ResponseEntity.ok(jobService.createJob(job));
	}
	
	// Obtenir un job par ID
	@GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
	
	// Mettre à jour un job existant
	@PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job jobDetails) {
        return ResponseEntity.ok(jobService.updateJob(id, jobDetails));
    }
	
	// Supprimer un job par ID
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
