from django.urls import path
from .views import index, eleve, matiere, niveau

urlpatterns = [
    path('', index.index, name='index'),
    path('eleve/', eleve.eleve, name='eleve'),
    path('eleves/<int:id>/', eleve.eleves, name='eleves'),
    path('matiere/', matiere.matieres, name='matieres'),
    path('matieres/<int:id>', matiere.matiere, name='matiere'),
    path('niveau/<int:id>', niveau.niveau, name='niveau'),    
]
