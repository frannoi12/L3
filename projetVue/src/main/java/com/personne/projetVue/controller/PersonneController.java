package com.personne.projetVue.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.personne.projetVue.model.Personne;
import com.personne.projetVue.service.PersonneService;

@Controller

@RequestMapping("personne")

public class PersonneController {
	@Autowired
	private PersonneService personneService;
	
	
	// GET tous les utilisateurs
	@GetMapping
	public String listPersonne(Model model) {
		model.addAttribute("personnes", personneService.getAllPersonnes());
		return "personnes";
	}
	
	@GetMapping("/add")
	public String addPersonneForm(Model model) {
		model.addAttribute("personne", new Personne());
		return "add-personne";
	}
	
	
	@PostMapping("/add")
	public String saveUser(@ModelAttribute("personne") Personne personne) {
		personneService.createPersonne(personne);
		return "redirect:/personne";
	}
	
	@GetMapping("/edit/{id}")
	public String editUserForm(@PathVariable int id, Model model) {
		Optional<Personne> optionalPersonne = personneService.getUserById(id);
//		System.out.println(personne);
        if (!optionalPersonne.isPresent()) {
            return "redirect:/error"; // Redirect to an error page if user not found
        }
        model.addAttribute("personne", optionalPersonne.get());
        return "editPersonne"; // Ensure this view exists
	}
	
	@PostMapping("/edit/{id}")
	public String updatePersonne(@PathVariable int id, @ModelAttribute("personne") Personne personne) {
		personne.setId(id);
		personneService.updatePersonne(personne.getId(),personne);
		return "redirect:/personne";
	}
	
	
	@GetMapping("/delete/{id}")
	public String deletePersonne(@PathVariable int id) {
		personneService.deletePersonne(id);
		return "redirect:/personne";
	}
	
	
}
