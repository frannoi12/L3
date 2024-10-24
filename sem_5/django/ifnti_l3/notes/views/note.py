from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest
from notes.models import Eleve, Matiere, Note

def add_note(request, eleve_id, matiere_id):
    eleve = get_object_or_404(Eleve, id=eleve_id)
    matiere = get_object_or_404(Matiere, id=matiere_id)

    if request.method == 'POST':
        note_value = request.POST.get('note')

        if note_value:
            note = Note.objects.create(valeur=note_value, eleve=eleve, matiere=matiere)
            return HttpResponse(f"Note {note_value} ajoutée pour {eleve.nom} en {matiere.nom}.")
        else:
            return HttpResponseBadRequest("Veuillez fournir une valeur pour la note.")
    
    else:
        # Vérifier si l'élève suit bien la matière
        if matiere in eleve.matieres.all():
            # Rendre le template pour ajouter une note
            return render(request, 'notes/add_note.html', {'eleve': eleve, 'matiere': matiere})
        else:
            # Lever une exception si l'élève ne suit pas la matière
            raise Exception(f"L'élève {eleve.nom} ne suit pas la matière {matiere.nom}.")




# def add_note(request, eleve_id, matiere_id):
#     return HttpResponse("Note d’un élève dans une matière.")
