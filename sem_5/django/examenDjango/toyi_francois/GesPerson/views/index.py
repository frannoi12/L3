from django.shortcuts import render

# Create your views here.

def index(request):
    message = "je suis toyi en plein examen"
    return render(request, "index.html", {
        "message": message
    })