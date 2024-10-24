from django.urls import path
from .views import index, eleve, matiere, niveau, note

app_name = "notes"

urlpatterns = [
    path('', index.index, name='index'),
    path('eleves/', eleve.eleves, name='eleves'),
    path('eleve/<int:id>/', eleve.eleve, name='eleve'),
    path('matieres/', matiere.matieres, name='matieres'),
    path('matiere/<int:id>', matiere.matiere, name='matiere'),
    path('niveau/<int:id>', niveau.niveau, name='niveau'), 
    path('note/<int:eleve_id>/<int:matiere_id>', note.add_note, name='note'), 
]
