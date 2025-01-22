package com.recrutement.platforme.entity;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;

@Document(indexName = "users")
public class User {

	@Id
	private String id;
	
	private String userName;
	
	private String password;
	
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> roles;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
		
}
