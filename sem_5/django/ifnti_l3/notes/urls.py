from django.urls import path
from .views import index, eleve, matiere, niveau, note, enseignant


app_name = "notes"

urlpatterns = [
    path('', index.index, name='index'),
    path('eleves/', eleve.eleves, name='eleves'),
    path('listDesEleves/',eleve.listEleves,name="elevesListe"),
    path('eleves/niveau/<str:niveau>/', eleve.listeNiveauElv, name='liste_niveau_elv'),
    path('eleve/<int:id>/', eleve.eleve, name='eleve'),
    path('matieres/', matiere.matieres, name='matieres'),
    path('matiere/<int:id>', matiere.matiere, name='matiere'),
    path('niveau/<int:id>', niveau.niveau, name='niveau'), 
    path('note/<int:eleve_id>/<int:matiere_id>', note.add_note, name='note'), 
    path('eleves/notes/<int:matiere_id>/', eleve.notesEleves, name='notes_eleves'),    
    path('notes/synthese/', eleve.notesSynthese, name='notes_synthese'),
    path('notes/<int:matiere_id>/', note.add_notes, name='notes'),
    path('addEleve/', eleve.add_eleve, name='addEleve'),
    path('addEnseignant/', enseignant.add_enseignant, name='addEnseignant'),
    path('upEleve/<int:id>/', eleve.update_eleve, name='updateEleve'),  # URL pour modifier un élève
    path('upEnseignant/<int:id>/', enseignant.update_enseignant, name='updateEnseignant'),
    path('enseignants/', enseignant.liste_enseignants, name='enseignants'),  # URL pour la liste des enseignants
]
