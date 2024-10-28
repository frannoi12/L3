# EnseignantForm.py
from django import forms
from notes.models import Enseignant

class EnseignantForm(forms.ModelForm):
    class Meta:
        model = Enseignant
        fields = ['nom', 'prenom', 'date_naissance', 'sexe']  # Inclure les champs hérités
        # widgets = {
        #     'nom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}),
        #     'prenom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Prénom'}),
        #     'date_naissance': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        #     'sexe': forms.Select(attrs={'class': 'form-control'}),
        # }
