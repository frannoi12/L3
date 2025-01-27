package com.recrutement.platforme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recrutement.platforme.entity.Application;
import com.recrutement.platforme.service.ApplicationService;


@Controller
@RequestMapping("/application")
public class ApplicationViewController {
	
	@Autowired
	private ApplicationService applicationService;

	@GetMapping
	public String viewApplications(Model model) {
//	    List<Application> applications = applicationService.getAllApplications(); // Récupère les candidatures depuis Elasticsearch
//	    System.out.println(applications);
	    model.addAttribute("applications", applicationService.getAllApplications());
	    return "applications/app"; // Vue pour afficher la liste des candidatures
	}
	
	
	@GetMapping("/detail/{id}")
	public String viewApplicationDetail(@PathVariable String id, Model model) {
	    Application application = applicationService.getApplicationById(id); // Récupère une candidature par ID
	    model.addAttribute("app", application);
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
	    return "redirect:/application";
	}
	
	@GetMapping("/update/{id}")
	public String updateApplicationForm(@PathVariable String id, Model model) {
	    Application application = applicationService.getApplicationById(id);
	    model.addAttribute("app", application);
	    return "applications/update-application"; // Vue pour modifier une candidature
	}

	@PostMapping("/update/{id}")
	public String updateApplication(@PathVariable String id, @ModelAttribute Application application) {
	    applicationService.updateApplication(id, application);
	    return "redirect:/application";
	}
	
	@PostMapping("/delete/{id}")
	public String deleteApplication(@PathVariable String id) {
	    applicationService.deleteApplication(id);
	    return "redirect:/application";
	}

}
