import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LivreService } from '../../service/livre.service';
import { Livre } from '../../models/livre';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.css'
})
export class LivreComponent {

  livres: Livre[] = [];
  newLivre: Livre = {id: 0, titre: '', auteur: '', disponible: false};
  selectedLivre: Livre | null = null;

  constructor(private livreService: LivreService) {}


  ngOnInit(): void {
    this.loadLivres();
  }

  loadLivres(): void {
    this.livres = this.livreService.getLivres();
  }

  addLivre(): void {
    this.newLivre.id = this.livres.length + 1;
    this.livreService.addLivre(this.newLivre);
    this.newLivre = {id: 0, titre: '', auteur: '', disponible: false};
    this.loadLivres();
  }

  selectLivre(livre: Livre): void {
    this.selectedLivre = { ...livre};
  }

  updateLivre(): void {
    if (this.selectedLivre) {
      this.livreService.updateLivre(this.selectedLivre.id, this.selectedLivre);
      this.selectedLivre = null;
      this.loadLivres();
    }
  }

  deleteLivre(id: number): void {
    this.livreService.deleteLivre(id);
    this.loadLivres();
  }

}
