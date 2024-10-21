<%@page import="com.ifntiTP.beans.BeanUtilisateur"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bienvenue</title>
</head>
<body>
<h1>Bienvenue sur la pade de connexion de mon site!</h1>



<form action="con" method="post">
<label>Nom :</label>
<input type="text" name="nom"><br>
<label>Password :</label>
<input type="text" name="password"><br>

<button>Connexion</button>
</form>
<%

BeanUtilisateur userData = (BeanUtilisateur)request.getAttribute("infos");

if(userData){
	out.println("Veillez vous connecté !");
}else{
	out.println("<form action=\"in\" method=\"get\">");
	out.println("<button>S'inscrire</button>");
	out.println("</form>");
}
%>
</body>
</html>