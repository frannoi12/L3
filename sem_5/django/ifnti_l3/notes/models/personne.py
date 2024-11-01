from django.db import models


class Personne(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1, choices=[('M', 'Masculin'), ('F', 'Féminin')])
    matricule = models.CharField(max_length=10, unique=True, blank=True)
    
    
    
    def save(self, *args, **kwargs):
        # Extraire les éléments pour créer le matricule
        nom_part = self.nom[:2].upper()  # Deux premiers caractères du nom
        prenom_part = self.prenom[:2].upper()  # Deux premiers caractères du prénom
        sexe_part = self.sexe.upper()  # Caractère du sexe
        annee_part = self.date_naissance.strftime('%Y')  # Année de naissance

        # Créer le matricule en combinant les parties
        self.matricule = f"{nom_part}{prenom_part}{sexe_part}{annee_part}"
        
        # Appel à la méthode save de la classe parente
        super().save(*args, **kwargs)


    class Meta:
        abstract = True 
    
    def __str__(self):
        return f"{self.nom} {self.prenom}"
    
    # {self.date_naissance} {self.sexe}