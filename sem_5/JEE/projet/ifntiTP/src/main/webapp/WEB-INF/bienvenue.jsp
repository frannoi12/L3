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
<h1>Bienvenu sur la page d'acceuil</h1>
<%

BeanUtilisateur userData = (BeanUtilisateur)request.getAttribute("infos");

out.println("Monsieur " + userData.getNom());

%>
</body>
</html>