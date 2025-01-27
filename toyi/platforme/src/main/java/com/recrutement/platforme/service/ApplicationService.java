package com.recrutement.platforme.service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.recrutement.platforme.entity.Application;
import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.repository.ApplicationRepository;
import com.recrutement.platforme.repository.CandidateRepository;
import com.recrutement.platforme.repository.JobRepository;

@Service
public class ApplicationService {

	@Autowired
	private ApplicationRepository applicationRepository;
	
	@Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private RestTemplate restTemplate;
	
	
	private final String API_BASE_URL = "http://localhost:8082/api/applica/";
	
	
	// Obtenir tous les candidats
    public List<Application> getAllApiApplication() {
        Application[] applications = restTemplate.getForObject(API_BASE_URL, Application[].class);
        return Arrays.asList(applications);
    }
    
    // Obtenir un candidat par ID
    public Application getApiApplicationById(String id) {
        String url = API_BASE_URL + id;
        return restTemplate.getForObject(url, Application.class);
    }
    
    // Créer un candidat
    public Application createApiApplication(Application application) {
        return restTemplate.postForObject(API_BASE_URL, application, Application.class);
    }
    
    // Mettre à jour un candidat
    public Application updateApiApplication(String id, Application application) {
        String url = API_BASE_URL + id;
        restTemplate.put(url, application);
        return application; // Retourne le candidat mis à jour
    }
    
 // Supprimer un candidat
    public void deleteApiApplication(String id) {
        String url = API_BASE_URL + id;
        restTemplate.delete(url);
    }
	
	
	
	
	
	
	
	
	
	
	
	
	// Méthode pour récupérer les applications
    public List<Application> getAllApplications() {
        // Obtiens une page d'applications
        Page<Application> page = applicationRepository.findAll(PageRequest.of(0, 10)); // Exemple avec une page de 10 éléments
        return page.getContent(); // Retourne une liste d'applications, pas un Page
    }
	
	// Méthode pour récupérer une seule application par ID
    public Application getApplicationById(String id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));
    }
	

	
	public Application createApplication(Application application) {
        // Vérifier si le jobId existe
        if (!jobRepository.existsById(application.getJobId())) {
            throw new IllegalArgumentException("Job not found with id: " + application.getJobId());
        }

        // Vérifier si le candidateId existe
        if (!candidateRepository.existsById(application.getCandidateId())) {
            throw new IllegalArgumentException("Candidate not found with id: " + application.getCandidateId());
        }

        // Sauvegarder l'application
        return applicationRepository.save(application);
    }
	
	
	public Application updateApplication(String id, Application updatedApplication) {
        // Vérifie si l'application existe
        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));

        // Vérifie si le jobId existe (si fourni)
        if (updatedApplication.getJobId() != null) {
            boolean jobExists = jobRepository.existsById(updatedApplication.getJobId());
            if (!jobExists) {
                throw new IllegalArgumentException("Job ID " + updatedApplication.getJobId() + " does not exist.");
            }
            existingApplication.setJobId(updatedApplication.getJobId());
        }

        // Vérifie si le candidateId existe (si fourni)
        if (updatedApplication.getCandidateId() != null) {
            boolean candidateExists = candidateRepository.existsById(updatedApplication.getCandidateId());
            if (!candidateExists) {
                throw new IllegalArgumentException("Candidate ID " + updatedApplication.getCandidateId() + " does not exist.");
            }
            existingApplication.setCandidateId(updatedApplication.getCandidateId());
        }

        // Mise à jour du statut (si fourni)
        if (updatedApplication.getStatus() != null) {
            existingApplication.setStatus(updatedApplication.getStatus());
        }

        // Sauvegarde et retourne l'application mise à jour
        return applicationRepository.save(existingApplication);
    }
	

    public void deleteApplication(String id) {
        applicationRepository.deleteById(id);
    }
	
	
	
}



//public Application createApplication(Application application) {
//return applicationRepository.save(application);
//}

//public Application updateApplication(Long id, Application applicationDetails) {
//Application application = applicationRepository.findById(id).orElseThrow(() -> new RuntimeException("Application not found"));
//application.setJobId(applicationDetails.getJobId());
//application.setCandidateId(applicationDetails.getCandidateId());
//application.setStatus(applicationDetails.getStatus());
//return applicationRepository.save(application);
//}
