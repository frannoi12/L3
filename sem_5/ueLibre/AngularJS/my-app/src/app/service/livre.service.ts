import { Injectable } from '@angular/core';
import { Livre } from '../models/livre';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LivreService {
  // private livres: Livre[] = [
  //   {id: 1, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', disponible: true},
  //   {id: 2, titre: 'À la recherche du temps perdu', auteur: 'Marcel Proust', disponible: false},
  //   {id: 3, titre: 'Demande à la poussière', auteur: 'John Fante', disponible: true},
  //   {id: 4, titre: 'Livre 4', auteur: 'Auteur 4', disponible: false},
  // ];

  private url = 'http://localhost:3000/livres';

  constructor(private http:HttpClient) { }


  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLivreById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.url, livre)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLivre(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.url}/${id}`, livre)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLivre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Gestion des erreurs
  private handleError(error: HttpErrorResponse){
    console.error('Erreur HTTP : ' , error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }

  // Récupérer tous les livres (Read)
  // getLivres(): Observable<Livre[]> {
  //   return this.http.get<Livre[]>(this.url)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // Récupérer un livre par ID (Read)
  // getLivreById(id: number): Livre | undefined {
  //   return this.livres.find(livre => livre.id === id);
  // }

  // Ajouter un livre (Create)
  // addLivre(livre: Livre): void {
  //   this.livres = [...this.livres, { ...livre }]; // Ajoute un livre sans modifier directement l'array
  // }

  // Mettre à jour un livre (Update)
  // updateLivre(id: number, updatedLivre: Partial<Livre>): void {
  //   this.livres = this.livres.map(livre => 
  //     livre.id === id ? { ...livre, ...updatedLivre } : livre
  //   );
  // }

  // Supprimer un livre (Delete)
  // deleteLivre(id: number): void {
  //   this.livres = this.livres.filter(livre => livre.id !== id);
  // }
}
