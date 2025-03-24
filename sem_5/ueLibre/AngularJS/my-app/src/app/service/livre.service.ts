import { Injectable } from '@angular/core';
import { Livre } from '../models/livre';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private url = 'http://localhost:3000/livres';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Récupérer tous les livres (Read)
  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un livre par ID (Read)
  getLivreById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Ajouter un livre (Create)
  createLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.url, livre, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour un livre (Update)
  updateLivre(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.url}/${id}`, livre, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un livre (Delete)
  deleteLivre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
