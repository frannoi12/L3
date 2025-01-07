package com.recrutement.platforme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.repository.JobRepository;

@Service
public class JobService {
	
	@Autowired
	private JobRepository jobRepository;
    
    
	
	public List<Job> getAllJobs() {
	    return jobRepository.findAll();
	}
	
	public Job createJob(Job job) {
		return jobRepository.save(job);
	}
	
	public Job updateJob(Long id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setCompanyId(jobDetails.getCompanyId());
        job.setLocation(jobDetails.getLocation());
        job.setStatus(jobDetails.getStatus());
        return jobRepository.save(job);
    }
	
	public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found")); 
	}
	
	
	public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
	
}
