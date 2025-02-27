from jinja2 import Environment
from latex import build_pdf
from os.path import dirname, abspath

def generate_synthese_pdf(context):
    # Instanciation d’un nouvel environnement
    j2_env = Environment(
        variable_start_string="{{",  # Modifiez si nécessaire
        variable_end_string="}}",
        block_start_string="{%",
        block_end_string="%}"
    )
    
    # Déclaration des fichiers avec gestion de contexte
    template_path = "ifnti/synthese_template.tex"  # Mettez à jour le chemin si nécessaire
    output_tex_path = "Templating_ifnti/out/synthese_notes.tex"
    output_pdf_path = "Templating_ifnti/out/synthese_notes.pdf"

    # Lecture du template
    with open(template_path, 'r') as fichier_in:
        template = fichier_in.read()
    
    # Contexte
    monContext = context
    monContext["image_path"] = dirname(abspath(__file__)) + "/out/images/"
    
    # Application de l’environnement édité sur le template
    j2_template = j2_env.from_string(template)
    
    # Écriture dans le fichier en sortie
    with open(output_tex_path, 'w') as fichier_out:
        fichier_out.write(j2_template.render(monContext))
    
    # Génération du PDF
    mon_pdf = build_pdf(open(output_tex_path, 'r'))
    mon_pdf.save_to(output_pdf_path)  # Modifiez le nom du fichier de sortie

    # Retourner le chemin du PDF généré
    return output_pdf_path  # Ajouté pour retourner le chemin