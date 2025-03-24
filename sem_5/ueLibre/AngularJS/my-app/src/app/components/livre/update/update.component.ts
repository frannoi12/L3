import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../../../models/livre';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivreService } from '../../../service/livre.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  livre: Livre = {
    id: 0,
    titre: '',
    auteur: '',
    disponible: true
  };

  constructor(
    private route: ActivatedRoute,
    private livreService: LivreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']); // Conversion en number
    this.livreService.getLivreById(id).subscribe({
      next: (data) => {
        this.livre = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du livre', err);
      }
    });
  }

  updateLivre(): void {
    if (this.livre.id !== undefined) { // Vérification que l'ID est défini
      this.livreService.updateLivre(this.livre.id, this.livre).subscribe({
        next: () => {
          this.router.navigate(['/livres']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du livre', err);
        }
      });
    } else {
      console.error("Erreur : l'ID du livre est indéfini !");
    }
  }  
}
