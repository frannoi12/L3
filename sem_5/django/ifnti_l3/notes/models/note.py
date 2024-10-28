from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .eleve import Eleve
from .matiere import Matiere




class Note(models.Model):
    # valeur = models.FloatField()
    valeur = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(20)],
    )
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)

    def __str__(self):
        # Afficher la valeur de la note, le nom de la matière et les informations sur l'élève
        return f"Note: {self.valeur} - Matière: {self.matiere.nom} - Élève: {self.eleve.prenom} {self.eleve.nom}"