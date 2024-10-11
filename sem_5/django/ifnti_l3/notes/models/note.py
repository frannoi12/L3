from django.db import models
from .eleve import Eleve
from .matiere import Matiere




class Note(models.Model):
    valeur = models.FloatField()
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='notes')
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        # Afficher la valeur de la note, le nom de la matière et les informations sur l'élève
        return f"Note: {self.valeur} - Matière: {self.matiere.nom} - Élève: {self.eleve.prenom} {self.eleve.nom}"