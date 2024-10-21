package com.ifntiTP.servlets;

import java.io.IOException;
import java.rmi.ServerException;

import com.ifntiTP.beans.BeanUtilisateur;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/con")

public class Connexion extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServerException,IOException{
		
//		String name = request.getParameter("name");
		
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
		
		BeanUtilisateur user = new BeanUtilisateur();
		String name = request.getParameter("nom");
		String pass = request.getParameter("password");
		user.setNom(name);
		user.setPassword(pass);
//		System.out.println(name);
//		System.out.println(pass);
		request.setAttribute("infos", user);

		RequestDispatcher premier = request.getRequestDispatcher("/WEB-INF/bienvenue.jsp");
		try {
			premier.forward(request, response);
		} catch (ServletException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}	
}
