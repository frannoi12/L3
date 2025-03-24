import { Component } from '@angular/core';
import { Personne } from '../../../models/personne';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonneService } from '../../../service/personne.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdatePersonnesComponent {
  personne: Personne = {
    id: 0,
    nom: '',
    prenom: '',
    statut: 'étudiant'
  };

  constructor(
    private route: ActivatedRoute,
    private personneService: PersonneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']); // Récupérer l'ID depuis l'URL
    if (!isNaN(id)) {
      this.personneService.getPersonneById(id).subscribe({
        next: (data) => {
          this.personne = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la personne', err);
        }
      });
    }
  }

  updatePersonne(): void {
    if (this.personne.id !== undefined) {
      this.personneService.updatePersonne(this.personne.id, this.personne).subscribe({
        next: () => {
          this.router.navigate(['/personnes']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la personne', err);
        }
      });
    }
  }
}
