package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recrutement.platforme.entity.Application;
import com.recrutement.platforme.service.ApplicationService;


@RestController
@RequestMapping("/api/application")
public class ApplicationViewController {
	
	@Autowired
	private ApplicationService applicationService;

	@GetMapping
	public String viewApplications(Model model) {
	    List<Application> applications = applicationService.getAllApplications(); // Récupère les candidatures depuis Elasticsearch
	    System.out.println(applications);
	    model.addAttribute("applications", applications);
	    return "applications/applications"; // Vue pour afficher la liste des candidatures
	}
	
	
	@GetMapping("/{id}")
	public String viewApplicationDetail(@PathVariable String id, Model model) {
	    Application application = applicationService.getApplicationById(id); // Récupère une candidature par ID
	    model.addAttribute("application", application);
	    return "applications/application-detail"; // Vue pour afficher les détails
	}

	@GetMapping("/add")
	public String addApplicationForm(Model model) {
	    model.addAttribute("application", new Application());
	    return "applications/add-application"; // Vue pour ajouter une candidature
	}

	@PostMapping("/add")
	public String addApplication(@ModelAttribute Application application) {
	    applicationService.createApplication(application); // Sauvegarde la candidature
	    return "redirect:/api/applications";
	}
	
	@GetMapping("/update/{id}")
	public String updateApplicationForm(@PathVariable String id, Model model) {
	    Application application = applicationService.getApplicationById(id);
	    model.addAttribute("application", application);
	    return "applications/update-application"; // Vue pour modifier une candidature
	}

	@PostMapping("/update/{id}")
	public String updateApplication(@PathVariable String id, @ModelAttribute Application application) {
	    applicationService.updateApplication(id, application);
	    return "redirect:/api/applications";
	}
	
	@PostMapping("/delete/{id}")
	public String deleteApplication(@PathVariable String id) {
	    applicationService.deleteApplication(id);
	    return "redirect:/api/applications";
	}

}
