package com.ifntiTP.servlets;

import java.io.IOException;
import java.rmi.ServerException;
import java.util.ArrayList;

import com.ifntiTP.beans.BeanUtilisateur;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/in")

public class Inscription extends HttpServlet{

	private static final long serialVersionUID = 1L;
	ArrayList<BeanUtilisateur> users = new ArrayList<BeanUtilisateur>();

	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServerException,IOException{
		RequestDispatcher premier = request.getRequestDispatcher("inscription.jsp");
		try {
			premier.forward(request, response);
		} catch (ServletException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServerException,IOException {

		String name = request.getParameter("nom");
		String pass = request.getParameter("password");
		BeanUtilisateur user = new BeanUtilisateur();
		user.setNom(name);
		user.setPassword(pass);
		users.add(user);
		
		request.setAttribute("infos", user);
		
		
		RequestDispatcher premier = request.getRequestDispatcher("ifnti.jsp");
		try {
			premier.forward(request, response);
		} catch (ServletException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
