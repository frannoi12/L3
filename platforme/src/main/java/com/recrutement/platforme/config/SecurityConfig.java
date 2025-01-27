package com.recrutement.platforme.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/register", "/css/**", "/js/**").permitAll() // Accessible à tous
                .anyRequest().authenticated() // Toutes les autres URL nécessitent une authentification
            )
		.formLogin(form -> form
                .loginPage("/login") // URL pour la page de connexion
                .defaultSuccessUrl("/home", true) // Redirection après connexion
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout") // URL pour déconnexion
                .logoutSuccessUrl("/login?logout") // Redirection après déconnexion
                .permitAll()
            );
		return http.build();
	}
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encoder pour les mots de passe
    }
	
}
