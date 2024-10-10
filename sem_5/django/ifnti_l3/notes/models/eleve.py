from django.db import models
from .personne import Personne
from .niveau import Niveau



class Eleve(Personne):
    id = models.CharField(max_length=20, primary_key=True)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)

    def __str__(self):
        return f"{super().__str__()} - Niveau: {self.niveau.nom}"