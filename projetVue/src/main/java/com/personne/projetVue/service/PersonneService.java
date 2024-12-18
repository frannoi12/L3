package com.personne.projetVue.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personne.projetVue.model.Personne;
import com.personne.projetVue.repositry.PersonneRepository;

@Service
public class PersonneService {
	
	@Autowired
	private PersonneRepository personneRepository;
	
	public List<Personne> getAllPersonnes() {
		return personneRepository.findAll();
	}
	
	public Optional<Personne> getUserById(Integer id) {
		return personneRepository.findById(id);
	}
	
	public Personne createPersonne(Personne personne) {
		return personneRepository.save(personne);
	}
	
	public Personne updatePersonne(Integer id, Personne personneDetails) {
		return personneRepository.findById(id).map(personne -> {
			personne.setName(personneDetails.getName());
			personne.setEmail(personneDetails.getEmail());
			personne.setAge(personneDetails.getAge());
			return personneRepository.save(personne);
		}).orElseThrow(() -> new RuntimeException("Personne not found"));
	}
	
	
	public void deletePersonne(int id) {
		personneRepository.deleteById(id);
	}
	
	
	
}
