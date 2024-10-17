from django.db import models
from .enseignant import Enseignant


class Matiere(models.Model):
    nom = models.CharField(max_length=50, unique=True)
    # niveaux = models.ManyToManyField(Niveau, related_name='matieres')
    enseignant = models.ForeignKey(Enseignant, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Matières"

    def __str__(self):
        return self.nom
