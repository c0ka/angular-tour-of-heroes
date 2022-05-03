import { Injectable } from '@angular/core';
import { BehaviorSubject, from, pipe, map, mergeMap, ReplaySubject, tap, mergeWith, concatWith } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { SupabaseService } from '../services/supabase.service';

import { Crisis } from './crisis.type';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  // ReplaySubject acts like BehaviorSubject which emit the last value to new subscriber
  // the difference is it doesn't have an initial value
  // private crises$ = new ReplaySubject<Crisis[]>(1)
  private crises$ = new BehaviorSubject<Crisis[]|null>(null)
  
  static nextCrisisId = 100

  constructor( private messageService: MessageService, private supabase: SupabaseService) { 
    this.supabase.getCrises()
      .then( resolved => {
        const { data, error } = resolved
        if (!data && error) 
          this.messageService.emit('CrisisService: ' + error.message)
        this.crises$.next(data as Crisis[])
    })
  }

  getCrises() { return this.crises$ }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map( crises => {
          let crisis: Crisis | null = null
          if (!crises) return crisis 
          return crises.find(crisis => crisis.id === +id)
      })
    )
  }

  // addCrisis(name: string) {
  //   name = name.trim()
  //   if (name) {
  //     const crisis = { id: CrisisService.nextCrisisId++, name }
  //     CRISES.push(crisis)
  //     this.crises$.next(CRISES)
  //   }
  // }
}
