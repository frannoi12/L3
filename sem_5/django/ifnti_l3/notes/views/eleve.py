from django.shortcuts import render, get_object_or_404
# from django.http import HttpResponse
from notes.models import Eleve




# Vue pour la liste des élèves avec leurs notes et moyennes
def eleve(request):
    # Récupère tous les élèves depuis la base de données
    liste_eleves = Eleve.objects.all()

    # Retourne le template avec la liste des élèves
    return render(request, 'notes/eleves.html', {'eleves': liste_eleves})

# Vue pour le détail d'un élève particulier
def eleves(request, id):
    # Récupère un élève spécifique par son ID
    detail_eleve = get_object_or_404(Eleve, id=id)

    # Retourne le template avec les détails de l'élève
    return render(request, 'notes/detail_eleve.html', {'eleve': detail_eleve})
