package com.recrutement.platforme.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recrutement.platforme.entity.Application;
import com.recrutement.platforme.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/applica/")
public class ApplicationController {
	
	@Autowired
	private ApplicationService applicationService;
	
	
	@GetMapping
	@Operation(summary = "Récupère toutes les candidatures", description = "Permet de récupéré la liste des candidatures avec pagination")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Succès",
					content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = Application.class))),
			@ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
	})
	public ResponseEntity<List<Application>> getAllApplications() {
	    return ResponseEntity.ok(applicationService.getAllApplications());
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable String id) {
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
	public ResponseEntity<Application> updateApplication(@PathVariable String id, @RequestBody Application updatedApplication) {
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
    public ResponseEntity<Void> deleteApplication(@PathVariable String id) {
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
