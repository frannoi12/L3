import { Injectable } from '@angular/core';
import { Livre } from '../models/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private livres: Livre[] = [
    {id: 1, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéri', disponible: true},
    {id: 2, titre: 'À la recherche du temps perdu - Intégrable', auteur: 'Sarata', disponible: false},
    {id: 3, titre: 'Demande à la poussière', auteur: 'Crépin', disponible: true},
    {id: 4, titre: 'Livre 4', auteur: 'Auteur 4', disponible: false},
  ];

  constructor() { }

  // Récupérer tous les livres (Read)
  getLivres(): Livre[] {
    return this.livres;
  }

  // Récupérer un livre par son ID (Read)
  getLivreById(id: number): Livre | undefined {
    return this.livres.find((livre) => livre.id === id);
  }

  // Ajouter un livre (Create)
  addLivre(livre: Livre): void {
    this.livres.push(livre);
  }

  // Mettre à jour un livre (Update)
  updateLivre(id: number, updatedLivre: Partial<Livre>): void {
    const livre = this.getLivreById(id);
    if (livre) {
      Object.assign(livre, updatedLivre); // Met à jour les propriétés du livre
    }
  }

  // Supprimer un livre (Delete)
  deleteLivre(id: number): void {
    this.livres = this.livres.filter((livre) => livre.id !== id);
  }

}
