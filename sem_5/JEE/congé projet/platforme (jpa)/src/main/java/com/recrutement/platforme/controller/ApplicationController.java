package com.recrutement.platforme.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Application;
import com.recrutement.platforme.service.ApplicationService;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {
	
	@Autowired
	private ApplicationService applicationService;
	
	
	@GetMapping
	public ResponseEntity<List<Application>> getAllApplications() {
	    return ResponseEntity.ok(applicationService.getAllApplications());
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        try {
            Application application = applicationService.getApplicationById(id);
            return ResponseEntity.ok(application);  // Retourne l'application trouvée avec un statut 200 OK
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Retourne une erreur 404 si l'application n'est pas trouvée
        }
    }

	
	@PostMapping
	public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        try {
            Application savedApplication = applicationService.createApplication(application);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

	
	@PutMapping("/{id}")
	public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application updatedApplication) {
	    try {
	        Application application = applicationService.updateApplication(id, updatedApplication);
	        return ResponseEntity.ok(application);
	    } catch (NoSuchElementException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}

	
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
	
		
	
}

//public ResponseEntity<Application> createApplication(@RequestBody Application application) {
//return ResponseEntity.ok(applicationService.createApplication(application));
//}

//@GetMapping("/candidate/{candidateId}")
//public ResponseEntity<List<Application>> getApplicationsByCandidateId(@PathVariable Long candidateId) {
//return ResponseEntity.ok(applicationService.getApplicationsByCandidateId(candidateId));
//}


//@PutMapping("/{id}")
//public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application applicationDetails) {
//return ResponseEntity.ok(applicationService.updateApplication(id, applicationDetails));
//}
