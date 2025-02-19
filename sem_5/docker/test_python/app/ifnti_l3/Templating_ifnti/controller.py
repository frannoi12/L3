from jinja2 import Environment, FileSystemLoader
from latex import build_pdf
from os.path import dirname, abspath

def generate_note_pdf(context):
    # Instanciation d’un nouvel environnement
    j2_env = Environment(
        variable_start_string="\VAR{",
        variable_end_string="}",
        block_start_string="\BLOCK{",
        block_end_string="}",
        comment_start_string="\COMMENT{",
        comment_end_string="}"
    )
    
    # Déclaration de fichier
    # Fichier à lire contenant le template avec les balises
    fichier_in = open("ifnti/notes_template.tex", 'r')  # Mettez à jour le chemin si nécessaire
    # Fichier en sortie accueillant les données fournies
    fichier_out = open("Templating_ifnti/out/template_out.tex", 'w')
    
    # Lecture du template
    template = fichier_in.read()
    
    # Contexte
    monContext = context
    monContext["image_path"] = dirname(abspath(__file__)) + "/out/images/"
    
    # Application de l’environnement édité sur le template
    j2_template = j2_env.from_string(template)
    
    # Écriture dans le fichier en sortie
    fichier_out.write(j2_template.render(monContext))
    fichier_out.close()
    
    # Génération du PDF
    mon_pdf = build_pdf(open("Templating_ifnti/out/template_out.tex", 'r'))
    mon_pdf.save_to("Templating_ifnti/out/notes_eleves.pdf")  # Modifiez le nom du fichier de sortie

    # Fermeture de canaux
    fichier_in.close()