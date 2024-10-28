from django.shortcuts import render, redirect, get_object_or_404
from notes.forms.EnseignantForm import EnseignantForm
from notes.models import Enseignant


def liste_enseignants(request):
    enseignants = Enseignant.objects.all()  # Récupère tous les enseignants
    return render(request, 'enseignants/liste_enseignants.html', {'enseignants': enseignants})


def add_enseignant(request):
    if request.method == 'POST':
        form = EnseignantForm(request.POST)
        if form.is_valid():
            form.save()  # Enregistre l'enseignant dans la base de données
            return redirect('enseignant_list')  # Redirige vers une vue d'affichage des enseignants (ajustez selon votre besoin)
    else:
        form = EnseignantForm()
    
    return render(request, 'enseignants/add_enseignant.html', {'form': form})



def update_enseignant(request, id):
    enseignant = get_object_or_404(Enseignant, id=id)  # Récupère l'enseignant par son identifiant
    if request.method == 'POST':
        form = EnseignantForm(request.POST, instance=enseignant)  # Prend l'instance existante
        if form.is_valid():
            form.save()  # Enregistre les modifications
            return redirect('enseignant_list')  # Redirige vers la liste des enseignants
    else:
        form = EnseignantForm(instance=enseignant)  # Préremplit le formulaire avec les données de l'enseignant
    
    return render(request, 'enseignants/update_enseignant.html', {'form': form}) 