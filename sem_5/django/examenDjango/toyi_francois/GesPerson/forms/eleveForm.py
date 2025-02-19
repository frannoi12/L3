from django import forms
from GesPerson.models import Eleve


class EleveForm(forms.Form):
    
    nom = forms.CharField(label ="Nom", max_length=50)
    prenom = forms.CharField(label ="Prenom", max_length=50)
    date_naissance = forms.CharField(label ="Date de Naissance", max_length=50)
    tel = forms.CharField(label ="Telephone", max_length=50)
    email = forms.CharField(label ="Email", max_length=50)
    nombre_absence = forms.IntegerField(label="Absence")
    
    
    def save(self, *args, **kwargs):
        Eleve.save(self.fields)

    class Meta:
        model = Eleve
        fields = ['nom','prenom','date_naissance','tel','email','nombre_absence']
