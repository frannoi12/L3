from django.db import models
from .personne import Personne
from .niveau import Niveau
from .matiere import Matiere




class Eleve(Personne):
    id = models.CharField(max_length=20, primary_key=True)
    matieres = models.ManyToManyField(Matiere)
    niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Elèves"

    def __str__(self):
        # Appeler la méthode __str__() de la classe parente
        parent_str = super().__str__()

        # Récupérer les noms des matières associées à cet élève
        matieres = ", ".join([str(matiere) for matiere in self.matieres.all()])  # Utilisation de ManyToManyField

        # Retourner la chaîne combinée avec le résultat de la classe parente et les informations supplémentaires
        return f"{parent_str} - Niveau: {self.niveau.nom} - Matières: {matieres or 'Aucune matière'}"


