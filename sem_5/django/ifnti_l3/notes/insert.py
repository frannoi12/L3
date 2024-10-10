from datetime import date
from notes.models import Niveau,Eleve,Enseignant,Matiere
niv1 = Niveau()
niv2 = Niveau()
niv3 = Niveau()
niv1.nom="L1"
niv2.nom="L2"
niv3.nom="L3"
niv1.save()
niv2.save()
niv3.save()

eleve1 = Eleve(id="90158486", nom="Toune", prenom="Ouvo", date_naissance=date(1995, 10, 25),sexe="M", niveau=niv1)
eleve1.save()

eleve2 = Eleve(id="90154234", nom="Falle", prenom="Eppa", date_naissance=date(1993, 5, 2),sexe="M", niveau=niv2)
eleve2.save()

eleve3 = Eleve(id="90153598", nom="Jean", prenom="Aimar", date_naissance=date(1993, 12, 6),sexe="M", niveau=niv3)
eleve3.save()


eleve2 = Eleve(id="90154234", nom="Falle", prenom="Eppa", date_naissance=date(1993, 5, 2),sexe="F", niveau=niv2)
eleve2.save()


mat1=Matiere()
mat2=Matiere()
mat3=Matiere()
mat4=Matiere()
mat5=Matiere()


mat1.nom="Bases de la programmation"
mat1.save()
mat2.nom="Mathematiques"
mat2.save()
mat3.nom="Langages Webs"
mat3.save()
mat4.nom="Gestion projets"
mat4.save()
mat5.nom="Anglais"
mat5.save()


en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M" ,matiere=mat1)
en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F", matiere=mat2)
en1.save()
en2.save()
en2 = Enseignant(nom="Abla", prenom="Sillon", date_naissance=date(1960, 7, 2), sexe="F", matiere=mat3)
en2.save()
en1 = Enseignant(nom="Claude", prenom="Stroffaube", date_naissance=date(1967, 8, 1), sexe="M" ,matiere=mat4)
en1.save()
en3 = Enseignant(nom="Parlaf", prenom="Eunaitre", date_naissance=date(1990, 2, 28), sexe="M", matiere=mat5)
en3.save()
