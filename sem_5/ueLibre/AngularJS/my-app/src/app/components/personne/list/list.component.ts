import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonneService } from '../../../service/personne.service';
import { Personne } from '../../../models/personne';

@Component({
  selector: 'app-list-personne',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListPersonneComponent implements OnInit {
  personnes: Personne[] = [];

  constructor(private personneService: PersonneService) {}

  ngOnInit(): void {
    this.loadPersonnes();
  }

  loadPersonnes(): void {
    this.personneService.getPersonnes().subscribe({
      next: (data) => {
        this.personnes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnes', err);
      }
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette personne ?')) {
      this.personneService.deletePersonne(id).subscribe({
        next: () => {
          this.loadPersonnes();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
}
