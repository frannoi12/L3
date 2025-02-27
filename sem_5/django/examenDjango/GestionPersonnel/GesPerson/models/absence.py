from django.db import models
from .eleve import Eleve
from django.db.models import F

class Absence(models.Model):
    motif = models.CharField("motif", max_length=50)
    dateAbsence = models.CharField("dateAbsence", max_length=50)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Absence"
        verbose_name_plural = "Absences"

    def __str__(self):
        return f"{self.motif} - {self.dateAbsence} - {self.eleve.nom}"

    def get_absolute_url(self):
        return reverse("Absence_detail", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        # Appel à la méthode save de la classe parente
        super().save(*args, **kwargs)

        # Met à jour le nombre d'absences de l'élève
        if self.eleve:
            self.eleve.nombre_absence = F('nombre_absence') + 1
            self.eleve.save(update_fields=['nombre_absence'])