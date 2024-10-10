from django.db import models
from .personne import Personne
from .niveau import Niveau



class Eleve(Personne):
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} {self.prenom}"
