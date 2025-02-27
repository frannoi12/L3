from django.db import models
from .personne import Personne


class Professeur(Personne):
    specialite = models.CharField(("specialite"), max_length=50)
    