package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
	
	@PostMapping
	public ResponseEntity<Job> createJob(@RequestBody Job job){
		return ResponseEntity.ok(jobService.createJob(job));
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
        return ResponseEntity.ok(jobService.updateJob(id, jobDetails));
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
