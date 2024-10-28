from django.shortcuts import render, get_object_or_404
# from django.http import HttpResponse
from notes.models import Matiere




# def matieres(request):
#     list_matiere = Matiere.objects.all()
    
#     # Début du contenu HTML
#     html_content = """
#     <html>
#         <head>
#             <title>Liste des Matières</title>
#         </head>
#         <body>
#             <h1>Liste des Matières</h1>
#             <table border="1">
#                 <thead>
#                     <tr>
#                         <th>Nom de la Matière</th>
#                     </tr>
#                 </thead>
#                 <tbody>
#     """
    
#     # Remplissage des matières dans la table
#     for matiere in list_matiere:
#         html_content += f"""
#             <tr>
#                 <td>{matiere.nom}</td>
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






# Vue pour la liste des matières avec leurs enseignants

def matieres(request):
    list_matiere = Matiere.objects.all()
    
    # matieres_list = Matiere.objects.prefetch_related('enseignants').all()
    
    
    matieres_with_enseignants = []
        
        
    for matiere in list_matiere:
        enseignant = matiere.enseignant  # Récupère les enseignants de la matière
        enseignants_noms = enseignant if enseignant else 'Aucun enseignant'  # Liste des noms des enseignants
        matieres_with_enseignants.append({
            "matiere_id" : matiere.id,
            'matiere': matiere.nom,
            'enseignants': enseignants_noms
        })
    
    
    # return HttpResponse(list_matiere)

    return render(request, 'notes/matieres.html', {'matieres': matieres_with_enseignants})



# Vue pour le détail d'une matière particulière
def matiere(request, id):
    detail_matiere = get_object_or_404(Matiere, id=id)

    # return HttpResponse(detail_matiere)
    return render(request, 'notes/detail_matiere.html', {'matiere': detail_matiere})
