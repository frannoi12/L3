from django import forms
from GesPerson.models import Professeur

class ProfesseurForm(forms.Form):
    nom = forms.CharField(label="Nom", max_length=50)
    prenom = forms.CharField(label="Prénom", max_length=50)
    date_naissance = forms.CharField(label="Date de Naissance", max_length=50)
    tel = forms.CharField(label="Téléphone", max_length=50)
    email = forms.EmailField(label="Email")
    specialite = forms.CharField(label="Spécialité", max_length=50)

    def save(self):
        # Crée une nouvelle instance de Professeur et l'enregistre
        data = self.cleaned_data
        professeur = Professeur(
            nom=data['nom'],
            prenom=data['prenom'],
            date_naissance=data['date_naissance'],
            tel=data['tel'],
            email=data['email'],
            specialite=data['specialite']
        )
        professeur.save()