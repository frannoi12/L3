from django.db import models
from .enseignant import Enseignant
from .matiere import Matiere
from .niveau import Niveau

class Enseignement(models.Model):
    enseignant = models.ForeignKey(Enseignant, on_delete=models.CASCADE)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('enseignant', 'matiere', 'niveau')

    def __str__(self):
        return f"{self.enseignant.nom} enseigne {self.matiere.nom} en {self.niveau.nom}"
