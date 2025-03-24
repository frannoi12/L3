import { Component } from '@angular/core';
import { LivreService } from '../../../service/livre.service';
import { Livre } from '../../../models/livre';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  livre: Livre = {
    titre: '',
    auteur: '',
    disponible: true
  };

  constructor(
    private livreService: LivreService,
    private router: Router
  ) {}

  createLivre(): void {
    console.log("🔵 Avant envoi :", this.livre); 
    
    
    this.livreService.createLivre(this.livre).subscribe({
      next: () => {
        alert('Livre ajouté avec succès !');  // ✅ Ajout d'un message de confirmation
        this.router.navigate(['/livres']);
      },
      error: (err) => {
        console.error('Erreur lors de la création du livre', err);
      }
    });
  }
}
