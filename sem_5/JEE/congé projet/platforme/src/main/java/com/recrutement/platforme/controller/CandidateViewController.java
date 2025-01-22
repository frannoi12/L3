package com.recrutement.platforme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recrutement.platforme.entity.Candidate;
import com.recrutement.platforme.service.CandidateService;


@Controller
@RequestMapping("/api/candidates")
public class CandidateViewController {

	@Autowired
	private CandidateService candidateService;
	
	@GetMapping
	public String viewCandidates(Model model) {
	    List<Candidate> candidates = candidateService.getAllCandidates(0,10); // Récupérer les candidats depuis Elasticsearch
	    model.addAttribute("candidates", candidates);
	    return "candidates/candidates"; // Vue pour afficher la liste des candidats
	}
	
	@GetMapping("/detail/{id}")
	public String viewCandidateDetail(@PathVariable String id, Model model) {
	    Candidate candidate = candidateService.getCandidateById(id); // Récupérer depuis Elasticsearch
	    model.addAttribute("candidate", candidate);
	    return "candidates/candidates_detail"; // Vue pour afficher les détails du candidat
	}
	
	
	@GetMapping("/add")
	public String addCandidateForm(Model model) {
	    model.addAttribute("candidate", new Candidate()); // Objet vide pour le formulaire
	    return "candidates/add_candidates"; // Vue pour ajouter un candidat
	}

	@PostMapping("/add")
	public String addCandidate(@ModelAttribute Candidate candidate) {
	    candidateService.createCandidate(candidate); // Sauvegarder le candidat
	    return "redirect:/api/candidates"; // Rediriger vers la liste des candidats
	}
	
	@GetMapping("/update/{id}")
	public String updateCandidateForm(@PathVariable String id, Model model) {
	    Candidate candidate = candidateService.getCandidateById(id); // Charger les données existantes
	    model.addAttribute("candidate", candidate);
	    return "candidates/update_candidates"; // Vue pour modifier le candidat
	}
	
	@PostMapping("/update/{id}")
	public String updateCandidate(@PathVariable String id, @ModelAttribute Candidate candidate) {
	    candidateService.updateCandidate(id, candidate); // Mettre à jour le candidat
	    return "redirect:/api/candidates"; // Rediriger vers la liste des candidats
	}

	@PostMapping("/delete/{id}")
	public String deleteCandidate(@PathVariable String id) {
	    candidateService.deleteCandidate(id); // Supprimer le candidat
	    return "redirect:/api/candidates"; // Rediriger vers la liste des candidats
	}


}
