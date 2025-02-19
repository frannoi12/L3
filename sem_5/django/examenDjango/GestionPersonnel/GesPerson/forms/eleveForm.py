from django import forms
from GesPerson.models import Eleve


class EleveForm(forms.Form):
    
    nom = forms.CharField(label ="Nom", max_length=50)
    prenom = forms.CharField(label ="Prénom", max_length=50)
    date_naissance = forms.CharField(label ="Date de Naissance", max_length=50)
    tel = forms.CharField(label ="Telephone", max_length=50)
    email = forms.CharField(label ="Email", max_length=50)
    nombre_absence = forms.IntegerField(label="Absence")
    
    
    def save(self):
        # Créez une nouvelle instance de Eleve et enregistrez-la
        data = self.cleaned_data
        eleve = Eleve(
            nom=data['nom'],
            prenom=data['prenom'],
            date_naissance=data['date_naissance'],
            tel=data['tel'],
            email=data['email'],
            nombre_absence=data['nombre_absence']
        )
        eleve.save()

    class Meta:
        model = Eleve
        fields = ['nom','prenom','date_naissance','tel','email','nombre_absence']
