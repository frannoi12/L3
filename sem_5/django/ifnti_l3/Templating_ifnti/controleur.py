from jinja2 import Environment, FileSystemLoader
from latex import build_pdf
from os.path import dirname,abspath

def generate_pdf(context) :
    #INSTANCIATION D’UN NOUVEL ENVIRONNEMENT
    #AVEC DES OPTIONS DE BALISES PERSONNALISÉES
    j2_env = Environment(variable_start_string="\VAR{",
    variable_end_string="}",block_start_string="\BLOCK{",
    block_end_string="}", comment_start_string="\COMMENT{",
    comment_end_string="}")
    #DECLARATION DE FICHIER
    #fichier à lire contenant le template avec les balises
    fichier_in = open("ifnti/listes_eleves.tex", 'r')
    #fichier en sortie accueillant les donnéesfournies
    fichier_out = open("Templating_ifnti/out/template_out.tex", 'w')
    template = fichier_in.read() #lecture du template
    monContext = context
    monContext["image_path"] = dirname(abspath(__file__)) + "/out/images/"
    
    #’’’APPLICATION DE L’ENVIRONNEMENT EDITE SUR LE TEMPLATE’’’
    j2_template = j2_env.from_string(template)
    # écriture dans le fichier en sortie
    fichier_out.write(j2_template.render(monContext))
    fichier_out.close()
    mon_pdf = build_pdf(open("Templating_ifnti/out/template_out.tex", 'r'))
    mon_pdf.save_to("Templating_ifnti/out/liste_eleves.pdf")
    #’’’FERMETURE DE CANAUX’’’
    fichier_in.close()