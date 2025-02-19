from django.shortcuts import render, get_object_or_404, redirect
from GesPerson.models import Eleve
from GesPerson.forms.eleveForm import EleveForm


# ['nom','prenom','date_naissance','tel','email','nombre_absence']

def eleves(request):
    # Récupère tous les élèves depuis la base de données
    eleves_list = Eleve.objects.all()

    # Prépare une liste d'élèves pour le rendu
    eleves_with_notes = []
    for eleve in eleves_list:
        eleves_with_notes.append({
            "id": eleve.id,
            "nom": eleve.nom,
            "prenom": eleve.prenom,
            "date_naissance": eleve.date_naissance,
            "tel": eleve.tel,
            "email": eleve.email,
            "nombre_absence": eleve.nombre_absence
        })

    # Retourne le template avec la liste des élèves
    return render(request, 'eleves/eleves.html', {'eleves': eleves_with_notes})

def add_eleve(request):
    form = EleveForm()  # Initialiser le formulaire
    
    if request.method == 'POST':
        form = EleveForm(request.POST)
        if form.is_valid():
            form.save()  # Enregistre l'élève dans la base de données
            return redirect('GesPerson:eleves')  # Redirige vers la vue de liste des élèves

    return render(request, 'eleves/add_eleve.html', {'form': form})

def eleve(request, id):
    detail_eleve = get_object_or_404(Eleve, id=id)
    
    return render(request, 'eleves/detail_eleve.html', {
        'eleve': detail_eleve,
    })
    
    
    
def update_eleve(request, id):
    eleve = get_object_or_404(Eleve, id=id)
    form = EleveForm(initial={
        'nom': eleve.nom,
        'prenom': eleve.prenom,
        'date_naissance': eleve.date_naissance,
        'tel': eleve.tel,
        'email': eleve.email,
        'nombre_absence': eleve.nombre_absence,
    })

    if request.method == 'POST':
        form = EleveForm(request.POST)
        if form.is_valid():
            # Met à jour l'élève
            eleve.nom = form.cleaned_data['nom']
            eleve.prenom = form.cleaned_data['prenom']
            eleve.date_naissance = form.cleaned_data['date_naissance']
            eleve.tel = form.cleaned_data['tel']
            eleve.email = form.cleaned_data['email']
            eleve.nombre_absence = form.cleaned_data['nombre_absence']
            eleve.save()  # Enregistre les modifications
            return redirect('GesPerson:eleves')  # Redirige vers la liste des élèves

    return render(request, 'eleves/update_eleve.html', {'form': form, 'eleve': eleve})


def delete_eleve(request, id):
    eleve = get_object_or_404(Eleve, id=id)

    if request.method == 'POST':
        eleve.delete()  # Supprime l'élève
        return redirect('GesPerson:eleves')  # Redirige vers la liste des élèves

    return render(request, 'eleves/delete_eleve.html', {'eleve': eleve})