from django import forms
from GesPerson.models import Absence


class AbsenceForm(forms.Form):
    
    motif = forms.CharField(label ="Motif", max_length=50)
    dateAbsence = forms.CharField(label ="Date Absence", max_length=50)
    
    class Meta:
        model = Absence
        fields = ['motif','dateAbsence','eleve']
