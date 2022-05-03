// best practice by defining a service to perform data-handling
// fetching, post-process, error handling, retry logic

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, map, tap, Observable, of } from 'rxjs';

import { MessageService } from '../messages/message.service';

@Injectable()
export class HeroService {
  heroesUrl: string = 'assets/mock-heroes.json'

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes() {
    // specify the response object type withe an Interface
    const heroes$ = this.http.get<MockHeroes>(this.heroesUrl).pipe(
      tap(_ => this.messageService.emit('HeroService: fetched heroes')),
      // resubscribe if the source stream error at most count time
      retry(3),
      catchError(this.handleError),
    ).pipe(
      map( data => data.heroes)
    )
    
    return heroes$
  }

  getHero(id: number = 1): Observable<Hero | undefined> {
    return this.getHeroes().pipe(
      map( heroes => heroes.find( hero => hero.id === id))
    )
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
      () => new Error('Something bad happened; please try again later.')
    );
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
  fullName?: string,
  groups: string[],
  powersAndAbilities: string[],
  shortDescription: string,
  longDescription?: string,
  avatarUrl?: string
}