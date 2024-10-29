# EleveForm.py
from django import forms
from notes.models import Eleve  # Assurez-vous que Eleve est défini dans vos modèles

class EleveForm(forms.ModelForm):
    class Meta:
        model = Eleve
        fields = ['nom', 'prenom', 'date_naissance', 'sexe', 'niveau', 'matieres']  
        
    
    # def clean(self):
    #     data_a_effacer = super().clean()
    #     niveau = data_a_effacer.get('niveau')
    #     matieres = data_a_effacer.get('matieres')

<<<<<<< HEAD
        # Vérification de la compatibilité des matières avec le niveau
        # if niveau and matieres:
        #     matieres_compatibles = niveau.matiere.all()
            
        #     for matiere in matieres:
        #         if matiere not in matieres_compatibles:
        #             self.add_error('matieres', f"La matière {matiere.nom} n'est pas disponible pour le niveau {niveau.nom}.")
            
        #     return data_a_effacer
=======
    #     # Vérification de la compatibilité des matières avec le niveau
    #     if niveau and matieres:
    #         for matiere in matieres:
    #             if niveau not in matiere.niveaux.all():
    #                 self.add_error('matieres', f"La matière {matiere.nom} n'est pas disponible pour le niveau {niveau.nom}.")
            
    #         return data_a_effacer
>>>>>>> 3d64f48e687300c6fcb18d4f97a51fd6702f04bb
    
        # widgets = {
        #     'nom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}),
        #     'prenom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Prénom'}),
        #     'date_naissance': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        #     'sexe': forms.Select(attrs={'class': 'form-control'}),
        #     'niveau': forms.Select(attrs={'class': 'form-control'}),
        #     'matieres': forms.CheckboxSelectMultiple(),  # Si c'est un ManyToManyField
        # }
