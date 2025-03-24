import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Emprunt } from '../../../models/emprunt';
import { EmpruntService } from '../../../service/emprunt.service';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeEmpruntComponent {

  emprunts: Emprunt[] = [];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.loadEmprunts();
  }

  loadEmprunts(): void {
    this.empruntService.getEmprunts().subscribe({
      next: (data) => {
        this.emprunts = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des emprunts', err);
      }
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet emprunt ?')) {
      this.empruntService.deleteEmprunt(id).subscribe(() => {
        this.loadEmprunts();
      });
    }
  }
}
