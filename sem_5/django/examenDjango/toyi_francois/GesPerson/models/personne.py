from django.db import models


class Personne(models.Model):
    
    nom=models.CharField(max_length=50)
    prenom=models.CharField(max_length=50)
    date_naissance=models.DateField()
    tel=models.CharField(max_length=50)
    email = models.EmailField(max_length=254)

    
    class Meta:
        verbose_name = ("Personne")
        verbose_name_plural = ("Personnes")
        abstract = True
        

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Personne_detail", kwargs={"pk": self.pk})
    
