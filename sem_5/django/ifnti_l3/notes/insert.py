import os
import sys
sys.path.append('/home/toyi/Documents/L3/L3/sem_5/django/ifnti_l3/')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ifnti_l3.settings')  # Remplacez 'ifnti_l3' par le nom de votre projet

# sys.path.append('/home/toyi/Documents/L3/sem_5/django/ifnti_l3')
# os.environ['DJANGO_SETTINGS_MODULE'] = 'ifnti_l3.settings'


import django
django.setup()

from datetime import date
from notes.models import Niveau,Eleve,Enseignant,Matiere,Note
from notes.models.enseignements import Enseignement


niv1 = Niveau(1,"L1")
niv2 = Niveau(2,"L2")
niv3 = Niveau(3,"L3")
# niv4 = Niveau()
# niv1.nom="L1"
# niv2.nom="L2"
# niv3.nom="L3"
niv1.save()
niv2.save()
niv3.save()
# niv4.save()

eleve1 = Eleve(id="90158486", nom="Toune", prenom="Ouvo", date_naissance=date(1995, 10, 25),sexe="M", niveau=niv1)
eleve1.save()

eleve2 = Eleve(id="90154234", nom="Falle", prenom="Eppa", date_naissance=date(1993, 5, 2),sexe="M", niveau=niv2)
eleve2.save()

eleve3 = Eleve(id="90153598", nom="Jean", prenom="Aimar", date_naissance=date(1993, 12, 6),sexe="M", niveau=niv3)
eleve3.save()


eleve4 = Eleve(id="93516499", nom="TOYI", prenom="Frannois", date_naissance=date(1990, 10, 1),sexe="M", niveau=niv3)
eleve4.save()


# Création des enseignants
en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M")
en1.save()
# en1.matieres.set([mat1, mat4])  # Associer les matières après avoir enregistré l'enseignant

en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F")
en2.save()
# en2.matieres.set([mat2, mat3])  # Associer les matières après avoir enregistré l'enseignant

en3 = Enseignant(nom="Parlaf", prenom="Eunaitre", date_naissance=date(1990, 2, 28), sexe="M")
en3.save()


# Création des matières avec association des enseignants
mat1 = Matiere(nom="Bases de la programmation", enseignant=en1)
mat1.save()

mat2 = Matiere(nom="Mathematiques", enseignant=en2)
mat2.save()

mat3 = Matiere(nom="Langages Webs", enseignant=en2)
mat3.save()

mat4 = Matiere(nom="Gestion projets", enseignant=en1)
mat4.save()

mat5 = Matiere(nom="Anglais", enseignant=en3)
mat5.save()



# mat1=Matiere(nom="Bases de la programmation",enseignant=en1)
# mat2=Matiere(nom="Mathematiques",enseignant=en2)
# mat3=Matiere()
# mat4=Matiere()
# mat5=Matiere()


# # mat1.nom="Bases de la programmation"
# # mat1.enseignant=en1
# mat1.save()
# # mat2.nom="Mathematiques"
# # mat2.enseignant=en2
# mat2.save()
# mat3.nom="Langages Webs"
# mat2.enseignant=en2
# mat3.save()
# mat4.nom="Gestion projets"
# mat4.enseignant=en1
# mat4.save()
# mat5.nom="Anglais"
# mat5.enseignant=en3
# mat5.save()


# Créer les notes pour chaque élève et matière
# Pour eleve1
note1_1 = Note()
note1_1.eleve = eleve1
note1_1.matiere = mat1
note1_1.valeur = 15.0  # Exemple de note
note1_1.save()

note1_2 = Note()
note1_2.eleve = eleve1
note1_2.matiere = mat2
note1_2.valeur = 14.0  # Exemple de note
note1_2.save()

note1_3 = Note()
note1_3.eleve = eleve1
note1_3.matiere = mat3
note1_3.valeur = 13.0  # Exemple de note
note1_3.save()

note1_4 = Note()
note1_4.eleve = eleve1
note1_4.matiere = mat4
note1_4.valeur = 16.0  # Exemple de note
note1_4.save()

note1_5 = Note()
note1_5.eleve = eleve1
note1_5.matiere = mat5
note1_5.valeur = 17.0  # Exemple de note
note1_5.save()

# Pour eleve2
note2_1 = Note()
note2_1.eleve = eleve2
note2_1.matiere = mat1
note2_1.valeur = 12.0
note2_1.save()

note2_2 = Note()
note2_2.eleve = eleve2
note2_2.matiere = mat2
note2_2.valeur = 13.5
note2_2.save()

note2_3 = Note()
note2_3.eleve = eleve2
note2_3.matiere = mat3
note2_3.valeur = 11.0
note2_3.save()

note2_4 = Note()
note2_4.eleve = eleve2
note2_4.matiere = mat4
note2_4.valeur = 14.0
note2_4.save()

note2_5 = Note()
note2_5.eleve = eleve2
note2_5.matiere = mat5
note2_5.valeur = 16.5
note2_5.save()

# Pour eleve3
note3_1 = Note()
note3_1.eleve = eleve3
note3_1.matiere = mat1
note3_1.valeur = 10.0
note3_1.save()

note3_2 = Note()
note3_2.eleve = eleve3
note3_2.matiere = mat2
note3_2.valeur = 12.5
note3_2.save()

note3_3 = Note()
note3_3.eleve = eleve3
note3_3.matiere = mat3
note3_3.valeur = 14.0
note3_3.save()

note3_4 = Note()
note3_4.eleve = eleve3
note3_4.matiere = mat4
note3_4.valeur = 15.0
note3_4.save()

note3_5 = Note()
note3_5.eleve = eleve3
note3_5.matiere = mat5
note3_5.valeur = 17.0
note3_5.save()

# Pour eleve4
note4_1 = Note()
note4_1.eleve = eleve4
note4_1.matiere = mat1
note4_1.valeur = 16.0
note4_1.save()

note4_2 = Note()
note4_2.eleve = eleve4
note4_2.matiere = mat2
note4_2.valeur = 15.5

note4_3 = Note()
note4_3.eleve = eleve4
note4_3.matiere = mat3
note4_3.valeur = 14.0
note4_3.save()

note4_4 = Note()
note4_4.eleve = eleve4
note4_4.matiere = mat4
note4_4.valeur = 13.0
note4_4.save()

note4_5 = Note()
note4_5.eleve = eleve4
note4_5.matiere = mat5
note4_5.valeur = 18.0
note4_5.save()



# Attribution des matières aux élèves
# eleve1 (niveau L1)
eleve1.matieres.set([mat1, mat2, mat5])  # Bases de la programmation, Mathématiques, et Anglais pour L1

# eleve2 (niveau L2)
eleve2.matieres.set([mat1, mat2, mat3, mat5])  # Bases de la programmation, Mathématiques, Langages Webs et Anglais pour L2

# eleve3 (niveau L3)
eleve3.matieres.set([mat2, mat3, mat4, mat5])  # Mathématiques, Langages Webs, Gestion projets et Anglais pour L3

# eleve4 (niveau L3)
eleve4.matieres.set([mat1, mat3, mat5])  # Bases de la programmation, Langages Webs, et Anglais pour L3

 




# # Création des enseignants
# en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M")
# en1.save()
# # en1.matieres.set([mat1, mat4])  # Associer les matières après avoir enregistré l'enseignant

# en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F")
# en2.save()
# # en2.matieres.set([mat2, mat3])  # Associer les matières après avoir enregistré l'enseignant

# en3 = Enseignant(nom="Parlaf", prenom="Eunaitre", date_naissance=date(1990, 2, 28), sexe="M")
# en3.save()
# # en3.matieres.set([mat5])  # Associer les matières après avoir enregistré l'enseignant


# # Association des matières avec les enseignants et les niveaux
# # Bases de la programmation enseigné en L1 par M. Stroffaube
# en1.matieres.set([mat1])  # M. Stroffaube enseigne "Bases de la programmation" en L1

# # Mathématiques enseigné en L1 et en L2 par Mme Sillon
# en2.matieres.set([mat2])  # Mme Sillon enseigne "Mathématiques"
niv1.matiere.add(mat2)    # Associé à L1
niv2.matiere.add(mat2)    # Associé à L2

# # Langages Webs enseigné en L2 et en L3 par Mme Sillon
niv2.matiere.add(mat3)    # Associé à L2
niv3.matiere.add(mat3)    # Associé à L3

# # Gestion de projets enseigné en L3 par M. Stroffaube
niv3.matiere.add(mat4)    # Associé à L3

# # Anglais enseigné dans les 3 niveaux par M. Eunaître
niv1.matiere.add(mat5)    # Associé à L1
niv2.matiere.add(mat5)    # Associé à L2
niv3.matiere.add(mat5)    # Associé à L3


# Bases de la programmation enseignée en L1 par M. Stroffaube
# enseignement1 = Enseignement(enseignant=en1, matiere=mat1, niveau=niv1)
# enseignement1.save()

# # Mathématiques enseignée en L1 et en L2 par Mme Sillon
# enseignement2 = Enseignement(enseignant=en2, matiere=mat2, niveau=niv1)
# enseignement2.save()
# enseignement3 = Enseignement(enseignant=en2, matiere=mat2, niveau=niv2)
# enseignement3.save()

# # Langages Webs enseignée en L2 et en L3 par Mme Sillon
# enseignement4 = Enseignement(enseignant=en2, matiere=mat3, niveau=niv2)
# enseignement4.save()
# enseignement5 = Enseignement(enseignant=en2, matiere=mat3, niveau=niv3)
# enseignement5.save()

# # Gestion de projets enseignée en L3 par M. Stroffaube
# enseignement6 = Enseignement(enseignant=en1, matiere=mat4, niveau=niv3)
# enseignement6.save()

# # Anglais enseignée dans les trois niveaux par M. Eunaître
# enseignement7 = Enseignement(enseignant=en3, matiere=mat5, niveau=niv1)
# enseignement7.save()
# enseignement8 = Enseignement(enseignant=en3, matiere=mat5, niveau=niv2)
# enseignement8.save()
# enseignement9 = Enseignement(enseignant=en3, matiere=mat5, niveau=niv3)
# enseignement9.save()


# en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M" ,matieres=mat1)
# en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F", matieres=mat2)
# en1.save()
# en2.save()
# en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F", matieres=mat3)
# en2.save()
# en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M" ,matieres=mat4)
# en1.save()
# en3 = Enseignant(nom="Parlaf", prenom="Eunaitre", date_naissance=date(1990, 2, 28), sexe="M", matieres=mat5)
# en3.save()
