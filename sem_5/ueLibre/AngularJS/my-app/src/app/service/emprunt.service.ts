import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emprunt } from '../models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private apiUrl = 'http://localhost:3000/emprunts';

  constructor(private http: HttpClient) {}

  getEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.apiUrl);
  }

  getEmpruntById(id: number): Observable<Emprunt> {
    return this.http.get<Emprunt>(`${this.apiUrl}/${id}`);
  }

  createEmprunt(emprunt: Emprunt): Observable<Emprunt> {
    return this.http.post<Emprunt>(this.apiUrl, emprunt);
  }

  updateEmprunt(id: number, emprunt: Emprunt): Observable<Emprunt> {
    return this.http.put<Emprunt>(`${this.apiUrl}/${id}`, emprunt);
  }

  deleteEmprunt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
