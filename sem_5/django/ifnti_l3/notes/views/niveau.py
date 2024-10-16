from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from notes.models import Niveau



# Vue pour le détail d'un niveau particulier
def niveau(request, id):
    niveau_detail = get_object_or_404(Niveau, id=id)
    
    return HttpResponse(niveau_detail)

    # return render(request, 'notes/niveau_detail.html', {'niveau': niveau_detail})
