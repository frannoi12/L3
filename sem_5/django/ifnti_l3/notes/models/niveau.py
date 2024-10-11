from django.db import models
from .matiere import Matiere


class Niveau(models.Model):
    nom = models.CharField(max_length=2, unique=True)
    matiere = models.ManyToManyField(Matiere,related_name="niveau")

    def __str__(self):
        # Récupérer les noms des matières associées à ce niveau
        matieres = ", ".join([str(matiere) for matiere in self.matiere.all()])

        # Retourner une chaîne combinée avec le nom du niveau et ses matières associées
        return f"Niveau: {self.nom} - Matières: {matieres or 'Aucune matière'}"
