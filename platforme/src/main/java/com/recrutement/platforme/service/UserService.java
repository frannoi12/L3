package com.recrutement.platforme.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recrutement.platforme.entity.User;
import com.recrutement.platforme.repository.UserRepository;

@Service
public class UserService {

	 @Autowired
	 private UserRepository userRepository;

	    @Autowired
	    private PasswordEncoder passwordEncoder;
	    
	    
	 // Créer un nouvel utilisateur
	    public User createUser(User user) {
	        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode le mot de passe
	        return userRepository.save(user);
	    }

	    // Trouver un utilisateur par son ID
	    public Optional<User> getUserById(String id) {
	        return userRepository.findById(id);
	    }

	    // Trouver un utilisateur par son nom d'utilisateur
	    public Optional<User> getUserByUsername(String username) {
	        return userRepository.findByUsername(username);
	    }

	    // Supprimer un utilisateur
	    public void deleteUser(String id) {
	        userRepository.deleteById(id);
	    }

	    // Vérifier l'existence d'un utilisateur
	    public boolean existsByUsername(String username) {
	        return userRepository.findByUsername(username).isPresent();
	    }
}
