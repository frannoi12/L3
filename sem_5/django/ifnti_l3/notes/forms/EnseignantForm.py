# EnseignantForm.py
from django import forms
from notes.models import Enseignant

class EnseignantForm(forms.ModelForm):
    class Meta:
        model = Enseignant
        fields = ['nom', 'prenom', 'date_naissance', 'sexe']  # Inclure les champs hérités
        
        
    def clean_nom(self):
        nom = self.cleaned_data.get('nom')
        if any(char.isdigit() for char in nom):
            raise forms.ValidationError("Le nom ne doit pas contenir de chiffres.")
        return nom

    def clean_prenom(self):
        prenom = self.cleaned_data.get('prenom')
        if any(char.isdigit() for char in prenom):
            raise forms.ValidationError("Le prénom ne doit pas contenir de chiffres.")
        return prenom

        
        
        # widgets = {
        #     'nom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}),
        #     'prenom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Prénom'}),
        #     'date_naissance': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        #     'sexe': forms.Select(attrs={'class': 'form-control'}),
        # }
