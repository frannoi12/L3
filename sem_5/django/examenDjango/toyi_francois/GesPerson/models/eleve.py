from django.db import models
from .personne import Personne

class Eleve(Personne):
    nombre_absence = models.IntegerField(("nombre_absence"))

    