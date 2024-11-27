from django.contrib import admin
from .models import Eleve, Niveau, Matiere
from .forms.EleveForm import EleveForm  # Si ce formulaire existe

class EleveAdmin(admin.ModelAdmin):
    form = EleveForm  # Si ce formulaire personnalisé existe
    list_display = ('id', 'prenom', 'nom', 'niveau')  # Assurez-vous que 'prenom' et 'nom' viennent de `Personne`
    list_filter = ('niveau',)  # Filtrable par niveau
    search_fields = ('id', 'prenom', 'nom')  # Recherche par ID, prénom, ou nom
    filter_horizontal = ('matieres',)  # Permet une interface plus conviviale pour les ManyToManyField
    readonly_fields = ()  # Supprimez `date_inscription` ou ajoutez un champ existant
    fields = ('id', 'prenom', 'nom', 'niveau', 'matieres')  # Champs affichés dans le formulaire d'édition
    list_per_page = 10  # Pagination des résultats

# Enregistrement du modèle avec la configuration admin personnalisée
admin.site.register(Eleve, EleveAdmin)
admin.site.register(Niveau)
admin.site.register(Matiere)
