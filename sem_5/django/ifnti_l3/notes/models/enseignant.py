from django.db import models
from .personne import Personne
from .matiere import Matiere



class Enseignant(Personne):
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.matiere.nom}"
