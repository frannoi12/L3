package com.recrutement.platforme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recrutement.platforme.entity.Job;
import com.recrutement.platforme.service.JobService;

@Controller
@RequestMapping("/api/jobs")
public class JobViewController {
	
	@Autowired
	private JobService jobService;
	
	
	@GetMapping
	public String viewJobs(Model model) {
        model.addAttribute("jobs", jobService.getAllJobs());
        return "jobs/jobs"; // Correspond au fichier jobs.html dans templates
    }
	
	@GetMapping("/add")
    public String addJobForm(Model model) {
        model.addAttribute("job", new Job()); // Un objet vide pour le formulaire
        return "jobs/add_jobs"; // Correspond au fichier add-job.html
    }
	
	@PostMapping("/add")
    public String addJob(@ModelAttribute Job job) {
        jobService.createJob(job); // Sauvegarde le job
        return "redirect:/api/jobs"; // Redirige vers la liste des jobs
    }
	
	
}
