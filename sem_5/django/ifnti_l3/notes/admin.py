from django.contrib import admin
from .models import Niveau,Eleve,Enseignant,Matiere
from .forms.EleveForm import EleveForm


# Register your models here.


class EleveAdmin(admin.ModelAdmin):
    form = EleveForm  

# Enregistrement du modèle Eleve avec la configuration personnalisée EleveAdmin
admin.site.register(Eleve, EleveAdmin)

admin.site.register(Niveau)
admin.site.register(Enseignant)
# admin.site.register(Eleve)
admin.site.register(Matiere)

