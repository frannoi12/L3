from django.db import models
# from .niveau import Niveau


class Matiere(models.Model):
    nom = models.CharField(max_length=50, unique=True)
    # niveaux = models.ManyToManyField(Niveau, related_name='matieres')

    class Meta:
        verbose_name_plural = "Matières"

    def __str__(self):
        return self.nom
