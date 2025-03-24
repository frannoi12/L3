import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Emprunt } from '../../../models/emprunt';
import { EmpruntService } from '../../../service/emprunt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateEmpruntComponent {

  emprunt: Emprunt = {
    personneId: 0,
    livreId: 0,
    dateEmprunt: new Date().toISOString().split('T')[0],
    dateRetour: ''
  };

  constructor(private empruntService: EmpruntService, private router: Router) {}

  createEmprunt(): void {
    this.empruntService.createEmprunt(this.emprunt).subscribe({
      next: () => {
        this.router.navigate(['/emprunts']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'emprunt', err);
      }
    });
  }

}
