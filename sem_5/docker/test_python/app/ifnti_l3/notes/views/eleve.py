from django.shortcuts import render, get_object_or_404, redirect
# from django.http import HttpResponse
from notes.models import Eleve,Note,Matiere
from notes.forms.EleveForm import EleveForm
from django.http import FileResponse
import os
from Templating_ifnti.controleur import generate_pdf
from Templating_ifnti.controller import generate_note_pdf
from Templating_ifnti.controllerSynthese import generate_synthese_pdf
from django.db.models import Avg









# Vue pour la liste des élèves avec leurs matières et moyennes

def eleves(request):
    # Récupère tous les élèves depuis la base de données
    eleves_list = Eleve.objects.all()

    # Pour chaque élève, on récupère leurs notes et moyennes
    eleves_with_notes = []
    for eleve in eleves_list:
        matieres_notes = []
        # Récupérer les notes pour chaque matière de l'élève
        for matiere in eleve.matieres.all():
            note = Note.objects.filter(eleve=eleve, matiere=matiere).first()  # Récupère la note
            matieres_notes.append({
                'matiere': matiere.nom,
                'note': note.valeur if note else 'Nulle'  # Vérifie si une note existe
            })
        eleves_with_notes.append({
            "id": eleve.id,
            'nom': eleve.nom,
            "prenom" : eleve.prenom,
            "sexe" : eleve.sexe,
            "date_naissance" : eleve.date_naissance,
            "niveau_id": eleve.niveau.id,
            'niveau': eleve.niveau.nom,
            'matieres_notes': matieres_notes
        })
        

    # for eleves in eleves_with_notes:
    #     print(eleves)
    
    # return HttpResponse(eleves_with_notes)
    

    # Retourne le template avec la liste des élèves, leurs matières et moyennes
    return render(request, 'notes/eleves.html', {'eleves': eleves_with_notes})




# Vue pour la liste des élèves avec leurs notes et moyennes
# def eleve(request):
#     liste_eleves = Eleve.objects.all()
#     return render(request, 'notes/eleves.html', {'eleves': liste_eleves})




# Vue pour le détail d'un élève particulier

def eleve(request, id):
    detail_eleve = get_object_or_404(Eleve, id=id)
    matiere = detail_eleve.matieres.all()
    print(matiere)
    
    # for elev in detail_eleve:
    #     print(elev)
    # matieres_notes = []
    # for matiere in detail_eleve.matieres.all():
    #     # Récupérer la note pour chaque matière
    #     note = Note.objects.filter(eleve=detail_eleve, matiere=matiere).first()
    #     matieres_notes.append({
    #         'matiere': matiere.nom,
    #         'note': note.valeur if note else 'NULL'  # Si la note n'existe pas, afficher 'N/A'
    #     })
    
    return render(request, 'notes/detail_eleve.html', {
        # 'eleve_id':id,
        # 'matiere_id' : matiere.id,
        'eleve': detail_eleve,
        'matieres': matiere,
    })
    
    # return HttpResponse(detail_eleve,matieres_notes)




def add_eleve(request):
    form = EleveForm()  # Initialiser le formulaire

    if request.method == 'POST':
        form = EleveForm(request.POST)
        if form.is_valid():
            form.save()  # Enregistre l'élève dans la base de données
            
            # Redirige vers la vue de liste des élèves
            return redirect('notes:eleves')  # Remplacez 'notes:eleves' par le nom correct de votre URL

    return render(request, 'notes/add_eleve.html', {'form': form})



# def add_eleve(request):
#     form = EleveForm()  # Initialiser le formulaire en dehors du bloc if

#     if request.method == 'POST':
#         form = EleveForm(request.POST)
#         if form.is_valid():
#             form.save()  # Enregistre l'élève dans la base de données
            
#             # Récupère tous les élèves depuis la base de données
#             eleves_list = Eleve.objects.all()

#             # Pour chaque élève, on récupère leurs notes et moyennes
#             eleves_with_notes = []
#             for eleve in eleves_list:
#                 matieres_notes = []
#                 # Récupérer les notes pour chaque matière de l'élève
#                 for matiere in eleve.matieres.all():
#                     note = Note.objects.filter(eleve=eleve, matiere=matiere).first()  # Récupère la note
#                     matieres_notes.append({
#                         'matiere': matiere.nom,
#                         'note': note.valeur if note else 'Nulle'  # Vérifie si une note existe
#                     })
#                 eleves_with_notes.append({
#                     "id": eleve.id,
#                     'nom': eleve.nom,
#                     "prenom": eleve.prenom,
#                     "sexe": eleve.sexe,
#                     "date_naissance": eleve.date_naissance,
#                     "niveau_id": eleve.niveau.id,
#                     'niveau': eleve.niveau.nom,
#                     'matieres_notes': matieres_notes
#                 })

#             # Retourne le template avec la liste des élèves, leurs matières et moyennes
#             return render(request, 'notes/eleves.html', {'eleves': eleves_with_notes})
    
#     # Rendre le formulaire (déjà initialisé pour le cas GET)
#     return render(request, 'notes/add_eleve.html', {'form': form})




def update_eleve(request, id):
    eleve = get_object_or_404(Eleve, id=id)  # Récupère l'élève par son identifiant
    if request.method == 'POST':
        form = EleveForm(request.POST, instance=eleve)  # Prend l'instance existante
        if form.is_valid():
            form.save()  # Enregistre les modifications
            return redirect('eleve_list')  # Redirige vers la liste des élèves
    else:
        form = EleveForm(instance=eleve)  # Préremplit le formulaire avec les données de l'élève
    
    return render(request, 'notes/update_eleve.html', {'form': form}) 



# Vue pour générer un pdf
def listEleves(request):
    eleves = Eleve.objects.all()
    # print(eleves)
    # Chemin vers le fichier PDF
    pdf_path = os.path.join("Templating_ifnti/out/","liste_eleves.pdf")
    
    if not os.path.exists(pdf_path):
        contest = {"eleves" : eleves}
        generate_pdf(contest)
        
    
    # Ouvrir le fichier en mode binaire
    return FileResponse(open(pdf_path, 'rb'))


# Vue pour générer un pdf
# def listEleves(request):
    # Chemin vers le fichier PDF
    # pdf_path = os.path.join("out/","django_python_TOYI_Francois.pdf")
    
    # Ouvrir le fichier en mode binaire
    # return FileResponse(open(pdf_path, 'rb'))


def listeNiveauElv(request, niveau):
    # Filtrer les élèves par niveau
    eleves = Eleve.objects.filter(niveau=niveau)  # Supposons que 'niveau' est un champ dans le modèle Eleve

    # Chemin vers le fichier PDF
    pdf_path = os.path.join("Templating_ifnti/out/", "liste_eleves.pdf")
    
    if not os.path.exists(pdf_path):
        context = {"eleves": eleves}
        generate_pdf(context)  # Générer le PDF avec les élèves filtrés
        
    # Ouvrir le fichier en mode binaire
    return FileResponse(open(pdf_path, 'rb'))





# Vue pour générer un PDF des notes des élèves d'une matière donnée
def notesEleves(request, matiere_id):
  # Récupérer l'objet Matiere correspondant à l'ID donné
  matiere = get_object_or_404(Matiere, id=matiere_id)
  # print(matiere)

  # Récupérer les notes des élèves pour la matière spécifiée
  notes = Note.objects.filter(matiere=matiere)  # Supposons que Note a un champ 'matiere'
  # print(notes)
  
  # Filtrer les élèves qui suivent cette matière
  eleves = Eleve.objects.filter(matieres=matiere)
  # print(eleves)
  

  # Chemin vers le fichier PDF
  pdf_path = os.path.join("Templating_ifnti/out/", "notes_eleves.pdf")

  # Créer le répertoire si nécessaire
  os.makedirs("Templating_ifnti/out/", exist_ok=True)


  context = {"notes": notes, "matiere" : matiere}
  print("Contexte envoyé au PDF:", context)
  generate_note_pdf(context)  # Générer le PDF avec les notes filtrées
  return FileResponse(open(pdf_path, 'rb'))
  
  
def notesSynthese(request):
    print("Début de la synthèse des notes")  # Indication du début de la fonction

    # Récupérer tous les élèves
    eleves = Eleve.objects.all()
    print(f"Élèves récupérés : {[eleve.nom for eleve in eleves]}")  # Afficher les noms des élèves
    
    # Préparer un dictionnaire pour stocker les moyennes
    synthese = {}

    for eleve in eleves:
        print(f"\nTraitement de l'élève : {eleve.nom}")  # Indiquer quel élève est en cours de traitement
        
        # Récupérer les notes de chaque élève
        notes = Note.objects.filter(eleve=eleve)
        print(f"Notes de {eleve.nom} : {[note.valeur for note in notes]}")  # Afficher les notes de l'élève
        
        # Groupement par matière pour calculer la moyenne
        moyennes = notes.values('matiere__nom').annotate(moyenne=Avg('valeur'))
        print(f"Moyennes calculées : {list(moyennes)}")  # Afficher les moyennes calculées
        
        # Créer un dictionnaire pour stocker les moyennes par matière
        moyennes_dict = {}
        
        for matiere in Matiere.objects.all():
            # Vérifier si l'élève a une moyenne pour cette matière
            moyenne = next((m['moyenne'] for m in moyennes if m['matiere__nom'] == matiere.nom), None)
            if moyenne is not None:
                moyennes_dict[matiere.nom] = moyenne
                print(f"Moyenne pour {matiere.nom} : {moyenne}")  # Afficher la moyenne pour la matière
            else:
                moyennes_dict[matiere.nom] = "N/A"  # Ou 0, ou vous pouvez choisir de ne pas inclure
                print(f"Aucune note pour {matiere.nom}, assignation de 'N/A'")  # Indiquer qu'il n'y a pas de note

        # Ajouter les moyennes au dictionnaire
        synthese[eleve] = moyennes_dict

    print("\nSynthèse finale des moyennes :")  # Indiquer la fin de la collecte des moyennes
    for eleve, moyennes in synthese.items():
        print(f"{eleve.nom}: {moyennes}")  # Afficher la synthèse pour chaque élève

    # Passer les données au template
    context = {
        'synthese': synthese,
    }

    # Appel à la fonction pour générer le PDF
    pdf_path = generate_synthese_pdf(context)

    print(f"PDF généré à : {pdf_path}")  # Indiquer où le PDF a été sauvé

    # Retourner le fichier PDF
    with open(pdf_path, 'rb') as pdf_file:
        response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="synthese_notes.pdf"'
        return response        
        


# def eleve(request):
#     eleves_list = Eleve.objects.all()
    
#     html_content = """
#     <html>
#         <head>
#             <title>Liste des élèves et leurs notes</title>
#         </head>
#         <body>
#             <h1>Liste des élèves et leurs notes</h1>
#             <table border="1">
#                 <thead>
#                     <tr>
#                         <th>Nom de l'élève</th>
#                         <th>Niveau</th>
#                         <th>Matière</th>
#                         <th>Note</th>
#                     </tr>
#                 </thead>
#                 <tbody>
#     """

#     for eleve in eleves_list:
#         for matiere in eleve.matieres.all():
#             note = Note.objects.filter(eleve=eleve, matiere=matiere).first()
#             note_value = note.valeur if note else 'Nulle'
#             html_content += f"""
#                 <tr>
#                     <td>{eleve.nom}</td>
#                     <td>{eleve.niveau.nom}</td>
#                     <td>{matiere.nom}</td>
#                     <td>{note_value}</td>
#                 </tr>
#             """

#     # Fin du contenu HTML
#     html_content += """
#                 </tbody>
#             </table>
#         </body>
#     </html>
#     """

#     return HttpResponse(html_content)










# def eleves(request, id):
#     try:
#         # Récupérer l'élève manuellement
#         detail_eleve = Eleve.objects.get(id=id)
#     except Eleve.DoesNotExist:
#         # Si l'élève n'existe pas, renvoyer un message d'erreur simple
#         return HttpResponse("<h1>Élève non trouvé</h1>")
    
#     # Construire le contenu HTML
#     html_content = f"""
#     <html>
#         <head>
#             <title>Détails de l'élève</title>
#         </head>
#         <body>
#             <h1>Détails de l'élève : {detail_eleve.nom}</h1>
#             <h2>Niveau : {detail_eleve.niveau.nom}</h2>
#             <h3>Notes par matière</h3>
#             <table border="1">
#                 <thead>
#                     <tr>
#                         <th>Matière</th>
#                         <th>Note</th>
#                     </tr>
#                 </thead>
#                 <tbody>
#     """
    
#     # Ajout des notes dans la table
#     for matiere in detail_eleve.matieres.all():
#         note = Note.objects.filter(eleve=detail_eleve, matiere=matiere).first()
#         note_value = note.valeur if note else 'Nulle'  # Si pas de note, mettre 'Nulle'
        
#         html_content += f"""
#             <tr>
#                 <td>{matiere.nom}</td>
#                 <td>{note_value}</td>
#             </tr>
#         """
    
#     # Fin du contenu HTML
#     html_content += """
#                 </tbody>
#             </table>
#         </body>
#     </html>
#     """
    
#     return HttpResponse(html_content)



