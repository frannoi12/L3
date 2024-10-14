from django.urls import path
from .views import index, eleve, matiere, niveau

urlpatterns = [
    path('', index.index, name='index'),
    path('eleve/', eleve.eleve, name='eleve'),
    path('eleves/<int:id>/', eleve.eleves, name='eleves'),
    path('matiere/', matiere.matiere, name='matiere'),
    path('matieres/<int:id>', matiere.matieres, name='matiere'),
    path('niveau/<int:id>', niveau.niveau, name='niveau'),    
]
