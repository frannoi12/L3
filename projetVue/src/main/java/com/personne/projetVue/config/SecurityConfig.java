package com.personne.projetVue.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public InMemoryUserDetailsManager userDetailsManager() {
		UserDetails user = User.withUsername("user")
				.password("{noop}password")
				.roles("USER")
				.build();
		UserDetails admin = User.withUsername("admin")
				.password("{noop}admin")
				.roles("ADMIN")
				.build();
		return new InMemoryUserDetailsManager(user, admin);
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		return http
				.formLogin(formLogin->formLogin
						.loginPage("/login")
						.defaultSuccessUrl("/personne")
						.permitAll())
				.logout(logout->logout
						.logoutUrl("/logout")
						.logoutSuccessUrl("/login")
						.invalidateHttpSession(true)
						.deleteCookies("JSESSIONID"))			
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers("/inscription","/css/**","/js/**").permitAll()
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.requestMatchers("/user/**").hasRole("USER")				
						.anyRequest().authenticated())
				.build();
	}
}
