import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, map } from 'rxjs';
import { MessageService } from '../messages/message.service';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crises$ = new BehaviorSubject<Crisis[]>(CRISES)
  static nextCrisisId = 100

  constructor(private messageService: MessageService) { }

  getCrises() { return this.crises$ }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map( crises => crises.find(crisis => crisis.id === +id)!)
    )
  }

  addCrisis(name: string) {
    name = name.trim()
    if (name) {
      const crisis = { id: CrisisService.nextCrisisId++, name }
      CRISES.push(crisis)
      this.crises$.next(CRISES)
    }
  }
}
