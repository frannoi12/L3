from django.shortcuts import render, get_object_or_404
# from django.http import HttpResponse
from notes.models import Matiere

# Vue pour la liste des matières avec leurs enseignants

def matieres(request):
    list_matiere = Matiere.objects.all()

    return render(request, 'notes/matieres.html', {'matieres': list_matiere})



# Vue pour le détail d'une matière particulière
def matiere(request, id):
    detail_matiere = get_object_or_404(Matiere, id=id)

    return render(request, 'notes/detail_matiere.html', {'matiere': detail_matiere})
