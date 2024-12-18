package com.personne.projetVue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogoutController {

	@GetMapping("/logout")
	public String logoutSucces() {
		return "login";// Nom de la vue Thymeleaf
	}
}
