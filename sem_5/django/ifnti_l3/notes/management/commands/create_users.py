from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from notes.models import Eleve, Enseignant  # Assurez-vous d'importer correctement vos modèles

class Command(BaseCommand):
    help = 'Crée un utilisateur pour chaque élève et enseignant existant et l\'associe à la personne'

    def handle(self, *args, **kwargs):
        # Récupère toutes les instances d'élèves et d'enseignants
        eleves = Eleve.objects.all()
        enseignants = Enseignant.objects.all()

        # Crée des utilisateurs pour les élèves
        for eleve in eleves:
            username = (eleve.prenom[0].lower() + eleve.nom.lower())
            password = 'ifnti2023'
            user = User.objects.create_user(username=username, password=password)
            eleve.user = user
            eleve.save()
            self.stdout.write(self.style.SUCCESS(f'Utilisateur créé pour {eleve.prenom} {eleve.nom}'))

        # Crée des utilisateurs pour les enseignants
        for enseignant in enseignants:
            username = (enseignant.prenom[0].lower() + enseignant.nom.lower())
            password = 'ifnti2023'
            user = User.objects.create_user(username=username, password=password)
            enseignant.user = user
            enseignant.save()
            self.stdout.write(self.style.SUCCESS(f'Utilisateur créé pour {enseignant.prenom} {enseignant.nom}'))
