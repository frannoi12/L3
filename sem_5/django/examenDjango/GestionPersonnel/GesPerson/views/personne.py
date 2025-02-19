from django.shortcuts import render, redirect
from GesPerson.models import Eleve, Professeur
from GesPerson.forms.eleveForm import EleveForm
from GesPerson.forms.professeurForm import ProfesseurForm

def ajoutePersonne(request):
    if request.method == 'POST':
        if 'ajouter_eleve' in request.POST:
            form = EleveForm(request.POST)
            if form.is_valid():
                form.save()  # Enregistre l'élève dans la base de données
                return redirect('GesPerson:eleves')  # Redirige vers la liste des élèves
        elif 'ajouter_professeur' in request.POST:
            form = ProfesseurForm(request.POST)
            if form.is_valid():
                form.save()  # Enregistre le professeur dans la base de données
                return redirect('GesPerson:professeurs')  # Redirige vers la liste des professeurs
    else:
        eleve_form = EleveForm()
        professeur_form = ProfesseurForm()

    return render(request, 'personnes/ajoute_personne.html', {
        'eleve_form': eleve_form,
        'professeur_form': professeur_form,
    })