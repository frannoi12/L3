from django.shortcuts import render
from notes.models import Eleve

# Create your views here.

def index(request):
    notes = Eleve.objects.all()
    return render(request, "notes/index.html", {"notes": notes})