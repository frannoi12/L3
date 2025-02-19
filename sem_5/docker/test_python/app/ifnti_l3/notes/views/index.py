from django.shortcuts import render
from notes.models import Eleve,Matiere,Niveau

# Create your views here.

def index(request):
    notes = Eleve.objects.all()
    matieres = Matiere.objects.all()
    niveaux = Niveau.objects.all()
    return render(request, "notes/index.html", {
        "notes": notes,
        "matieres": matieres,
        "niveaux" : niveaux
    })