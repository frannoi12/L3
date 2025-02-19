from django.db import models
from .eleve import Eleve


class Absence(models.Model):
    
    motif = models.CharField(("motif"), max_length=50)
    dateAbsence = models.CharField(("dateAbsence"), max_length=50)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    

    class Meta:
        verbose_name = ("Absence")
        verbose_name_plural = ("Absences")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Absence_detail", kwargs={"pk": self.pk})
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        if self.eleve.exists():
            self.eleve.nombreAbsence.set(self.eleve.nombreAbsence)
        
        super().save(*args, **kwargs)
    