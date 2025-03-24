import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Livre } from '../../../models/livre';
import { LivreService } from '../../../service/livre.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'] // Correction ici (styleUrls au lieu de styleUrl)
})
export class ListComponent implements OnInit {
  livres: Livre[] = [];

  constructor(
    private livreService: LivreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLivres();
  }

  loadLivres(): void {
    this.livreService.getLivres().subscribe({
      next: (data) => {
        this.livres = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livres', err);
      }
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      this.deleteLivre(id);
    }
  }

  deleteLivre(id: number): void {
    this.livreService.deleteLivre(id).subscribe({
      next: () => {
        alert('Livre supprimé avec succès !'); // Optionnel : Ajouter une notification
        this.loadLivres(); // Recharge la liste après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du livre', err);
      }
    });
  }
}
