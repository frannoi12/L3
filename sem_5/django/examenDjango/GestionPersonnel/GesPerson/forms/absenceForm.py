from django import forms
from GesPerson.models import Absence

class AbsenceForm(forms.Form):
    motif = forms.CharField(label="Motif", max_length=50)
    date_absence = forms.CharField(label="Date d'Absence", max_length=50)
    eleve_id = forms.IntegerField(label="ID de l'Élève")  # Vous pouvez aussi utiliser un champ de sélection

    def save(self):
        # Crée une nouvelle instance de Absence et l'enregistre
        data = self.cleaned_data
        absence = Absence(
            motif=data['motif'],
            date_absence=data['date_absence'],
            eleve_id=data['eleve_id']  # Assurez-vous que cela correspond à votre modèle
        )
        absence.save()