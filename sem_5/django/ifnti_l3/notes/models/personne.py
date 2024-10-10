from django.db import models


class Personne(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1, choices=[('M', 'Masculin'), ('F', 'Féminin')])

    class Meta:
        abstract = True 
    
    def __str__(self):
        return f"{self.nom} {self.prenom}"