from django.shortcuts import render, get_object_or_404
# from django.http import HttpResponse
from notes.models import Eleve,Note



# Vue pour la liste des élèves avec leurs matières et moyennes
def eleve(request):
    # Récupère tous les élèves depuis la base de données
    eleves_list = Eleve.objects.all()

    # Pour chaque élève, on récupère leurs notes et moyennes
    eleves_with_notes = []
    for eleve in eleves_list:
        matieres_notes = []
        # Récupérer les notes pour chaque matière de l'élève
        for matiere in eleve.matieres.all():
            note = Note.objects.filter(eleve=eleve, matiere=matiere).first()  # Récupère la note
            matieres_notes.append({
                'matiere': matiere.nom,
                'note': note.valeur if note else 'Nulle'  # Vérifie si une note existe
            })
        eleves_with_notes.append({
            'nom': eleve.nom,
            'niveau': eleve.niveau.nom,
            'matieres_notes': matieres_notes
        })

    # Retourne le template avec la liste des élèves, leurs matières et moyennes
    return render(request, 'notes/eleves.html', {'eleves': eleves_with_notes})


# Vue pour la liste des élèves avec leurs notes et moyennes
# def eleve(request):
#     liste_eleves = Eleve.objects.all()
#     return render(request, 'notes/eleves.html', {'eleves': liste_eleves})





# Vue pour le détail d'un élève particulier
def eleves(request, id):
    detail_eleve = get_object_or_404(Eleve, id=id)
    
    matieres_notes = []
    for matiere in detail_eleve.matieres.all():
        # Récupérer la note pour chaque matière
        note = Note.objects.filter(eleve=detail_eleve, matiere=matiere).first()
        matieres_notes.append({
            'matiere': matiere.nom,
            'note': note.valeur if note else 'NULL'  # Si la note n'existe pas, afficher 'N/A'
        })
    
    return render(request, 'notes/detail_eleve.html', {
        'eleve': detail_eleve,
        'matieres_notes': matieres_notes,
    })
