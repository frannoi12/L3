import { Routes } from '@angular/router';
import { ListComponent } from './components/livre/list/list.component';
import { CreateComponent } from './components/livre/create/create.component';
import { UpdateComponent } from './components/livre/update/update.component';
import { ListPersonneComponent } from './components/personne/list/list.component';
import { CreatePersonneComponent } from './components/personne/create/create.component';
import { UpdatePersonnesComponent } from './components/personne/update/update.component';
import { ListeEmpruntComponent } from './components/emprunt/liste/liste.component';
import { CreateEmpruntComponent } from './components/emprunt/create/create.component';
import { UpdateEmpruntComponent } from './components/emprunt/update/update.component';

export const routes: Routes = [
    { path: 'livres', component:ListComponent },
    { path: 'livres/create', component: CreateComponent },
    { path: 'livres/update/:id', component: UpdateComponent },

    { path: 'personnes', component: ListPersonneComponent },
    { path: 'personnes/create', component: CreatePersonneComponent },
    { path: 'personnes/update/:id', component: UpdatePersonnesComponent },


    {path: 'emprunts', component: ListeEmpruntComponent},
    {path: 'emprunts/create', component: CreateEmpruntComponent},
    {path: 'emprunts/update/:id', component: UpdateEmpruntComponent}
];
