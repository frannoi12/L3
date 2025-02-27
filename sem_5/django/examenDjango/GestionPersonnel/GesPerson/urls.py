from django.urls import path
from .views import index, eleve, professeur, absence, personne


app_name = "GesPerson"

urlpatterns = [
    path('', index.index, name='index'),
    path('eleves/', eleve.eleves, name='eleves'),
    path('addEleve/', eleve.add_eleve, name='addEleve'),
    path('eleve/<int:id>/', eleve.eleve, name='eleve'),
    path('ajouter/', ajoutePersonne, name='ajoute_personne'),
]
