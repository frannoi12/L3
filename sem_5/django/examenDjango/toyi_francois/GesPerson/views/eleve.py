from django.shortcuts import render, get_object_or_404, redirect
from GesPerson.models import Eleve
from GesPerson.forms.eleveForm import EleveForm


# ['nom','prenom','date_naissance','tel','email','nombre_absence']

def eleves(request):
    # Récupère tous les élèves depuis la base de données
    eleves_list = Eleve.objects.all()

    # Pour chaque élève, on récupère leurs notes et moyennes
    eleves_with_notes = []
    for eleve in eleves_list:
        eleves_with_notes.append({
            "id": eleve.id,
            'nom': eleve.nom,
            "prenom" : eleve.prenom,
            "date_naissance" : eleve.date_naissance,
            "tel": eleve.tel,
            'email': eleve.email,
            'nombre_absence': eleve.nombre_absence
        })
        

    # for eleves in eleves_with_notes:
    #     print(eleves)
    
    # return HttpResponse(eleves_with_notes)
    

    # Retourne le template avec la liste des élèves, leurs matières et moyennes
    return render(request, 'eleves/eleves.html', {'eleves': eleves_with_notes})



# ['nom','prenom','date_naissance','tel','email','nombre_absence']


def add_eleve(request):
    form = EleveForm()  # Initialiser le formulaire
    
    id=0
    if request.method == 'POST':
        form = EleveForm(request.POST)
        if form.is_valid():
            # print(form['nom'].value())
            id +=id
            nom = form['nom'].value()
            prenom = form['prenom'].value()
            date_naissance = form['date_naissance'].value()
            tel = form['tel'].value()
            email = form['email'].value()
            nombre_absence = form['nombre_absence'].value()
            E = Eleve(id ,nom,prenom,date_naissance,tel,email,nombre_absence)
            E.save()
            
            # form.save()  # Enregistre l'élève dans la base de données
            
            # Redirige vers la vue de liste des élèves
            return redirect('GesPerson:eleves')  

    return render(request, 'eleves/add_eleve.html', {'form': form})




def eleve(request, id):
    detail_eleve = get_object_or_404(Eleve, id=id)
    
      
    return render(request, 'notes/detail_eleve.html', {
        # 'eleve_id':id,
        # 'matiere_id' : matiere.id,
        'eleve': detail_eleve,
    })
    