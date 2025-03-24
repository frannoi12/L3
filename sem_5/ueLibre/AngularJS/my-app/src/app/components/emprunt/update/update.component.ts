import { Component } from '@angular/core';
import { Emprunt } from '../../../models/emprunt';
import { EmpruntService } from '../../../service/emprunt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateEmpruntComponent {

  emprunt: Emprunt | null = null; // Assurer que l'emprunt est initialisé après récupération
  id!: number; // Stocke l'ID de l'emprunt

  constructor(
    private empruntService: EmpruntService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'ID depuis l'URL
    if (this.id) {
      this.empruntService.getEmpruntById(this.id).subscribe((data) => {
        this.emprunt = data;
      });
    }
  }

  updateEmprunt(): void {
    if (this.emprunt) {
      this.empruntService.updateEmprunt(this.id, this.emprunt).subscribe(() => {
        this.router.navigate(['/emprunts']); // Redirection après mise à jour
      });
    }
  }
}
