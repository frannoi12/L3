from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from notes.models import Matiere




def matieres(request):
    list_matiere = Matiere.objects.all()
    
    # Début du contenu HTML
    html_content = """
    <html>
        <head>
            <title>Liste des Matières</title>
        </head>
        <body>
            <h1>Liste des Matières</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom de la Matière</th>
                    </tr>
                </thead>
                <tbody>
    """
    
    # Remplissage des matières dans la table
    for matiere in list_matiere:
        html_content += f"""
            <tr>
                <td>{matiere.nom}</td>
            </tr>
        """
    
    # Fin du contenu HTML
    html_content += """
                </tbody>
            </table>
        </body>
    </html>
    """
    
    return HttpResponse(html_content)






# Vue pour la liste des matières avec leurs enseignants

# def matieres(request):
#     list_matiere = Matiere.objects.all()
    
#     return HttpResponse(list_matiere)

    # return render(request, 'notes/matieres.html', {'matieres': list_matiere})



# Vue pour le détail d'une matière particulière
def matiere(request, id):
    detail_matiere = get_object_or_404(Matiere, id=id)

    return HttpResponse(detail_matiere)
    # return render(request, 'notes/detail_matiere.html', {'matiere': detail_matiere})
