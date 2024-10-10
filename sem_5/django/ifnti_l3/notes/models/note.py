from django.db import models
from .eleve import Eleve
from .matiere import Matiere




class Note(models.Model):
    valeur = models.FloatField()
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.valeur} - {self.matiere} - {self.eleve}"
