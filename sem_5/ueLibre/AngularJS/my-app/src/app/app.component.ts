import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { log } from 'node:console';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {FormsModule} from '@angular/forms';



interface User{
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})





export class AppComponent implements OnInit {

  compteur$ = new BehaviorSubject<number>(0);

  title = 'my-app';

  nom : string = '';

  names = ['Alice', 'Bob', 'Charlie', 'TOYI'];

    message = 'Hello world!';
    taux : number = 0.25;
    montant : number = 5000;
    currencyCode : string = 'EUR';
    fontSize : number = 20;
    incrementer() {
      const valeurActuelle = this.compteur$.value;
      this.compteur$.next(valeurActuelle + 1);
    }

    renitialiser() {
      this.compteur$.next(0);
    }

    observable$ = new Observable((observer) => {
      observer.next('Hello');
      observer.next('World');
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    subscriptione:Subscription = this.observable$.subscribe({
      next: (value) => console.log(value),
    });

    subscriptions:Subscription = this.observable$.subscribe({
      next: (value) => console.log(value),
    });

  users$: Observable<User[]>;


  

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  private objet1 = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    this.objet1.subscribe((value: number) => {
      console.log(`Abonné ${value} : ${value}`);
    });

    this.objet1.next(1);
    this.objet1.next(2);

    log("deuxieme abonnement");

    this.objet1.subscribe((value: number) => {
      console.log(`Abonné ${value} : ${value}`);
    });
  }
}
