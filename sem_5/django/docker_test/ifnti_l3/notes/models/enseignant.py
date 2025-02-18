from django.db import models
from .personne import Personne
# from .matiere import Matiere



class Enseignant(Personne):
    pass
    class Meta(Personne.Meta):
        pass
    # matieres = models.ManyToManyField('Matiere', related_name='enseignants')
    
    
    # def __str__(self):
    #     # Appeler la méthode __str__() de la classe parente
    #     parent_str = super().__str__()

    #     # Récupérer les noms des matières associées à cet enseignant
    #     matieres = ", ".join([str(matiere) for matiere in self.matieres.all()])  # Utilisation de ManyToManyField

    #     # Retourner la chaîne combinée avec le résultat de la classe parente et les matières enseignées
    #     return f"{parent_str} - Matières: {matieres or 'Aucune matière'}"
