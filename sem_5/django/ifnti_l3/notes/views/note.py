from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseBadRequest
from notes.models import Eleve, Matiere, Note
from notes.forms.NoteForm import NoteForm


def add_note(request, eleve_id, matiere_id):
    eleve = get_object_or_404(Eleve, id=eleve_id)
    matiere = get_object_or_404(Matiere, id=matiere_id)

    # Vérification que l'élève suit bien la matière
    if matiere not in eleve.matieres.all():
        raise Exception(f"L'élève {eleve.nom} ne suit pas la matière {matiere.nom}.")

    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            # Création de la note avec les relations élève et matière
            note = form.save(commit=False)
            note.eleve = eleve
            note.matiere = matiere
            note.save()
            return HttpResponse(f"Note {note.valeur} ajoutée pour {eleve.nom} en {matiere.nom}.")
        else:
            return HttpResponseBadRequest("Formulaire invalide. Veuillez vérifier les valeurs saisies.")
    else:
        # Affichage du formulaire si la requête est en GET
        form = NoteForm()
    
    return render(request, 'notes/add_note.html', {'form': form, 'eleve': eleve, 'matiere': matiere})


# def add_note(request):
#     if request.method == 'POST':
#         form = NoteForm(request.POST)
#         if form.is_valid():
#             form.save()  # Sauvegarde l'objet Note en base de données
#             return HttpResponse("La note a été enregistrée avec succès.")
#     else:
#         form = NoteForm()
#     return render(request, 'notes/add_note.html', {'form': form})


# def add_note(request, eleve_id, matiere_id):
#     eleve = get_object_or_404(Eleve, id=eleve_id)
#     matiere = get_object_or_404(Matiere, id=matiere_id)

#     if request.method == 'POST':
#         note_value = request.POST.get('note')

#         if note_value:
#             note = Note.objects.create(valeur=note_value, eleve=eleve, matiere=matiere)
#             return HttpResponse(f"Note {note_value} ajoutée pour {eleve.nom} en {matiere.nom}.")
#         else:
#             return HttpResponseBadRequest("Veuillez fournir une valeur pour la note.")
    
#     else:
#         # Vérifier si l'élève suit bien la matière
#         if matiere in eleve.matieres.all():
#             # Rendre le template pour ajouter une note
#             return render(request, 'notes/add_note.html', {'eleve': eleve, 'matiere': matiere})
#         else:
#             # Lever une exception si l'élève ne suit pas la matière
#             raise Exception(f"L'élève {eleve.nom} ne suit pas la matière {matiere.nom}.")




# def add_note(request, eleve_id, matiere_id):
#     return HttpResponse("Note d’un élève dans une matière.")




def add_notes(request, matiere_id):
    matiere = get_object_or_404(Matiere, id=matiere_id)
    eleves = Eleve.objects.filter(matieres=matiere)  # Récupère tous les élèves inscrits à cette matière

    if request.method == 'POST':
        notes_valides = True
        for eleve in eleves:
            note_value = request.POST.get(f'note_{eleve.id}')
            # Validation de la note
            form = NoteForm({'valeur': note_value})
            if form.is_valid():
                Note.objects.create(
                    valeur=note_value,
                    eleve=eleve,
                    matiere=matiere
                )
            else:
                notes_valides = False

        if notes_valides:
            return HttpResponse("Toutes les notes ont été enregistrées avec succès.")
        else:
            return HttpResponse("Certaines notes étaient invalides et n'ont pas été enregistrées.")
    
    # Si méthode GET, on initialise les formulaires pour chaque élève
    return render(request, 'notes/add_notes.html', {'eleves': eleves, 'matiere': matiere})
