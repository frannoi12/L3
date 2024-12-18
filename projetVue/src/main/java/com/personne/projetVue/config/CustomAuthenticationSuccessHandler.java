package com.personne.projetVue.config;

import java.io.IOException;
import java.rmi.ServerException;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationSuccessHandler implements ServerAuthenticationSuccessHandler {

	@Override
	public void onAuthentificationSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException, ServerException{
		String redirectUrl = url;
		for (GrantedAuthority authority : authentication.getAuthorities()) {
			String role = authority.getAuthority();
			if("ROLE_ADMIN".equals(role)) {
				redirectUrl = "/personne";
				break;
			}else if("ROLE_USER".equals(role)) {
				
			}
		}
	}
}
