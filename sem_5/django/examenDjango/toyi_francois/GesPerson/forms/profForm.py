from django import forms
from GesPerson.models import Professeur


class ProfesseurForm(forms.Form):
    nom = forms.CharField(label ="Nom", max_length=50)
    prenom = forms.CharField(label ="Prenom", max_length=50)
    date_naissance = forms.CharField(label ="Date de Naissance", max_length=50)
    tel = forms.CharField(label ="Telephone", max_length=50)
    email = forms.CharField(label ="Email", max_length=50)
    specialite = forms.IntegerField(label="specialite")
    class Meta:
        model = Professeur
        fields = ['nom','prenom','date_naissance','tel','email','specialite']
