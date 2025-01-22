package com.recrutement.platforme.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.recrutement.platforme.entity.User;

@Controller
public class AuthController {

	
	
	@GetMapping("/login")
    public String loginPage() {
        return "login"; // Vue de connexion
    }

    @GetMapping("/register")
    public String registerPage(Model model) {
        model.addAttribute("user", new User());
        return "register"; // Vue d'inscription
    }
    

}
