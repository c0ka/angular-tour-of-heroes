import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, map } from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroesUrl: string = 'assets/mock-heroes.json'

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes() {
    const heroes = this.http.get<MockHeroes>(this.heroesUrl).pipe(
      retry(3),
      catchError(this.handleError),
    ).pipe(
      map( data => data.heroes)
    )
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

export interface MockHeroes {
  name: string,
  version: string,
  brief: string,
  heroes: Array<Hero>
 
}

export interface Hero {
  id: number,
  name: string,
  fullName: string,
  groups: string[],
  powersAndAbilities: string[],
  shortDescription: string,
  longDescription: string,
  avatarUrl: string
}