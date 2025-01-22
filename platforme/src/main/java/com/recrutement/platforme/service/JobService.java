package com.recrutement.platforme.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.repository.JobRepository;

@Service
public class JobService {
	
	@Autowired
	private JobRepository jobRepository;
	
	@Autowired
    private RestTemplate restTemplate;
	
	
	
    
	
	// api graphql
	public JobService(JobRepository jobRepository) {
		this.jobRepository = jobRepository;
    }
	
	public List<Job> getJobsFromApi() {
        String url = "http://localhost:8082/api/jobs/"; // URL de l'API à consommer
        Job[] jobs = restTemplate.getForObject(url, Job[].class);
        return Arrays.asList(jobs); // Convertir en liste
    }

    public Job getJobByIdFromApi(String id) {
        String url = "http://localhost:8082/api/jobs/" + id; // URL avec ID
        return restTemplate.getForObject(url, Job.class);
    }
    
    public Job createAJob(Job job) {
        String url = "http://localhost:8082/api/jobs/";
        return restTemplate.postForObject(url, job, Job.class);
    }

    public Job updateApiJob(String id, Job job) {
        String url = "http://localhost:8082/api/jobs/" + id;
        restTemplate.put(url, job);
        return job; // Retourner l'objet mis à jour
    }

    
    public void deleteApiJob(String id) {
        String url = "http://localhost:8082/api/jobs/" + id;
        restTemplate.delete(url);
    }

    
    
    
    
    
    
    
    

    public Job save(Job job) {
        return jobRepository.save(job);
    }

    public Optional<Job> findById(String id) {
        return jobRepository.findById(id);
    }

    public List<Job> findAll() {
        return (List<Job>) jobRepository.findAll();
    }

    public void deleteById(String id) {
        jobRepository.deleteById(id);
    }
    
    // api rest
	
    public List<Job> getAllJobs() {
        // Utilisation de Pageable pour récupérer la page
        Pageable pageable = PageRequest.of(0, 10); // page 0, 10 résultats par page
        Page<Job> jobsPage = jobRepository.findAll(pageable); // Utilisation de la pagination

        // Retourner simplement la liste des éléments dans la page
        return jobsPage.getContent(); // Récupération de la liste d'éléments
    }
	
    public List<Job> searchJobsByTitle(String title) {
        return jobRepository.findByTitleContaining(title); // Recherche dans Elasticsearch
    }

	
	public Job createJob(Job job) {
		return jobRepository.save(job);
	}
	
	public Job updateJob(String id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setCompanyId(jobDetails.getCompanyId());
        job.setLocation(jobDetails.getLocation());
        job.setStatus(jobDetails.getStatus());
        return jobRepository.save(job);
    }
	
	public Job getJobById(String id) {
		System.out.println(id);
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found")); 
	}
	
	
	public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }
	
}
