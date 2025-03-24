import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonneService } from '../../../service/personne.service';
import { Personne } from '../../../models/personne';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-personne',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreatePersonneComponent {
  personne: Personne = {
    nom: '',
    prenom: '',
    statut: 'étudiant' // Valeur par défaut
  };

  constructor(
    private personneService: PersonneService,
    private router: Router
  ) {}

  createPersonne(): void {
    this.personneService.createPersonne(this.personne).subscribe({
      next: () => {
        this.router.navigate(['/personnes']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la personne', err);
      }
    });
  }
}
