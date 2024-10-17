from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from notes.models import Niveau



# def niveaux(request):
#     niveau_detail = Niveau.object.all()
    
#     return HttpResponse(niveau_detail)

# Vue pour le détail d'un niveau particulier
def niveau(request, id):
    niveau_detail = Niveau.objects.get(id=id)
    
    matieres = niveau_detail.matiere.all()
        
        
    # return HttpResponse(niveau_detail)

    return render(request, 'notes/detail_niveau.html', {'niveau': niveau_detail, 'matieres':matieres})
